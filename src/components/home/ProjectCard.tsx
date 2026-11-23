import Link from 'next/link'
import { localePath, type Locale } from '../../config/locales'
import { getDictionary } from '../../lib/i18n/dictionary'
import { img } from '../../lib/media'
import { formatArea } from '../../lib/text'
import type { Project } from '../../payload-types'
import { Photo } from '../ui/Photo'

export function ProjectCard({ p, i, locale, className = '' }: { p: Project; i: number; locale: Locale; className?: string }) {
  const t = getDictionary(locale)
  const cover = img(p.coverImage)
  const facts: [string, string][] = [
    [t.facts.type, t.types[p.type] ?? p.type],
    [t.facts.place, p.location ?? ''],
    [t.facts.year, String(p.year ?? '')],
    [t.facts.area, formatArea(p.areaM2, locale)],
  ].filter(([, v]) => v) as [string, string][]
  const inConstruction = p.buildStatus === 'inConstruction'
  return (
    <article className={`${className} group`}>
      <Link href={localePath(locale, `/projects/${p.slug}`)} className="block" aria-label={p.title}>
        {cover && <Photo image={cover} className="m-0" imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-out-arch)] group-hover:scale-[1.03] group-focus-within:scale-[1.03]" />}
        <div data-reveal="up" className="mt-5 flex items-baseline gap-4">
          <span className="t-label text-ash">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="t-heading link-draw m-0 group-hover:[background-size:100%_2px]">{p.title}</h3>
        </div>
      </Link>
      <dl className="t-meta m-0 mt-4 grid grid-cols-2 border-t border-rule">
        {facts.map(([k, v]) => (
          <div key={k} className="flex flex-col gap-0.5 border-b border-rule py-2 pr-3">
            <dt className="t-label text-ash">{k}</dt>
            <dd className="m-0 font-medium">{v}</dd>
          </div>
        ))}
        <div className="col-span-2 flex flex-col gap-0.5 border-b border-rule py-2 pr-3">
          <dt className="t-label text-ash">{t.facts.status}</dt>
          <dd className="m-0 flex items-center gap-2 font-medium">
            {inConstruction && <span aria-hidden="true" className="inline-block h-2 w-2 bg-signal" />}
            {inConstruction ? t.status.inConstruction : t.status.built}
          </dd>
        </div>
      </dl>
    </article>
  )
}

// Rhythm on the 12-col grid (md+): deliberate wide / narrow alternation, offset columns.
export const rhythm = [
  'md:col-span-8',
  'md:col-span-4 md:col-start-9 md:mt-[16vw]',
  'md:col-span-5 md:col-start-1',
  'md:col-span-7 md:col-start-6 md:mt-[8vw]',
  'md:col-span-8 md:col-start-5',
  'md:col-span-3 md:col-start-1 md:-mt-[22vw]',
]
export const rhythmMobile = ['', 'ml-[14%]', '', 'ml-[14%]', '', 'mr-[14%]']
export const rhythmClass = (i: number) => `${rhythm[i % rhythm.length]} ${rhythmMobile[i % rhythmMobile.length]}`
