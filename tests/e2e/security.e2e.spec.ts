import { expect, test } from '@playwright/test'
import { url } from '../helpers/edition'

test.describe('anonymous access', () => {
  test('cannot list users', async ({ request }) => {
    expect((await request.get('/api/users')).status()).toBe(403)
  })
  test('cannot read or create contact submissions', async ({ request }) => {
    expect((await request.get('/api/contact-submissions')).status()).toBe(403)
    const res = await request.post('/api/contact-submissions', { data: { name: 'x', email: 'a@b.co', message: 'hello world friend' } })
    expect([401, 403]).toContain(res.status())
  })
  test('cannot write content', async ({ request }) => {
    const res = await request.post('/api/categories', { data: { slug: 'anon', name: 'Anon' } })
    expect([401, 403]).toContain(res.status())
  })
  test('preview needs a signed-in session', async ({ request }) => {
    expect((await request.get(`/api/preview?path=${url('/')}`, { maxRedirects: 0 })).status()).toBe(401)
  })
  test('preview rejects open redirects', async ({ request }) => {
    expect((await request.get('/api/preview?path=//evil.com', { maxRedirects: 0 })).status()).toBe(400)
    expect((await request.get('/api/preview?path=https://evil.com', { maxRedirects: 0 })).status()).toBe(400)
    // Browsers treat these as "//evil.com" (backslash; tab/newline are stripped by the URL parser).
    for (const p of ['/%5Cevil.com', '/%09/evil.com', '/%0A/evil.com']) {
      expect((await request.get(`/api/preview?path=${p}`, { maxRedirects: 0 })).status(), p).toBe(400)
    }
  })
  test('a drafts-only listing is not exposed publicly', async ({ request }) => {
    const res = await request.get('/api/projects?draft=true&limit=100')
    const docs = (await res.json()).docs ?? []
    expect(docs.every((d: any) => d._status === 'published')).toBe(true)
  })
})

test.describe('security headers', () => {
  for (const path of [url('/'), '/admin/login', '/api/pages']) {
    test(`${path} sends them`, async ({ request }) => {
      const h = (await request.get(path, { maxRedirects: 0 })).headers()
      expect(h['x-content-type-options']).toBe('nosniff')
      expect(h['x-frame-options']).toBe('SAMEORIGIN')
      expect(h['content-security-policy']).toContain("frame-ancestors 'self'")
      expect(h['referrer-policy']).toBe('strict-origin-when-cross-origin')
      expect(h['strict-transport-security']).toContain('max-age=')
    })
  }
})
