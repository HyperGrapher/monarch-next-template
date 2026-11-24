import { describe, expect, it } from 'vitest'
import { defaultLocale, isLocale, localePath, locales } from '../../src/config/locales'
import { getDictionary } from '../../src/lib/i18n/dictionary'
import { localUrl } from '../../src/lib/media'
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
