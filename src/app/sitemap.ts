import type { MetadataRoute } from 'next'
import { isMultilingual, localePath, locales } from '../config/locales'
import { getClient } from '../lib/payload'
import { siteUrl } from '../lib/seo'

export const dynamic = 'force-dynamic'

// Published content only (draft: false + public access rules).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getClient()
  const entries: { path: string; updated?: string }[] = [{ path: '/' }, { path: '/services' }, { path: '/projects' }, { path: '/blog' }, { path: '/contact' }]
  for (const [collection, prefix] of [['pages', ''], ['services', '/services'], ['projects', '/projects'], ['posts', '/blog']] as const) {
    const { docs } = await payload.find({ collection, limit: 500, pagination: false, depth: 0, overrideAccess: false, select: { slug: true, updatedAt: true } as any })
    for (const d of docs as { slug: string; updatedAt: string }[]) entries.push({ path: `${prefix}/${d.slug}`, updated: d.updatedAt })
  }
  const abs = (l: (typeof locales)[number], p: string) => `${siteUrl()}${localePath(l, p)}`
  return entries.flatMap((e) =>
    locales.map((l) => ({
      url: abs(l, e.path),
      lastModified: e.updated,
      alternates: isMultilingual ? { languages: Object.fromEntries(locales.map((x) => [x, abs(x, e.path)])) } : undefined,
    })),
  )
}
