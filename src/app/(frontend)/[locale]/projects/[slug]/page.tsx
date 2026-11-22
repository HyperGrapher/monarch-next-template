import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '../../../../../components/blocks/RenderBlocks'
import { Photo } from '../../../../../components/ui/Photo'
import { PageHeader } from '../../../../../components/ui/PageHeader'
import { isLocale, localePath } from '../../../../../config/locales'
import { getDictionary } from '../../../../../lib/i18n/dictionary'
import { img } from '../../../../../lib/media'
import { getProject, getProjects, getSettings } from '../../../../../lib/queries'
import type { LocaleSlugParams } from '../../../../../lib/route'
import { buildMetadata } from '../../../../../lib/seo'
import { formatArea } from '../../../../../lib/text'

export async function generateMetadata({ params }: LocaleSlugParams): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const [p, site] = await Promise.all([getProject(slug, { locale }), getSettings({ locale })])
  if (!p) return {}
  return buildMetadata({ locale, path: `/projects/${slug}`, title: p.title, description: p.summary, seo: p.seo, siteName: site?.companyName, fallbackImage: p.coverImage })
}

export default async function ProjectPage({ params }: LocaleSlugParams) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const p = await getProject(slug, { locale })
  if (!p) notFound()
  const all = await getProjects({ locale })
  const idx = all.findIndex((x) => x.id === p.id)
  const next = all.length > 1 ? all[(idx + 1) % all.length] : null
  const cover = img(p.coverImage)
  const gallery = (p.gallery ?? []).map((g) => ({ id: g.id, image: img(g.image), caption: g.caption })).filter((g) => g.image)
  const services = (p.relatedServices ?? []).filter((s): s is Exclude<typeof s, number> => typeof s !== 'number' && !!s.title)
  const facts: [string, string][] = [
    [t.facts.type, t.types[p.type] ?? p.type],
    [t.facts.place, p.location ?? ''],
    [t.facts.year, String(p.year ?? '')],
    [t.facts.area, formatArea(p.areaM2, locale)],
    [t.facts.status, p.status === 'inConstruction' ? t.status.inConstruction : t.status.built],
  ].filter(([, v]) => v) as [string, string][]
  return (
    <>
      <PageHeader label={t.nav.projects} title={p.title} intro={p.summary} />
      {cover && <div className="px-gutter"><Photo image={cover} eager /></div>}
      <dl className="t-meta m-0 mx-gutter mt-8 grid grid-cols-2 border-t border-ink md:grid-cols-5">
        {facts.map(([k, v]) => (
          <div key={k} className="border-b border-rule py-3 pr-3">
            <dt className="t-label text-ash">{k}</dt>
            <dd className="m-0 mt-1 text-base font-medium">{v}</dd>
          </div>
        ))}
      </dl>
      <RenderBlocks blocks={p.layout} locale={locale} />
      {gallery.length > 0 && (
        <section className="px-gutter py-[clamp(3rem,6vw,6rem)]">
          <h2 className="t-label mb-10 border-t-[3px] border-ink pt-3">{t.project.gallery}</h2>
          <ul className="m-0 grid list-none gap-x-[clamp(1rem,2vw,2rem)] gap-y-10 p-0 md:grid-cols-2">
            {gallery.map((g) => (
              <li key={g.id}>
                <figure className="m-0"><Photo image={g.image!} />{g.caption && <figcaption className="t-meta mt-3 text-graphite">{g.caption}</figcaption>}</figure>
              </li>
            ))}
          </ul>
        </section>
      )}
      {services.length > 0 && (
        <section className="px-gutter py-[clamp(2rem,5vw,5rem)]">
          <h2 className="t-label mb-4 border-t-[3px] border-ink pt-3">{t.project.relatedServices}</h2>
          <ul className="m-0 flex list-none flex-wrap gap-x-8 p-0">
            {services.map((s) => (
              <li key={s.id}><Link href={localePath(locale, `/services/${s.slug}`)} className="link-draw t-heading inline-block">{s.title}</Link></li>
            ))}
          </ul>
        </section>
      )}
      {next && (
        <section className="px-gutter py-section">
          <p className="t-label mb-3 text-ash">{t.project.next}</p>
          <Link href={localePath(locale, `/projects/${next.slug}`)} className="link-draw t-display inline-block max-w-full break-words">{next.title} →</Link>
        </section>
      )}
    </>
  )
}
