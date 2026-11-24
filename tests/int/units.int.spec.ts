import { describe, expect, it } from 'vitest'
import { defaultLocale, isLocale, localePath, locales } from '../../src/config/locales'
import { getDictionary } from '../../src/lib/i18n/dictionary'
import { img, localUrl, srcSetOf } from '../../src/lib/media'
import { livePreview, requestOrigin } from '../../src/lib/preview'
import { absoluteUrl } from '../../src/lib/seo'
import { safeLocalPath } from '../../src/lib/links'
import { projectTypes } from '../../src/collections/Projects'
import { isMultilingual, secondLocale } from '../helpers/edition'

const shape = (v: unknown): unknown =>
  typeof v === 'function' ? 'fn' : Array.isArray(v) ? v.map(shape) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).sort().map(([k, x]) => [k, shape(x)])) : typeof v

describe('locales', () => {
  it('has a default locale that is configured', () => expect(locales).toContain(defaultLocale))
  it('validates locale codes', () => {
    expect(isLocale(defaultLocale)).toBe(true)
    expect(isLocale('de')).toBe(false)
    expect(isLocale(undefined)).toBe(false)
  })
  it.skipIf(!isMultilingual)('builds prefixed paths', () => {
    expect(localePath('tr')).toBe('/tr')
    expect(localePath(secondLocale, '/projects')).toBe('/en/projects')
    expect(localePath(secondLocale, 'blog/x')).toBe('/en/blog/x')
  })
  it.skipIf(isMultilingual)('builds unprefixed paths (single-language edition)', () => {
    expect(localePath(defaultLocale)).toBe('/')
    expect(localePath(defaultLocale, '/projects')).toBe('/projects')
    expect(localePath(defaultLocale, 'blog/x')).toBe('/blog/x')
  })
})

describe('dictionary', () => {
  it('has the same keys and value types in every locale', () => {
    const [first, ...rest] = locales
    for (const l of rest) expect(shape(getDictionary(l))).toEqual(shape(getDictionary(first)))
  })
  it('translates every project type in every locale', () => {
    for (const l of locales) for (const t of projectTypes) expect(getDictionary(l).types[t], `${l}:${t}`).toBeTruthy()
  })
  it('has no empty strings', () => {
    const empties: string[] = []
    const walk = (v: unknown, path: string) => {
      if (typeof v === 'string' && v.trim() === '') empties.push(path)
      else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}[${i}]`))
      else if (v && typeof v === 'object') Object.entries(v).forEach(([k, x]) => walk(x, `${path}.${k}`))
    }
    for (const l of locales) walk(getDictionary(l), l)
    expect(empties).toEqual([])
  })
})

describe('media + seo URL helpers', () => {
  it('turns Payload-served absolute URLs into same-origin paths', () => {
    expect(localUrl('https://example.com/api/media/file/a.webp')).toBe('/api/media/file/a.webp')
    expect(localUrl('/api/media/file/a.webp')).toBe('/api/media/file/a.webp')
  })
  it('leaves Blob CDN URLs untouched', () => {
    const u = 'https://abc.public.blob.vercel-storage.com/a.webp'
    expect(localUrl(u)).toBe(u)
  })
  it('never prefixes the site origin onto an absolute URL (OG image bug)', () => {
    const blob = 'https://abc.public.blob.vercel-storage.com/a.webp'
    expect(absoluteUrl(blob)).toBe(blob)
    expect(absoluteUrl('/api/media/file/a.webp')).toBe('http://localhost:3000/api/media/file/a.webp')
  })
})

describe('safeLocalPath (preview redirect target)', () => {
  it('keeps local paths with query and hash', () => {
    expect(safeLocalPath('/tr/projects?x=1#a')).toBe('/tr/projects?x=1#a')
    expect(safeLocalPath('/')).toBe('/')
  })
  it('rejects anything a browser would send to another host', () => {
    for (const p of ['//evil.com', '/\\evil.com', '/\t/evil.com', '/\n/evil.com', '/\r/evil.com', 'https://evil.com', 'evil.com', '', '\\\\evil.com']) {
      expect(safeLocalPath(p), JSON.stringify(p)).toBeNull()
    }
  })
})

describe('live preview url', () => {
  const req = (h: Record<string, string>) => ({ headers: new Headers(h) }) as any
  const urlOf = (cfg: ReturnType<typeof livePreview>, data: any, headers: Record<string, string>) =>
    (cfg.url as any)({ data, locale: { code: defaultLocale }, req: req(headers) })

  it('uses the origin the admin is served from', () => {
    expect(requestOrigin(req({ host: 'localhost:3000' }))).toBe('http://localhost:3000')
    expect(requestOrigin(req({ host: 'site.example.com' }))).toBe('https://site.example.com')
    expect(requestOrigin(req({ host: 'internal:3000', 'x-forwarded-host': 'site.example.com', 'x-forwarded-proto': 'https' }))).toBe('https://site.example.com')
  })
  it('falls back to the configured site url without a host header', () => {
    expect(requestOrigin(req({}))).toMatch(/^https?:\/\//)
  })
  it('is absolute, goes through /api/preview and carries the document path', async () => {
    const cfg = livePreview((d) => (d.slug ? `/x/${d.slug}` : null))
    const u = await urlOf(cfg, { slug: 'abc' }, { host: 'localhost:3000' })
    expect(u.startsWith('http://localhost:3000/api/preview?path=')).toBe(true)
    expect(decodeURIComponent(u)).toContain('/x/abc')
  })
  it('is disabled while the document cannot be previewed yet', async () => {
    const cfg = livePreview((d) => (d.slug ? `/x/${d.slug}` : null))
    expect(await urlOf(cfg, {}, { host: 'localhost:3000' })).toBeNull()
  })
  it('offers device breakpoints', () => {
    expect(livePreview(() => '/').breakpoints?.map((b) => b.name)).toEqual(['mobile', 'tablet', 'laptop'])
  })
})

describe('responsive images', () => {
  const doc = {
    url: 'https://x.public.blob.vercel-storage.com/a.webp',
    width: 2000,
    sizes: {
      w800: { url: 'https://x.public.blob.vercel-storage.com/a-800x500.webp', width: 800 },
      w480: { url: 'https://x.public.blob.vercel-storage.com/a-480x300.webp', width: 480 },
      w1600: { url: null, width: null },
    },
  } as any
  it('lists generated widths in ascending order plus the original', () => {
    expect(srcSetOf(doc)).toBe('https://x.public.blob.vercel-storage.com/a-480x300.webp 480w, https://x.public.blob.vercel-storage.com/a-800x500.webp 800w, https://x.public.blob.vercel-storage.com/a.webp 2000w')
  })
  it('has no srcset for media uploaded before sizes existed (falls back to the original)', () => {
    expect(srcSetOf({ url: '/api/media/file/a.webp', width: 2000, sizes: { w480: { url: null } } } as any)).toBeUndefined()
    expect(img({ ...doc, id: 1, alt: 'a', sizes: {} } as any)?.srcSet).toBeUndefined()
  })
  it('makes Payload-served sizes same-origin', () => {
    expect(srcSetOf({ url: 'http://localhost:3000/api/media/file/a.webp', width: 900, sizes: { w480: { url: 'http://localhost:3000/api/media/file/a-480x1.webp', width: 480 } } } as any)).toBe('/api/media/file/a-480x1.webp 480w, /api/media/file/a.webp 900w')
  })
})
