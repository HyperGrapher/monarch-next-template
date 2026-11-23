import { expect, test } from '@playwright/test'

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
    expect((await request.get('/api/preview?path=/tr', { maxRedirects: 0 })).status()).toBe(401)
  })
  test('preview rejects open redirects', async ({ request }) => {
    expect((await request.get('/api/preview?path=//evil.com', { maxRedirects: 0 })).status()).toBe(400)
    expect((await request.get('/api/preview?path=https://evil.com', { maxRedirects: 0 })).status()).toBe(400)
  })
  test('a drafts-only listing is not exposed publicly', async ({ request }) => {
    const res = await request.get('/api/projects?draft=true&limit=100')
    const docs = (await res.json()).docs ?? []
    expect(docs.every((d: any) => d._status === 'published')).toBe(true)
  })
})
