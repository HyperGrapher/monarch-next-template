import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogView } from '../../../../components/pages/BlogView'
import { isLocale } from '../../../../config/locales'
import { getLanding, getSettings } from '../../../../lib/queries'
import type { LocaleParams } from '../../../../lib/route'
import { buildMetadata } from '../../../../lib/seo'
import type { JournalLanding } from '../../../../payload-types'

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const [l, s] = await Promise.all([getLanding<JournalLanding>('journal-landing', { locale }), getSettings({ locale })])
  return buildMetadata({ locale, path: '/blog', title: l?.title, description: l?.intro, seo: l?.seo, siteName: s?.companyName })
}

export default async function BlogPage({ params }: LocaleParams) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <BlogView locale={locale} />
}
