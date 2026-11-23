import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogView } from '../../../../../../../../components/pages/BlogView'
import { isLocale, locales } from '../../../../../../../../config/locales'
import { getCategories, getLanding, getSettings } from '../../../../../../../../lib/queries'
import { buildMetadata } from '../../../../../../../../lib/seo'
import type { JournalLanding } from '../../../../../../../../payload-types'

type P = { params: Promise<{ locale: string; category?: string; n?: string }> }

export const generateStaticParams = (): { locale: string }[] => []

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, category, n } = await params
  if (!isLocale(locale)) return {}
  const [l, s] = await Promise.all([getLanding<JournalLanding>('journal-landing', { locale }), getSettings({ locale })])
  return buildMetadata({ locale, path: `/blog${category ? `/category/${category}` : ''}${n ? `/page/${n}` : ''}`, title: l?.title, description: l?.intro, seo: l?.seo, siteName: s?.companyName })
}

export default async function Page({ params }: P) {
  const { locale, category, n } = await params
  if (!isLocale(locale)) notFound()
  const page = n === undefined ? 1 : Number(n)
  if (!Number.isInteger(page) || page < 2) notFound()
  if (category) {
    const cats = await getCategories({ locale })
    if (!cats.some((c) => c.slug === category)) notFound()
  }
  return <BlogView locale={locale} category={category} page={page} />
}
