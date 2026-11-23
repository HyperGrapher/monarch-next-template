import type { Locale } from '../../config/locales'
import type { Category, ContactPage, HomePage, JournalLanding, Page, Post, Project, ProjectsLanding, Service, ServicesLanding, SiteSetting } from '../../payload-types'
import { getClient, isDraft } from '../payload'

type Ctx = { locale: Locale }

// Every query: explicit locale, NO silent fallback (missing translations stay missing),
// published-only for visitors, drafts only when draft mode is on (set by /api/preview).
const base = async (locale: Locale) => {
  const draft = await isDraft()
  return { payload: await getClient(), opts: { locale, fallbackLocale: false as const, draft, overrideAccess: draft, depth: 2 } }
}

/** Drop documents that have no title in this locale (i.e. not translated yet). */
const translated = <T extends { title?: string | null }>(docs: T[]) => docs.filter((d) => !!d.title)

export async function getSettings({ locale }: Ctx): Promise<SiteSetting | null> {
  const payload = await getClient()
  return (await payload.findGlobal({ slug: 'site-settings', locale, fallbackLocale: false, depth: 1 }).catch((): null => null)) as SiteSetting | null
}
export async function getHome({ locale }: Ctx): Promise<HomePage | null> {
  const { payload, opts } = await base(locale)
  return (await payload.findGlobal({ slug: 'home-page', ...opts }).catch((): null => null)) as HomePage | null
}
type Landing = ServicesLanding | ProjectsLanding | JournalLanding | ContactPage
export async function getLanding<T extends Landing = Landing>(slug: 'services-landing' | 'projects-landing' | 'journal-landing' | 'contact-page', { locale }: Ctx): Promise<T | null> {
  const { payload, opts } = await base(locale)
  return (await payload.findGlobal({ slug, ...opts }).catch((): null => null)) as T | null
}

export async function getPageBySlug(slug: string, { locale }: Ctx): Promise<Page | null> {
  const { payload, opts } = await base(locale)
  const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1, ...opts })
  return translated(docs)[0] ?? null
}

export async function getServices({ locale }: Ctx): Promise<Service[]> {
  const { payload, opts } = await base(locale)
  const { docs } = await payload.find({ collection: 'services', sort: 'order', limit: 50, pagination: false, ...opts })
  return translated(docs)
}
export async function getService(slug: string, { locale }: Ctx): Promise<Service | null> {
  const { payload, opts } = await base(locale)
  const { docs } = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, limit: 1, ...opts })
  return translated(docs)[0] ?? null
}

export async function getProjects({ locale }: Ctx, where?: Record<string, unknown>): Promise<Project[]> {
  const { payload, opts } = await base(locale)
  const { docs } = await payload.find({ collection: 'projects', sort: 'order', limit: 100, pagination: false, where: where as any, ...opts })
  return translated(docs)
}
export async function getProject(slug: string, { locale }: Ctx): Promise<Project | null> {
  const { payload, opts } = await base(locale)
  const { docs } = await payload.find({ collection: 'projects', where: { slug: { equals: slug } }, limit: 1, ...opts })
  return translated(docs)[0] ?? null
}

export const POSTS_PER_PAGE = 6
export async function getPosts({ locale }: Ctx, page = 1, categorySlug?: string) {
  const { payload, opts } = await base(locale)
  const where: any = categorySlug ? { 'categories.slug': { equals: categorySlug } } : undefined
  const res = await payload.find({ collection: 'posts', sort: '-publishedAt', limit: POSTS_PER_PAGE, page, where, ...opts })
  return { ...res, docs: translated(res.docs) }
}
export async function getPost(slug: string, { locale }: Ctx): Promise<Post | null> {
  const { payload, opts } = await base(locale)
  const { docs } = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, limit: 1, ...opts })
  return translated(docs)[0] ?? null
}
export async function getRelatedPosts(post: Post, { locale }: Ctx, limit = 3): Promise<Post[]> {
  const { payload, opts } = await base(locale)
  const { docs } = await payload.find({ collection: 'posts', where: { id: { not_equals: post.id } }, sort: '-publishedAt', limit: limit + 3, ...opts })
  return translated(docs).slice(0, limit)
}
export async function getCategories({ locale }: Ctx): Promise<Category[]> {
  const { payload } = await base(locale)
  const { docs } = await payload.find({ collection: 'categories', locale, fallbackLocale: false, limit: 50, pagination: false, sort: 'slug' })
  return docs.filter((c) => !!c.name)
}

/** Slugs of published, translated docs — used by generateStaticParams so detail pages are prerendered/ISR-cached. */
export async function getSlugs(collection: 'pages' | 'services' | 'projects' | 'posts', locale: Locale): Promise<string[]> {
  const payload = await getClient()
  const { docs } = await payload.find({ collection, locale, fallbackLocale: false, limit: 500, pagination: false, depth: 0, select: { slug: true, title: true } as any })
  return (docs as { slug?: string | null; title?: string | null }[]).filter((d) => d.slug && d.title).map((d) => d.slug as string)
}
