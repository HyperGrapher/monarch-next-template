import type { MetadataRoute } from 'next'
import { isMultilingual, localePath, locales, type Locale } from '../config/locales'
import { getClient } from '../lib/payload'
import { siteUrl } from '../lib/seo'

export const revalidate = 3600

type Entry = { path: string; locales: readonly Locale[]; updated?: string }
type Row = { slug?: string | null; title?: string | null; updatedAt?: string; seo?: { noIndex?: boolean | null } | null }

const collections = [
  ['pages', ''],
  ['services', '/services'],
  ['projects', '/projects'],
  ['posts', '/blog'],
] as const

// Published content only (public access rules), only in the languages it is translated into,
// and never pages marked "Hide from search engines".
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getClient()
  const entries: Entry[] = ['/', '/services', '/projects', '/blog', '/contact'].map((path) => ({ path, locales }))

  const perCollection = await Promise.all(
    collections.map(async ([collection, prefix]) => {
      const byLocale = await Promise.all(
        locales.map(async (locale) => {
          const { docs } = await payload.find({
            collection,
            locale,
            fallbackLocale: false,
            limit: 0, // 0 = no limit (pagination: false alone still applies the default limit of 10)
            pagination: false,
            depth: 0,
            overrideAccess: false,
            where: { title: { exists: true } },
            select: { slug: true, title: true, updatedAt: true, seo: true } as any,
          })
          return { locale, docs: docs as Row[] }
        }),
      )
      const bySlug = new Map<string, Entry>()
      for (const { locale, docs } of byLocale) {
        for (const d of docs) {
          if (!d.slug || !d.title || d.seo?.noIndex) continue
          const e = bySlug.get(d.slug) ?? { path: `${prefix}/${d.slug}`, locales: [], updated: d.updatedAt }
          e.locales = [...e.locales, locale]
          bySlug.set(d.slug, e)
        }
      }
      return [...bySlug.values()]
    }),
  )
  entries.push(...perCollection.flat())

  const abs = (l: Locale, p: string) => `${siteUrl()}${localePath(l, p)}`
  return entries.flatMap((e) =>
    e.locales.map((l) => ({
      url: abs(l, e.path),
      lastModified: e.updated,
      alternates: isMultilingual && e.locales.length > 1 ? { languages: Object.fromEntries(e.locales.map((x) => [x, abs(x, e.path)])) } : undefined,
    })),
  )
}
