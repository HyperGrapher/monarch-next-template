/**
 * Seeds / RESETS the fictional bilingual demo content.
 *   pnpm seed     (uses DATABASE_URL, and BLOB_READ_WRITE_TOKEN if set, else ./media) — point it at the DB you mean!
 * WARNING: deletes all content collections (not users, not contact messages) before re-creating them.
 */
import path from 'path'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { defaultLocale, locales } from '../src/config/locales'
import * as c from '../seed/content'

const photoDir = path.resolve(process.cwd(), 'seed/photos')
const other = locales.filter((l) => l !== defaultLocale)

// Array/block row ids are table-wide primary keys: namespace them per document (same in every locale).
const scope = (value: any, prefix: string): any => {
  if (Array.isArray(value)) return value.map((v) => scope(v, prefix))
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, k === 'id' && typeof v === 'string' ? `${prefix}-${v}` : scope(v, prefix)]))
  }
  return value
}

async function main() {
  const payload = await getPayload({ config: await config })
  const log = (m: string) => console.log(`[seed] ${m}`)

  // Contact submissions are real visitor messages, never demo content: they are left alone.
  for (const collection of ['pages', 'projects', 'services', 'posts', 'categories', 'media'] as const) {
    await payload.delete({ collection, where: { id: { exists: true } }, overrideAccess: true })
  }
  log('cleared content collections')

  // Media (alt text per locale)
  const ids: Record<string, number> = {}
  for (const [key, alt] of Object.entries(c.photoAlt)) {
    const doc = await payload.create({ collection: 'media', locale: defaultLocale, data: { alt: alt[defaultLocale] }, filePath: path.join(photoDir, `${key}.webp`) })
    for (const l of other) await payload.update({ collection: 'media', id: doc.id, locale: l, data: { alt: alt[l] } })
    ids[key] = doc.id
  }
  log(`media: ${Object.keys(ids).length}`)

  // helper: create in default locale, then merge each other locale into the same rows
  async function upsert<T extends 'categories' | 'services' | 'projects' | 'posts' | 'pages'>(collection: T, build: (l: (typeof locales)[number]) => Record<string, any>) {
    const prefix = `${collection}-${String(build(defaultLocale).slug)}`
    const doc = await payload.create({ collection, locale: defaultLocale, data: { ...scope(build(defaultLocale), prefix), _status: 'published' } as any, draft: false })
    for (const l of other) await payload.update({ collection, id: doc.id, locale: l, data: { ...scope(build(l), prefix), _status: 'published' } as any, draft: false })
    return doc.id as number
  }

  const catIds: Record<string, number> = {}
  for (const cat of c.categories) catIds[cat.slug] = await upsert('categories', (l) => ({ slug: cat.slug, name: cat.name[l], description: cat.description[l] }))

  const svcIds: number[] = []
  const svcCount = c.services(defaultLocale, ids).length
  for (let i = 0; i < svcCount; i++) {
    svcIds.push(await upsert('services', (l) => {
      const s = c.services(l, ids)[i]
      return { slug: s.slug, order: s.order, featured: s.featured, coverImage: s.cover, title: s.title, summary: s.summary, layout: s.layout }
    }))
  }

  const projIds: number[] = []
  const projCount = c.projects(defaultLocale, ids).length
  for (let i = 0; i < projCount; i++) {
    projIds.push(await upsert('projects', (l) => {
      const p = c.projects(l, ids)[i]
      return { slug: p.slug, type: p.type, year: p.year, areaM2: p.areaM2, buildStatus: p.buildStatus, order: p.order, featured: p.featured, coverImage: p.cover, gallery: p.gallery, title: p.title, location: p.location, summary: p.summary, layout: p.layout, relatedServices: [svcIds[i % svcIds.length]] }
    }))
  }
  // services ↔ projects (related)
  for (let i = 0; i < svcIds.length; i++) await payload.update({ collection: 'services', id: svcIds[i], locale: defaultLocale, data: { relatedProjects: projIds.filter((_, j) => j % svcIds.length === i) } as any, draft: false })

  const postCount = c.posts(defaultLocale, ids).length
  for (let i = 0; i < postCount; i++) {
    await upsert('posts', (l) => {
      const p = c.posts(l, ids)[i]
      return { slug: p.slug, title: p.title, excerpt: p.excerpt, content: p.content, featuredImage: p.image, author: p.author, publishedAt: new Date(p.date).toISOString(), categories: [catIds[p.cat]] }
    })
  }
  await upsert('pages', (l) => c.aboutPage(l, ids))
  log('collections done')

  // Globals
  for (const l of locales) {
    await payload.updateGlobal({ slug: 'site-settings', locale: l, data: scope(c.siteSettings(l, ids), 'site') as any })
    await payload.updateGlobal({ slug: 'home-page', locale: l, data: { ...scope(c.homePage(l, ids, projIds, svcIds), 'home'), _status: 'published' } as any, draft: false })
    const lands = c.landings(l)
    for (const slug of Object.keys(lands) as (keyof typeof lands)[]) await payload.updateGlobal({ slug, locale: l, data: scope(lands[slug], String(slug)) as any })
  }
  log('globals done')

  // Existing admin accounts keep their data. No default credentials are created here.
  process.exit(0)
}

// Top-level await: `payload run` exits when the module finishes loading.
try {
  await main()
} catch (e) {
  console.error(e)
  process.exit(1)
}
