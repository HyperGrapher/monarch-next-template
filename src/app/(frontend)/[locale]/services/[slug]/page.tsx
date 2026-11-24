import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '../../../../../components/blocks/RenderBlocks'
import { ProjectCard } from '../../../../../components/home/ProjectCard'
import { Photo } from '../../../../../components/ui/Photo'
import { PageHeader } from '../../../../../components/ui/PageHeader'
import { isLocale, localePath, locales } from '../../../../../config/locales'
import { getDictionary } from '../../../../../lib/i18n/dictionary'
import { img } from '../../../../../lib/media'
import { getService, getSettings, getSlugs, getTranslatedLocales } from '../../../../../lib/queries'
import type { LocaleSlugParams } from '../../../../../lib/route'
import { buildMetadata } from '../../../../../lib/seo'

export async function generateStaticParams(): Promise<{ locale: string; slug: string }[]> {
  const perLocale = await Promise.all(locales.map(async (locale) => (await getSlugs('services', locale)).map((slug) => ({ locale, slug }))))
  return perLocale.flat()
}

export async function generateMetadata({ params }: LocaleSlugParams): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const [s, site, availableLocales] = await Promise.all([getService(slug, { locale }), getSettings({ locale }), getTranslatedLocales('services', slug)])
  if (!s) return {}
  return buildMetadata({ locale, path: `/services/${slug}`, availableLocales, title: s.title, description: s.summary, seo: s.seo, siteName: site?.companyName, fallbackImage: s.coverImage })
}

export default async function ServicePage({ params }: LocaleSlugParams) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const s = await getService(slug, { locale })
  if (!s) notFound()
  const cover = img(s.coverImage)
  const related = (s.relatedProjects ?? []).filter((p): p is Exclude<typeof p, number> => typeof p !== 'number' && !!p.title)
  return (
    <>
      <PageHeader label={t.nav.services} title={s.title} intro={s.summary} />
      {cover && <div className="px-gutter"><Photo image={cover} eager /></div>}
      <RenderBlocks blocks={s.layout} locale={locale} />
      {related.length > 0 && (
        <section className="px-gutter py-section">
          <h2 className="t-label mb-10 border-t-[3px] border-ink pt-3">{t.service.relatedProjects}</h2>
          <div className="grid grid-cols-1 gap-y-14 md:grid-cols-12 md:gap-x-8">
            {related.map((p, i) => (
              <ProjectCard key={p.id} p={p} i={i} locale={locale} className={i % 2 ? 'md:col-span-5 md:col-start-7' : 'md:col-span-6'} />
            ))}
          </div>
        </section>
      )}
      <p className="px-gutter pb-section">
        <Link href={localePath(locale, '/services')} className="link-draw t-label inline-flex min-h-11 items-center">← {t.nav.services}</Link>
      </p>
    </>
  )
}
