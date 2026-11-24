import { readFileSync } from 'node:fs'
import path from 'node:path'
import { expect, test } from '@playwright/test'
import { defaultLocale, url } from '../helpers/edition'

const admin = { email: 'e2e-admin@example.com', password: 'E2e-Password-123!' }

// Order matters: the first registration creates the admin, later tests use it.
test.describe.configure({ mode: 'serial' })

test.describe('admin and cache refresh', () => {
  let token = ''

  test('the first registration works and is the only one', async ({ playwright, baseURL }) => {
    // Fresh, cookie-less contexts: a request context keeps the session cookie, which would make later calls "signed in".
    const fresh = () => playwright.request.newContext({ baseURL })
    const a = await fresh()
    expect((await a.post('/api/users/first-register', { data: admin })).status()).toBe(200)
    const b = await fresh()
    expect((await b.post('/api/users/first-register', { data: { email: 'second@example.com', password: 'E2e-Password-123!' } })).status()).not.toBe(200)
    const c = await fresh()
    expect([401, 403]).toContain((await c.post('/api/users', { data: { email: 'third@example.com', password: 'E2e-Password-123!' } })).status())
    expect([401, 403]).toContain((await c.get('/api/users')).status())
    await Promise.all([a.dispose(), b.dispose(), c.dispose()])
  })

  test('admin can sign in through the UI and sees the dashboard', async ({ page }) => {
    await page.goto('/admin/login')
    await page.fill('#field-email', admin.email)
    await page.fill('#field-password', admin.password)
    await page.click('button[type="submit"]')
    await page.waitForURL('**/admin')
    await expect(page.locator('span[title="Dashboard"]').first()).toBeVisible()
  })

  test('contact messages stored by the site are visible to the admin only', async ({ request }) => {
    token = (await (await request.post('/api/users/login', { data: admin })).json()).token
    await request.post('/api/contact', { data: { name: 'Visible To Admin', email: 'v@example.com', message: 'Please call me back soon.', locale: 'tr', elapsed: 5000, website: '' } })
    const res = await request.get('/api/contact-submissions', { headers: { Authorization: `JWT ${token}` } })
    expect(res.status()).toBe(200)
    expect((await res.json()).docs.some((d: any) => d.name === 'Visible To Admin')).toBe(true)
  })

  test('publishing an edit refreshes the cached public page', async ({ request }) => {
    const headers = { Authorization: `JWT ${token}` }
    const { docs } = await (await request.get(`/api/projects?limit=1&locale=${defaultLocale}`, { headers })).json()
    const marker = `E2E-${Date.now()}`
    expect(await (await request.get(url('/projects'))).text()).not.toContain(marker)
    const patch = await request.patch(`/api/projects/${docs[0].id}?locale=${defaultLocale}`, { headers, data: { title: marker, _status: 'published' } })
    expect(patch.status()).toBe(200)
    await expect.poll(async () => (await (await request.get(url('/projects'))).text()).includes(marker), { timeout: 15_000 }).toBe(true)
  })

  test('a saved draft does not change the public page', async ({ request }) => {
    const headers = { Authorization: `JWT ${token}` }
    const { docs } = await (await request.get(`/api/projects?limit=1&locale=${defaultLocale}`, { headers })).json()
    const marker = `DRAFT-${Date.now()}`
    const patch = await request.patch(`/api/projects/${docs[0].id}?locale=${defaultLocale}&draft=true`, { headers, data: { title: marker } })
    expect(patch.status()).toBe(200)
    await new Promise((r) => setTimeout(r, 1500))
    expect(await (await request.get(url('/projects'))).text()).not.toContain(marker)
  })

  test('a draft of a global (home page) is not readable anonymously', async ({ request, playwright, baseURL }) => {
    const headers = { Authorization: `JWT ${token}` }
    const marker = `GLOBAL-DRAFT-${Date.now()}`
    const patch = await request.post(`/api/globals/home-page?locale=${defaultLocale}&draft=true`, { headers, data: { hero: { statement: marker } } })
    expect(patch.status()).toBe(200)
    // Staff can see the draft…
    expect(JSON.stringify(await (await request.get(`/api/globals/home-page?locale=${defaultLocale}&draft=true`, { headers })).json())).toContain(marker)
    // …visitors cannot, even when asking for it.
    const anon = await playwright.request.newContext({ baseURL })
    for (const q of ['', '&draft=true']) {
      const res = await anon.get(`/api/globals/home-page?locale=${defaultLocale}${q}`)
      expect(res.status()).toBe(200)
      expect(await res.text()).not.toContain(marker)
    }
    // The public home page still renders the published content.
    const home = await anon.get(url('/'))
    expect(home.status()).toBe(200)
    expect(await home.text()).not.toContain(marker)
    await anon.dispose()
  })

  test('admin Live Preview shows the draft in an iframe and follows edits (autosave)', async ({ page, request }) => {
    const headers = { Authorization: `JWT ${token}` }
    const slug = `live-preview-e2e-${Date.now()}`
    const created = await request.post(`/api/pages?locale=${defaultLocale}`, { headers, data: { title: 'Live Preview Original', slug, _status: 'draft', layout: [] } })
    expect(created.status()).toBe(201)
    const id = (await created.json()).doc.id

    // Draft is invisible to visitors, but visible in the admin's live preview.
    expect((await request.get(url(`/${slug}`), { headers: {} })).status()).toBe(404)

    await page.goto('/admin/login')
    await page.fill('#field-email', admin.email)
    await page.fill('#field-password', admin.password)
    await page.click('button[type="submit"]')
    await page.waitForURL('**/admin')

    await page.goto(`/admin/collections/pages/${id}?locale=${defaultLocale}`)
    await page.locator('#live-preview-toggler').click()
    const frame = page.frameLocator('iframe#live-preview-iframe')
    await expect(frame.locator('h1').first()).toContainText('Live Preview Original', { timeout: 30_000 })
    // The "draft preview" banner is hidden inside the iframe.
    await expect(frame.locator('[data-preview-banner]')).toBeHidden()

    // Typing changes the title; autosave saves a draft and the iframe refreshes without a manual save.
    const title = page.locator('#field-title')
    await title.fill('Live Preview Edited')
    await expect(frame.locator('h1').first()).toContainText('Live Preview Edited', { timeout: 30_000 })

    // Still a draft for visitors.
    expect((await request.get(url(`/${slug}`), { headers: {} })).status()).toBe(404)
  })

  test('an image uploaded through the admin API gets responsive sizes (no seed involved)', async ({ request }) => {
    const headers = { Authorization: `JWT ${token}` }
    const buffer = readFileSync(path.resolve('seed/photos/arch-01.webp'))
    const res = await request.post('/api/media', {
      headers,
      multipart: {
        file: { name: `upload-e2e-${Date.now()}.webp`, mimeType: 'image/webp', buffer },
        _payload: JSON.stringify({ alt: 'Upload test' }),
      },
    })
    expect(res.status()).toBe(201)
    const doc = (await res.json()).doc
    expect(doc.width).toBe(2000)
    for (const name of ['w480', 'w800', 'w1200', 'w1600']) {
      const size = doc.sizes[name]
      expect(size.url, name).toBeTruthy()
      expect(size.mimeType).toBe('image/webp')
      const file = await request.get(size.url)
      expect(file.status(), size.url).toBe(200)
    }
    expect(doc.sizes.w480.width).toBe(480)
  })
})

