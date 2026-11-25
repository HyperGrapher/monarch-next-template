import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projectTypes } from '../../../../../../collections/Projects'
import { ProjectsView } from '../../../../../../components/pages/ProjectsView'
import { isLocale, locales } from '../../../../../../config/locales'
import { getDictionary } from '../../../../../../lib/i18n/dictionary'
import { getLanding, getSettings } from '../../../../../../lib/queries'
import type { LocaleParams } from '../../../../../../lib/route'
import { buildMetadata, withSuffix } from '../../../../../../lib/seo'
import type { ProjectsLanding } from '../../../../../../payload-types'

type P = { params: Promise<{ locale: string; type: string }> }

export const generateStaticParams = () => locales.flatMap((locale) => projectTypes.map((type) => ({ locale, type })))

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, type } = await params
  if (!isLocale(locale)) return {}
  const [l, s] = await Promise.all([getLanding<ProjectsLanding>('projects-landing', { locale }), getSettings({ locale })])
  if (!(projectTypes as readonly string[]).includes(type)) return {}
  return buildMetadata({ locale, path: `/projects/type/${type}`, ...withSuffix(l, getDictionary(locale).types[type]), description: l?.intro, siteName: s?.companyName })
}

export default async function ProjectsTypePage({ params }: P) {
  const { locale, type } = await params
  if (!isLocale(locale) || !(projectTypes as readonly string[]).includes(type)) notFound()
  return <ProjectsView locale={locale} type={type} />
}
