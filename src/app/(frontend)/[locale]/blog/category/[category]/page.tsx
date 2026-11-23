import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogView } from '../../../../../../components/pages/BlogView'
import { isLocale } from '../../../../../../config/locales'
import { getCategories, getLanding, getSettings } from '../../../../../../lib/queries'
import { buildMetadata } from '../../../../../../lib/seo'
import type { JournalLanding } from '../../../../../../payload-types'

type P = { params: Promise<{ locale: string; category: string }> }

export async function generateStaticParams(): Promise<{ locale: string; category: string }[]> {
  return []
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, category } = await params
  if (!isLocale(locale)) return {}
  const [l, s] = await Promise.all([getLanding<JournalLanding>('journal-landing', { locale }), getSettings({ locale })])
  return buildMetadata({ locale, path: `/blog/category/${category}`, title: l?.title, description: l?.intro, seo: l?.seo, siteName: s?.companyName })
}

export default async function BlogCategoryPage({ params }: P) {
  const { locale, category } = await params
  if (!isLocale(locale)) notFound()
  const cats = await getCategories({ locale })
  if (!cats.some((c) => c.slug === category)) notFound()
  return <BlogView locale={locale} category={category} />
}
