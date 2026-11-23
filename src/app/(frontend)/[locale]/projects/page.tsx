import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectsView } from '../../../../components/pages/ProjectsView'
import { isLocale } from '../../../../config/locales'
import { getLanding, getProjects, getSettings } from '../../../../lib/queries'
import type { LocaleParams } from '../../../../lib/route'
import { buildMetadata } from '../../../../lib/seo'
import type { ProjectsLanding } from '../../../../payload-types'

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const [l, s] = await Promise.all([getLanding<ProjectsLanding>('projects-landing', { locale }), getSettings({ locale })])
  return buildMetadata({ locale, path: '/projects', title: l?.title, description: l?.intro, seo: l?.seo, siteName: s?.companyName })
}

export default async function ProjectsPage({ params }: LocaleParams) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <ProjectsView locale={locale} />
}
