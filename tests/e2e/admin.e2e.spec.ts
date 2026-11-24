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
})

