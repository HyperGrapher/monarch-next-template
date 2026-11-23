import { expect, test } from '@playwright/test'
import { defaultLocale, isMultilingual } from '../helpers/edition'

// URL structure differs per edition; each block runs only on its own edition.
test.describe('single-language edition', () => {
  test.skip(isMultilingual, 'multilingual edition')

  test('the root serves the home page directly (no redirect, no locale prefix)', async ({ page }) => {
    const res = await page.goto('/')
    expect(res?.status()).toBe(200)
    await expect(page).toHaveURL(/\/$/)
    await expect(page.locator('h1')).toHaveCount(1)
  })

  test('old prefixed URLs permanently redirect to the clean URL', async ({ request }) => {
    const home = await request.get(`/${defaultLocale}`, { maxRedirects: 0 })
    expect(home.status()).toBe(308)
    expect(home.headers().location).toMatch(/\/$/)
    const inner = await request.get(`/${defaultLocale}/projects`, { maxRedirects: 0 })
    expect(inner.status()).toBe(308)
    expect(inner.headers().location).toMatch(/\/projects$/)
  })

  test('internal links carry no locale prefix', async ({ page }) => {
    await page.goto('/')
    const hrefs = await page.locator('a[href^="/"]').evaluateAll((els) => els.map((e) => e.getAttribute('href') || ''))
    expect(hrefs.length).toBeGreaterThan(3)
    expect(hrefs.filter((h) => h.startsWith(`/${defaultLocale}/`) || h === `/${defaultLocale}`)).toEqual([])
  })

  test('there is no language switcher and no hreflang', async ({ page }) => {
    await page.goto('/projects')
    await expect(page.locator('a[hreflang]')).toHaveCount(0)
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0)
  })

  test('admin, api and static files are not rewritten', async ({ request }) => {
    expect((await request.get('/admin')).status()).toBe(200)
    expect((await request.get('/api/users')).status()).toBe(403)
    expect((await request.get('/robots.txt')).status()).toBe(200)
    expect((await request.get('/sitemap.xml')).status()).toBe(200)
  })

  test('sitemap URLs have no locale prefix', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text()
    expect(xml).not.toContain(`/${defaultLocale}/`)
    expect(xml).not.toContain('hreflang')
  })
})

test.describe('multilingual edition', () => {
  test.skip(!isMultilingual, 'single-language edition')

  test('the root redirects (307) to the default locale', async ({ request }) => {
    const res = await request.get('/', { maxRedirects: 0 })
    expect(res.status()).toBe(307)
    expect(res.headers().location).toMatch(new RegExp(`/${defaultLocale}$`))
  })

  test('there is a working language switcher', async ({ page }) => {
    await page.goto('/tr')
    await expect(page.locator('a[hreflang="en"]').first()).toBeVisible()
  })
})
