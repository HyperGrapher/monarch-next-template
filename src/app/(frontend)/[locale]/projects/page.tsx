import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProjectCard, rhythmClass } from '../../../../components/home/ProjectCard'
import { PageHeader } from '../../../../components/ui/PageHeader'
import { isLocale, localePath } from '../../../../config/locales'
import { getDictionary } from '../../../../lib/i18n/dictionary'
import { getLanding, getProjects, getSettings } from '../../../../lib/queries'
import type { LocaleParams } from '../../../../lib/route'
import { buildMetadata } from '../../../../lib/seo'
import { projectTypes } from '../../../../collections/Projects'
import type { ProjectsLanding } from '../../../../payload-types'

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const [l, s] = await Promise.all([getLanding<ProjectsLanding>('projects-landing', { locale }), getSettings({ locale })])
  return buildMetadata({ locale, path: '/projects', title: l?.title, description: l?.intro, seo: l?.seo, siteName: s?.companyName })
}

export default async function ProjectsPage({ params, searchParams }: LocaleParams & { searchParams: Promise<{ type?: string }> }) {
  const { locale } = await params
  const { type } = await searchParams
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const active = projectTypes.find((x) => x === type)
  const [l, projects] = await Promise.all([getLanding<ProjectsLanding>('projects-landing', { locale }), getProjects({ locale }, active ? { type: { equals: active } } : undefined)])
  const base = localePath(locale, '/projects')
  return (
    <>
      <PageHeader label={t.nav.projects} title={l?.title ?? t.nav.projects} intro={l?.intro} />
      <nav aria-label={t.nav.projects} className="px-gutter pb-10">
        <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-1 p-0">
          {[undefined, ...projectTypes].map((x) => (
            <li key={x ?? 'all'}>
              <Link href={x ? `${base}?type=${x}` : base} aria-current={x === active ? 'true' : undefined} className="link-draw t-label inline-flex min-h-11 items-center">
                {x ? t.types[x] : t.all}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="grid grid-cols-1 gap-y-[clamp(3.5rem,8vw,7rem)] px-gutter pb-section md:grid-cols-12 md:gap-x-[clamp(1rem,2vw,2rem)]">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i} locale={locale} className={rhythmClass(i)} />
        ))}
      </div>
    </>
  )
}
