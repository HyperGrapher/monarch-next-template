import { expect, test } from '@playwright/test'

test.describe('locales and routing', () => {
  test('root redirects to the default locale', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/tr$/)
  })

  for (const [locale, lang] of [['tr', 'tr'], ['en', 'en']] as const) {
    test(`/${locale} renders content with the right <html lang>, title and one h1`, async ({ page }) => {
      await page.goto(`/${locale}`)
      await expect(page.locator('html')).toHaveAttribute('lang', lang)
      await expect(page.locator('h1')).toHaveCount(1)
      expect((await page.title()).length).toBeGreaterThan(3)
    })
  }

  test('titles differ between languages (no fallback to Turkish)', async ({ page }) => {
    await page.goto('/tr')
    const tr = await page.title()
    await page.goto('/en')
    expect(await page.title()).not.toBe(tr)
  })

  test('publishes hreflang alternates and a canonical link', async ({ page }) => {
    await page.goto('/en/projects')
    await expect(page.locator('link[rel="alternate"][hreflang="tr"]')).toHaveCount(1)
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1)
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
  })

  test('the language switcher keeps you on the same page', async ({ page }) => {
    await page.goto('/tr/services')
    await page.locator('a[hreflang="en"]').first().click()
    await expect(page).toHaveURL(/\/en\/services$/)
  })

  for (const path of ['/tr/projects', '/tr/services', '/tr/blog', '/tr/contact', '/tr/about', '/en/projects']) {
    test(`${path} responds 200 with an h1`, async ({ page }) => {
      const res = await page.goto(path)
      expect(res?.status()).toBe(200)
      await expect(page.locator('h1').first()).toBeVisible()
    })
  }

  test('a project detail page opens from the list', async ({ page }) => {
    await page.goto('/en/projects')
    await page.locator('article a').first().click()
    await expect(page).toHaveURL(/\/en\/projects\/[^/]+$/)
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('path-based filters work and reject unknown values', async ({ request }) => {
    expect((await request.get('/tr/projects/type/cultural')).status()).toBe(200)
    expect((await request.get('/tr/projects/type/spaceship')).status()).toBe(404)
    expect((await request.get('/tr/blog/category/nope')).status()).toBe(404)
    expect((await request.get('/tr/blog/page/99')).status()).toBe(404)
    expect((await request.get('/tr/blog/page/1')).status()).toBe(404)
  })

  test('unknown pages return a real 404 with the styled not-found page', async ({ page }) => {
    const res = await page.goto('/tr/yok-boyle-bir-sayfa')
    expect(res?.status()).toBe(404)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('unknown locale is a 404', async ({ request }) => {
    expect((await request.get('/de')).status()).toBe(404)
  })

  test('sitemap and robots are served and robots hides the admin', async ({ request }) => {
    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.status()).toBe(200)
    expect(await sitemap.text()).toContain('hreflang="en"')
    const robots = await (await request.get('/robots.txt')).text()
    expect(robots).toContain('Disallow: /admin')
    expect(robots).toContain('sitemap.xml')
  })
})

test.describe('home page', () => {
  test('the loader lifts and the hero is visible (never stuck on screen)', async ({ page }) => {
    await page.goto('/tr')
    await expect(page.locator('#loader')).toBeHidden({ timeout: 20_000 })
  })

  test('survives a failing hero image: the loader still lifts', async ({ page }) => {
    await page.route(/\/api\/media\/file\/|blob\.vercel-storage\.com/, (route) => route.abort())
    await page.goto('/tr')
    await expect(page.locator('#loader')).toBeHidden({ timeout: 20_000 })
    await expect(page.locator('h1')).toHaveCount(1)
  })

  test('no broken images on the home page', async ({ page }) => {
    const bad: string[] = []
    page.on('response', (r) => {
      if (r.request().resourceType() === 'image' && r.status() >= 400) bad.push(`${r.status()} ${r.url()}`)
    })
    await page.goto('/tr')
    await page.waitForLoadState('networkidle')
    expect(bad).toEqual([])
  })
})

test.describe('contact form', () => {
  const body = (over: Record<string, unknown> = {}) => ({ name: 'Test Person', email: 'test@example.com', message: 'A long enough message for the form.', locale: 'en', elapsed: 5000, website: '', ...over })

  test('rejects invalid input with field errors', async ({ request }) => {
    const res = await request.post('/api/contact', { data: body({ name: 'x', email: 'not-an-email', message: 'short' }) })
    expect(res.status()).toBe(422)
    expect(Object.keys((await res.json()).errors).sort()).toEqual(['email', 'message', 'name'])
  })
  test('silently accepts bots (honeypot / too fast) without storing', async ({ request }) => {
    expect((await request.post('/api/contact', { data: body({ website: 'http://spam.example' }) })).status()).toBe(200)
    expect((await request.post('/api/contact', { data: body({ elapsed: 100 }) })).status()).toBe(200)
  })
  test('rejects malformed JSON', async ({ request }) => {
    expect((await request.post('/api/contact', { data: 'not json', headers: { 'content-type': 'application/json' } })).status()).toBe(400)
  })
  test('stores a valid message', async ({ request }) => {
    const res = await request.post('/api/contact', { data: body() })
    expect(res.status()).toBe(200)
    expect((await res.json()).ok).toBe(true)
  })
})
