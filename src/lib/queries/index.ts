import { cache } from 'react'
import type { Where } from 'payload'
import { locales, type Locale } from '../../config/locales'
import type { Category, ContactPage, HomePage, JournalLanding, Page, Post, Project, ProjectsLanding, Service, ServicesLanding, SiteSetting } from '../../payload-types'
import { getClient, isDraft } from '../payload'

type Ctx = { locale: Locale }

/*
 * Every query: explicit locale, NO silent fallback (missing translations stay missing),
 * published-only for visitors, drafts only when draft mode is on (set by /api/preview).
 *
 * Every query is wrapped in React `cache()`: the layout, the page and both generateMetadata calls ask for
 * the same data during one render, and this runs each query once. `cache()` compares arguments by identity,
 * so the cached functions take primitives (locale, slug, page…), never fresh `{ locale }` objects.
 */

/**
 * Fields of a related document that pages actually render (cards, links). Without this, populating a
 * project from the home page or a block would also load its whole page layout, gallery and SEO group.
 */
const cardFields = {
  projects: { title: true, slug: true, summary: true, coverImage: true, type: true, location: true, year: true, areaM2: true, buildStatus: true },
  services: { title: true, slug: true, summary: true, coverImage: true },
  posts: { title: true, slug: true, excerpt: true, featuredImage: true, publishedAt: true },
  categories: { name: true, slug: true },
} as const

const base = async (locale: Locale) => {
  const draft = await isDraft()
  return { payload: await getClient(), opts: { locale, fallbackLocale: false as const, draft, overrideAccess: draft, depth: 2, populate: cardFields as any } }
}

/** Drop documents that have no title in this locale (i.e. not translated yet). */
const translated = <T extends { title?: string | null }>(docs: T[]) => docs.filter((d) => !!d.title)

/** Documents that have a title in the requested locale. Filtering in the query (not afterwards) keeps pagination right. */
const hasTitle: Where = { title: { exists: true } }
const and = (...parts: (Where | undefined)[]): Where => ({ and: parts.filter((p): p is Where => !!p) })

// ── Globals ──────────────────────────────────────────────────────────────────────────────────────

const settings = cache(async (locale: Locale): Promise<SiteSetting | null> => {
  const payload = await getClient()
  return (await payload.findGlobal({ slug: 'site-settings', locale, fallbackLocale: false, depth: 1 }).catch((): null => null)) as SiteSetting | null
})
export const getSettings = ({ locale }: Ctx) => settings(locale)

const home = cache(async (locale: Locale): Promise<HomePage | null> => {
  const { payload, opts } = await base(locale)
  return (await payload.findGlobal({ slug: 'home-page', ...opts }).catch((): null => null)) as HomePage | null
})
export const getHome = ({ locale }: Ctx) => home(locale)

type LandingSlug = 'services-landing' | 'projects-landing' | 'journal-landing' | 'contact-page'
type Landing = ServicesLanding | ProjectsLanding | JournalLanding | ContactPage
const landing = cache(async (slug: LandingSlug, locale: Locale): Promise<Landing | null> => {
  const { payload, opts } = await base(locale)
  return (await payload.findGlobal({ slug, ...opts, depth: 1 }).catch((): null => null)) as Landing | null
})
export const getLanding = <T extends Landing = Landing>(slug: LandingSlug, { locale }: Ctx) => landing(slug, locale) as Promise<T | null>

// ── Detail pages (full document) ─────────────────────────────────────────────────────────────────

const bySlug = cache(async (collection: 'pages' | 'services' | 'projects' | 'posts', slug: string, locale: Locale) => {
  const { payload, opts } = await base(locale)
  const { docs } = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, ...opts })
  return translated(docs as { title?: string | null }[])[0] ?? null
})
export const getPageBySlug = (slug: string, { locale }: Ctx) => bySlug('pages', slug, locale) as Promise<Page | null>
export const getService = (slug: string, { locale }: Ctx) => bySlug('services', slug, locale) as Promise<Service | null>
export const getProject = (slug: string, { locale }: Ctx) => bySlug('projects', slug, locale) as Promise<Project | null>
export const getPost = (slug: string, { locale }: Ctx) => bySlug('posts', slug, locale) as Promise<Post | null>

// ── Lists (card fields only) ─────────────────────────────────────────────────────────────────────

const services = cache(async (locale: Locale): Promise<Service[]> => {
  const { payload, opts } = await base(locale)
  const { docs } = await payload.find({ collection: 'services', sort: 'order', limit: 50, pagination: false, ...opts, depth: 1, where: hasTitle, select: { ...cardFields.services, order: true } })
  return translated(docs as Service[])
})
export const getServices = ({ locale }: Ctx) => services(locale)

const projects = cache(async (locale: Locale, whereKey: string): Promise<Project[]> => {
  const { payload, opts } = await base(locale)
  const where = and(hasTitle, whereKey ? (JSON.parse(whereKey) as Where) : undefined)
  const { docs } = await payload.find({ collection: 'projects', sort: 'order', limit: 100, pagination: false, ...opts, depth: 1, where, select: { ...cardFields.projects, order: true, featured: true } })
  return translated(docs as Project[])
})
export const getProjects = ({ locale }: Ctx, where?: Where) => projects(locale, where ? JSON.stringify(where) : '')

/** Title + slug of every project, in display order (the "next project" link). */
const projectNav = cache(async (locale: Locale) => {
  const { payload, opts } = await base(locale)
  const { docs } = await payload.find({ collection: 'projects', sort: 'order', limit: 100, pagination: false, ...opts, depth: 0, where: hasTitle, select: { title: true, slug: true } })
  return translated(docs as Pick<Project, 'id' | 'title' | 'slug'>[])
})
export const getProjectNav = ({ locale }: Ctx) => projectNav(locale)

export const POSTS_PER_PAGE = 6
const posts = cache(async (locale: Locale, page: number, categorySlug: string) => {
  const { payload, opts } = await base(locale)
  const where = and(hasTitle, categorySlug ? { 'categories.slug': { equals: categorySlug } } : undefined)
  const res = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit: POSTS_PER_PAGE,
    page,
    where,
    ...opts,
    depth: 1,
    select: { ...cardFields.posts, categories: true },
  })
  return { ...res, docs: translated(res.docs as Post[]) }
})
export const getPosts = ({ locale }: Ctx, page = 1, categorySlug?: string) => posts(locale, page, categorySlug ?? '')

const relatedPosts = cache(async (postId: number, locale: Locale, limit: number) => {
  const { payload, opts } = await base(locale)
  const { docs } = await payload.find({ collection: 'posts', where: and(hasTitle, { id: { not_equals: postId } }), sort: '-publishedAt', limit, ...opts, depth: 0, select: { title: true, slug: true, publishedAt: true } })
  return translated(docs as Pick<Post, 'id' | 'title' | 'slug' | 'publishedAt'>[])
})
export const getRelatedPosts = (post: Pick<Post, 'id'>, { locale }: Ctx, limit = 3) => relatedPosts(post.id, locale, limit)

const categories = cache(async (locale: Locale): Promise<Category[]> => {
  const payload = await getClient()
  const { docs } = await payload.find({ collection: 'categories', locale, fallbackLocale: false, limit: 50, pagination: false, sort: 'slug', depth: 0 })
  return docs.filter((c) => !!c.name)
})
export const getCategories = ({ locale }: Ctx) => categories(locale)

// ── Static params / SEO ──────────────────────────────────────────────────────────────────────────

/** Slugs of PUBLISHED, translated docs (public access rules apply, so drafts never appear) — used by generateStaticParams so detail pages are prerendered/ISR-cached. */
export async function getSlugs(collection: 'pages' | 'services' | 'projects' | 'posts', locale: Locale): Promise<string[]> {
  const payload = await getClient()
  const { docs } = await payload.find({ collection, locale, fallbackLocale: false, limit: 0, pagination: false, depth: 0, overrideAccess: false, where: hasTitle, select: { slug: true, title: true } as any })
  return (docs as { slug?: string | null; title?: string | null }[]).filter((d) => d.slug && d.title).map((d) => d.slug as string)
}

/**
 * Locales in which a published document with this slug has a title (used for hreflang alternates:
 * never point search engines at a translation that 404s).
 */
export const getTranslatedLocales = cache(async (collection: 'pages' | 'services' | 'projects' | 'posts', slug: string): Promise<Locale[]> => {
  const payload = await getClient()
  const { docs } = await payload.find({ collection, locale: 'all', where: { slug: { equals: slug } }, limit: 1, depth: 0, overrideAccess: false, select: { title: true } as any })
  const titles = (docs[0] as unknown as { title?: Record<string, string | null> } | undefined)?.title ?? {}
  return locales.filter((l) => !!titles[l])
})
