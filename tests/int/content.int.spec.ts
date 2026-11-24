import { beforeAll, describe, expect, it } from 'vitest'
import { getPayload, type Payload } from 'payload'
import config from '../../src/payload.config'
import { defaultLocale, type Locale } from '../../src/config/locales'
import { getPageBySlug, getSlugs } from '../../src/lib/queries'
import { revalidateAfterChange } from '../../src/lib/revalidate'
import { isMultilingual, secondLocale } from '../helpers/edition'

let payload: Payload

const page = (slug: string, title: string, status: 'draft' | 'published', locale: Locale = defaultLocale) =>
  payload.create({ collection: 'pages', locale, draft: status === 'draft', data: { slug, title, _status: status } as any, overrideAccess: true })

beforeAll(async () => {
  payload = await getPayload({ config: await config })
  await page('only-turkish', 'Sadece Türkçe', 'published')
  const both = await page('both', 'Her ikisi', 'published')
  if (isMultilingual) await payload.update({ collection: 'pages', id: both.id, locale: secondLocale, data: { title: 'Both', _status: 'published' } as any, draft: false, overrideAccess: true })
  await page('secret-draft', 'Taslak', 'draft')
})

describe('drafts', () => {
  it('shows anonymous visitors published pages only', async () => {
    const { docs } = await payload.find({ collection: 'pages', locale: 'tr', overrideAccess: false, limit: 50 })
    const slugs = docs.map((d) => d.slug)
    expect(slugs).toContain('both')
    expect(slugs).not.toContain('secret-draft')
  })
  it('never serves a draft through the site queries', async () => {
    expect(await getPageBySlug('secret-draft', { locale: 'tr' })).toBeNull()
  })
})

describe.skipIf(!isMultilingual)('translations (no silent fallback)', () => {
  it('serves a translated page in its own language', async () => {
    expect((await getPageBySlug('both', { locale: secondLocale }))?.title).toBe('Both')
    expect((await getPageBySlug('both', { locale: 'tr' }))?.title).toBe('Her ikisi')
  })
  it('hides a page that has no translation instead of showing Turkish', async () => {
    expect((await getPageBySlug('only-turkish', { locale: 'tr' }))?.title).toBe('Sadece Türkçe')
    expect(await getPageBySlug('only-turkish', { locale: secondLocale })).toBeNull()
  })
  it('only lists translated slugs per locale (used for static params)', async () => {
    expect(await getSlugs('pages', secondLocale)).toEqual(['both'])
    expect((await getSlugs('pages', 'tr')).sort()).toEqual(['both', 'only-turkish'])
  })
})

describe('cache revalidation hook', () => {
  it('does not throw outside a Next request (seed, scripts, tests)', async () => {
    await expect((revalidateAfterChange as any)({ doc: { id: 1 }, context: {} })).resolves.toBeTruthy()
  })
  it('returns the document unchanged', async () => {
    const doc = { id: 7 }
    expect(await (revalidateAfterChange as any)({ doc, context: {} })).toBe(doc)
  })
})

describe.skipIf(isMultilingual)('single-language edition', () => {
  it('serves every published page in the only language', async () => {
    expect((await getPageBySlug('both', { locale: 'tr' }))?.title).toBe('Her ikisi')
    expect((await getSlugs('pages', 'tr')).sort()).toEqual(['both', 'only-turkish'])
  })
})
