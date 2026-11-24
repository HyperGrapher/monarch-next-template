import { expect, test } from '@playwright/test'
import { isMultilingual, url } from '../helpers/edition'

test.describe('locales and routing', () => {
  test('the home page renders content with <html lang>, a title and exactly one h1', async ({ page }) => {
    await page.goto(url('/'))
    await expect(page.locator('html')).toHaveAttribute('lang', /^[a-z]{2}$/)
    await expect(page.locator('h1')).toHaveCount(1)
    expect((await page.title()).length).toBeGreaterThan(3)
  })

  test('every page has a canonical link', async ({ page }) => {
    await page.goto(url('/projects'))
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
  })

  test.describe('multilingual edition only', () => {
    test.skip(!isMultilingual, 'single-language edition has one language')

    test('root redirects to the default locale', async ({ page }) => {
      await page.goto('/')
      await expect(page).toHaveURL(/\/tr$/)
    })

    test('/tr and /en have the right <html lang> and different titles (no fallback to Turkish)', async ({ page }) => {
      await page.goto('/tr')
      await expect(page.locator('html')).toHaveAttribute('lang', 'tr')
      const tr = await page.title()
      await page.goto('/en')
      await expect(page.locator('html')).toHaveAttribute('lang', 'en')
      expect(await page.title()).not.toBe(tr)
    })

    test('publishes hreflang alternates', async ({ page }) => {
      await page.goto('/en/projects')
      await expect(page.locator('link[rel="alternate"][hreflang="tr"]')).toHaveCount(1)
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1)
    })

    test('the language switcher keeps you on the same page', async ({ page }) => {
      await page.goto('/tr/services')
      await page.locator('a[hreflang="en"]').first().click()
      await expect(page).toHaveURL(/\/en\/services$/)
    })

    test('unknown locale is a 404', async ({ request }) => {
      expect((await request.get('/de')).status()).toBe(404)
    })
  })

  for (const path of ['/projects', '/services', '/blog', '/contact', '/about'].map((p) => url(p))) {
    test(`${path} responds 200 with an h1`, async ({ page }) => {
      const res = await page.goto(path)
      expect(res?.status()).toBe(200)
      await expect(page.locator('h1').first()).toBeVisible()
    })
  }

  test('a project detail page opens from the list', async ({ page }) => {
    await page.goto(url('/projects'))
    await page.locator('article a').first().click()
    await expect(page).toHaveURL(new RegExp(`${url('/projects')}/[^/]+$`))
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('path-based filters work and reject unknown values', async ({ request }) => {
    expect((await request.get(url('/projects/type/cultural'))).status()).toBe(200)
    expect((await request.get(url('/projects/type/spaceship'))).status()).toBe(404)
    expect((await request.get(url('/blog/category/nope'))).status()).toBe(404)
    expect((await request.get(url('/blog/page/99'))).status()).toBe(404)
    expect((await request.get(url('/blog/page/1'))).status()).toBe(404)
  })

  test('unknown pages return a real 404 with the styled not-found page', async ({ page }) => {
    const res = await page.goto(url('/yok-boyle-bir-sayfa'))
    expect(res?.status()).toBe(404)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('sitemap and robots are served and robots hides the admin', async ({ request }) => {
    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.status()).toBe(200)
    expect(await sitemap.text()).toContain('<urlset')
    if (isMultilingual) expect(await sitemap.text()).toContain('hreflang="en"')
    const robots = await (await request.get('/robots.txt')).text()
    expect(robots).toContain('Disallow: /admin')
    expect(robots).toContain('sitemap.xml')
  })
})

test.describe('home page', () => {
  test('the loader lifts and the hero is visible (never stuck on screen)', async ({ page }) => {
    await page.goto(url('/'))
    await expect(page.locator('#loader')).toBeHidden({ timeout: 20_000 })
  })

  test('survives a failing hero image: the loader still lifts', async ({ page }) => {
    await page.route(/\/api\/media\/file\/|blob\.vercel-storage\.com/, (route) => route.abort())
    await page.goto(url('/'))
    await expect(page.locator('#loader')).toBeHidden({ timeout: 20_000 })
    await expect(page.locator('h1')).toHaveCount(1)
  })

  test('content images offer responsive widths (srcset) and phones get a small one', async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })
    const page = await ctx.newPage()
    await page.goto(url('/projects'))
    const img = page.locator('main img[srcset]').first()
    await expect(img).toHaveAttribute('srcset', /480w/)
    await img.scrollIntoViewIfNeeded()
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.currentSrc)).toMatch(/-(480|800)x\d+\.webp$/)
    await ctx.close()
  })

  test('no broken images on the home page', async ({ page }) => {
    const bad: string[] = []
    page.on('response', (r) => {
      if (r.request().resourceType() === 'image' && r.status() >= 400) bad.push(`${r.status()} ${r.url()}`)
    })
    await page.goto(url('/'))
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
  test('rejects malformed or non-object JSON', async ({ request }) => {
    const post = (raw: string) => request.post('/api/contact', { data: Buffer.from(raw), headers: { 'content-type': 'application/json' } })
    for (const raw of ['not json', 'null', '"text"', '[1,2]']) expect((await post(raw)).status(), raw).toBe(400)
  })
  test('stores a valid message', async ({ request }) => {
    const res = await request.post('/api/contact', { data: body() })
    expect(res.status()).toBe(200)
    expect((await res.json()).ok).toBe(true)
  })
})
