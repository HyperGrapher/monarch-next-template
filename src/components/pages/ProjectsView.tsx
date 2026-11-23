import Link from 'next/link'
import { projectTypes } from '../../collections/Projects'
import { localePath, type Locale } from '../../config/locales'
import { getDictionary } from '../../lib/i18n/dictionary'
import { getLanding, getProjects } from '../../lib/queries'
import type { ProjectsLanding } from '../../payload-types'
import { ProjectCard, rhythmClass } from '../home/ProjectCard'
import { PageHeader } from '../ui/PageHeader'

/** Statically cached: the type filter is a path (/projects/type/x), not a query string. */
export async function ProjectsView({ locale, type }: { locale: Locale; type?: string }) {
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
              <Link href={x ? `${base}/type/${x}` : base} aria-current={x === active ? 'true' : undefined} className="link-draw t-label inline-flex min-h-11 items-center">
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
