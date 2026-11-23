import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RenderBlocks } from '../../../../components/blocks/RenderBlocks'
import { Photo } from '../../../../components/ui/Photo'
import { PageHeader } from '../../../../components/ui/PageHeader'
import { isLocale, locales } from '../../../../config/locales'
import { img } from '../../../../lib/media'
import { getPageBySlug, getSettings, getSlugs } from '../../../../lib/queries'
import type { LocaleSlugParams } from '../../../../lib/route'
import { buildMetadata } from '../../../../lib/seo'

// Generic CMS pages (About and any page an editor creates in Pages).
export async function generateStaticParams(): Promise<{ locale: string; slug: string }[]> {
  const perLocale = await Promise.all(locales.map(async (locale) => (await getSlugs('pages', locale)).map((slug) => ({ locale, slug }))))
  return perLocale.flat()
}

export async function generateMetadata({ params }: LocaleSlugParams): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const [p, site] = await Promise.all([getPageBySlug(slug, { locale }), getSettings({ locale })])
  if (!p) return {}
  return buildMetadata({ locale, path: `/${slug}`, title: p.title, description: p.intro, seo: p.seo, siteName: site?.companyName, fallbackImage: p.featuredImage })
}

export default async function CmsPage({ params }: LocaleSlugParams) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const p = await getPageBySlug(slug, { locale })
  if (!p) notFound()
  const hero = img(p.featuredImage)
  return (
    <>
      <PageHeader label={p.title} title={p.title} intro={p.intro} />
      {hero && <div className="px-gutter"><Photo image={hero} eager /></div>}
      <RenderBlocks blocks={p.layout} locale={locale} />
      <div className="pb-section" />
    </>
  )
}
