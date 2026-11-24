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
})
