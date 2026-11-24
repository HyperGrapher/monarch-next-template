/**
 * Lists, pagination, sitemap and hreflang must only count documents that exist in the requested language.
 * (Translations are optional: an untranslated document 404s in that language, so it must not be linked.)
 */
import path from 'node:path'
import { beforeAll, describe, expect, it } from 'vitest'
import { getPayload, type Payload } from 'payload'
import config from '../../src/payload.config'
import { defaultLocale } from '../../src/config/locales'
import { getPosts, getRelatedPosts, getTranslatedLocales, POSTS_PER_PAGE } from '../../src/lib/queries'
import sitemap from '../../src/app/sitemap'
import { isMultilingual, secondLocale } from '../helpers/edition'

let payload: Payload
const lexical = (text: string) => ({
  root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', textFormat: 0, children: [{ type: 'text', text, format: 0, style: '', mode: 'normal', detail: 0, version: 1 }] }] },
})

beforeAll(async () => {
  payload = await getPayload({ config: await config })
  const media = await payload.create({ collection: 'media', locale: defaultLocale, data: { alt: 'x' }, filePath: path.resolve('seed/photos/arch-01.webp'), overrideAccess: true })
  // 7 posts in the default language; only the 2 OLDEST are translated.
  for (let i = 0; i < POSTS_PER_PAGE + 1; i++) {
    const doc = await payload.create({
      collection: 'posts',
      locale: defaultLocale,
      draft: false,
      overrideAccess: true,
      data: { slug: `list-post-${i}`, title: `Yazı ${i}`, excerpt: 'Özet', content: lexical('metin'), featuredImage: media.id, publishedAt: new Date(2020, 0, i + 1).toISOString(), _status: 'published' } as any,
    })
    if (isMultilingual && i < 2) {
      await payload.update({ collection: 'posts', id: doc.id, locale: secondLocale, draft: false, overrideAccess: true, data: { title: `Post ${i}`, excerpt: 'Summary', content: lexical('text'), _status: 'published' } as any })
    }
  }
  await payload.create({
    collection: 'posts',
    locale: defaultLocale,
    draft: false,
    overrideAccess: true,
    data: { slug: 'hidden-from-search', title: 'Gizli', excerpt: 'Özet', content: lexical('metin'), featuredImage: media.id, publishedAt: new Date(2019, 0, 1).toISOString(), seo: { noIndex: true }, _status: 'published' } as any,
  })
})

describe('blog pagination', () => {
  it('counts every post in the default language', async () => {
    const res = await getPosts({ locale: defaultLocale }, 1)
    expect(res.docs).toHaveLength(POSTS_PER_PAGE)
    expect(res.totalDocs).toBeGreaterThanOrEqual(POSTS_PER_PAGE + 1)
  })
  it.skipIf(!isMultilingual)('paginates only translated posts (no short or empty pages)', async () => {
    const res = await getPosts({ locale: secondLocale }, 1)
    expect(res.docs.map((d) => d.title).sort()).toEqual(['Post 0', 'Post 1'])
    expect(res.totalDocs).toBe(2)
    expect(res.totalPages).toBe(1)
  })
  it.skipIf(!isMultilingual)('related posts are translated ones', async () => {
    const [first] = (await getPosts({ locale: secondLocale }, 1)).docs
    const related = await getRelatedPosts(first, { locale: secondLocale })
    expect(related.map((d) => d.title)).toEqual(['Post 0', 'Post 1'].filter((t) => t !== first.title))
  })
})

describe.skipIf(!isMultilingual)('hreflang / sitemap', () => {
  it('knows which languages a document exists in', async () => {
    expect(await getTranslatedLocales('posts', 'list-post-0')).toEqual([defaultLocale, secondLocale])
    expect(await getTranslatedLocales('posts', 'list-post-5')).toEqual([defaultLocale])
  })
  it('lists translated documents only, and never noIndex pages', async () => {
    const urls = (await sitemap()).map((e) => e.url)
    expect(urls.some((u) => u.endsWith(`/${defaultLocale}/blog/list-post-5`))).toBe(true)
    expect(urls.some((u) => u.endsWith(`/${secondLocale}/blog/list-post-5`))).toBe(false)
    expect(urls.some((u) => u.endsWith(`/${secondLocale}/blog/list-post-0`))).toBe(true)
    expect(urls.some((u) => u.includes('hidden-from-search'))).toBe(false)
  })
  it('only lists alternates that exist', async () => {
    const entries = await sitemap()
    const only = entries.find((e) => e.url.endsWith(`/${defaultLocale}/blog/list-post-5`))
    expect(only?.alternates).toBeUndefined()
    const both = entries.find((e) => e.url.endsWith(`/${defaultLocale}/blog/list-post-0`))
    expect(Object.keys(both?.alternates?.languages ?? {}).sort()).toEqual([defaultLocale, secondLocale].sort())
  })
})
