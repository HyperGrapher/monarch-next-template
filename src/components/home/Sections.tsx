import Link from 'next/link'
import { localePath, type Locale } from '../../config/locales'
import { getDictionary } from '../../lib/i18n/dictionary'
import { img } from '../../lib/media'
import { formatDate } from '../../lib/text'
import type { HomePage, Post, Project, Service, SiteSetting } from '../../payload-types'
import { Photo } from '../ui/Photo'
import { SectionHead } from '../ui/SectionHead'
import { ProjectCard, rhythmClass } from './ProjectCard'

type L = { locale: Locale }
const num = (n: number) => String(n).padStart(2, '0')

export function Intro({ data, locale }: L & { data: HomePage['intro'] }) {
  if (!data?.statement) return null
  const t = getDictionary(locale)
  return (
    <section id="intro" className="px-gutter pt-section pb-[calc(var(--spacing-section)*0.6)]">
      <SectionHead n="01" label={t.home.introduction} />
      <p data-reveal="up" className="t-statement m-0 max-w-[18ch] md:max-w-[22ch]">
        {data.statement}
      </p>
      {data.facts?.length ? (
        <dl data-reveal="stagger" className="m-0 mt-[clamp(3rem,7vw,7rem)] grid grid-cols-2 border-t border-rule md:grid-cols-5">
          {data.facts.map((f) => (
            <div key={f.id} className="border-b border-rule py-4 md:pr-4">
              <dt className="t-label text-ash">{f.label}</dt>
              <dd className="m-0 mt-2 text-2xl font-bold tracking-[-0.03em]">{f.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  )
}

export function Work({ data, projects, locale }: L & { data: HomePage['work']; projects: Project[] }) {
  const t = getDictionary(locale)
  if (!projects.length) return null
  return (
    <section id="work" className="px-gutter py-section">
      <SectionHead n="02" label={t.home.work} />
      <h2 className="sr-only">{data?.heading}</h2>
      <div className="grid grid-cols-1 gap-y-[clamp(3.5rem,8vw,7rem)] md:grid-cols-12 md:gap-x-[clamp(1rem,2vw,2rem)]">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i} locale={locale} className={rhythmClass(i)} />
        ))}
      </div>
      <p data-reveal="up" className="mt-[clamp(3rem,6vw,6rem)] mb-0">
        <Link href={localePath(locale, '/projects')} className="link-draw t-label inline-flex min-h-11 items-center">
          {data?.moreLabel || t.allProjects} →
        </Link>
      </p>
    </section>
  )
}

export function Archive({ data, locale }: L & { data: HomePage['archive'] }) {
  const t = getDictionary(locale)
  if (!data) return null
  const cats = data.categories ?? []
  const max = Math.max(1, ...cats.map((c) => c.count))
  const strip = (data.images ?? []).map((x) => img(x.image)).filter((x): x is NonNullable<typeof x> => !!x)
  return (
    <section id="archive" className="bg-charcoal py-section text-paper">
      <div className="px-gutter">
        <SectionHead n="03" label={t.home.archive} />
        <h2 className="sr-only">{t.home.archive}</h2>
        {data.numbers?.length ? (
          <dl data-reveal="stagger" className="m-0 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {data.numbers.map((n) => (
              <div key={n.id}>
                <dd data-count={n.value} className="t-display m-0 block tabular-nums">
                  {n.value}
                </dd>
                <dt className="t-label mt-3 text-paper/70">{n.label}</dt>
              </div>
            ))}
          </dl>
        ) : null}
        {cats.length ? (
          <div className="mt-[clamp(4rem,9vw,9rem)] grid gap-10 md:grid-cols-12">
            <p className="t-label m-0 text-paper/70 md:col-span-3">{data.categoriesLabel || t.home.byCategory}</p>
            <ul data-reveal="stagger" className="m-0 list-none p-0 md:col-span-9">
              {cats.map((c) => (
                <li key={c.id} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 border-t border-paper/20 py-4 md:grid-cols-[20rem_1fr_3rem]">
                  <span className="t-heading">{c.name}</span>
                  <span className="order-3 col-span-2 h-[3px] bg-paper/15 md:order-none md:col-span-1" aria-hidden="true">
                    <span className="block h-full origin-left bg-paper" style={{ width: `${(c.count / max) * 100}%` }} />
                  </span>
                  <span className="t-heading text-right tabular-nums">{c.count}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      {strip.length > 0 && (
        <div className="mt-[clamp(4rem,9vw,9rem)]">
          <p className="t-label m-0 px-gutter text-paper/70">{data.stripLabel || t.home.fromArchive}</p>
          <ul className="m-0 mt-5 flex list-none snap-x gap-4 overflow-x-auto px-gutter pb-4 [scrollbar-color:var(--color-graphite)_transparent]" aria-label={t.home.fromArchive}>
            {strip.map((p, i) => (
              <li key={p.src} className="shrink-0 snap-start">
                <img src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" className="h-[min(60vh,32rem)] w-auto bg-charcoal object-cover" style={{ aspectRatio: `${p.width} / ${p.height}` }} />
                <p className="t-label mt-3 mb-0 text-paper/70">
                  {t.home.archiveWord} {num(i + 1)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export function Services({ data, services, locale }: L & { data: HomePage['services']; services: Service[] }) {
  const t = getDictionary(locale)
  if (!services.length) return null
  return (
    <section id="services" className="px-gutter py-section">
      <SectionHead n="04" label={t.home.services} />
      <h2 className="sr-only">{data?.heading}</h2>
      <ul data-reveal="stagger" className="m-0 list-none border-b border-ink p-0">
        {services.map((s, i) => (
          <li key={s.id} className="border-t border-ink">
            <Link href={localePath(locale, `/services/${s.slug}`)} className="group grid gap-x-8 gap-y-3 py-6 transition-colors duration-500 hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper md:grid-cols-12 md:items-baseline md:px-4 md:py-8">
              <span className="t-label md:col-span-1">{num(i + 1)}</span>
              <h3 className="t-statement m-0 md:col-span-7 md:transition-transform md:duration-500 md:ease-[var(--ease-out-arch)] md:group-hover:translate-x-3">{s.title}</h3>
              <p className="t-body m-0 max-w-md transition-colors duration-500 group-hover:text-paper/80 md:col-span-4">{s.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Approach({ data, locale }: L & { data: HomePage['approach'] }) {
  const t = getDictionary(locale)
  if (!data?.title) return null
  const image = img(data.image)
  return (
    <section id="approach" className="bg-mist px-gutter py-section">
      <SectionHead n="05" label={t.home.approach} />
      <h2 data-reveal="up" className="t-display m-0">
        {data.title}
      </h2>
      {data.intro && (
        <p data-reveal="up" className="t-lead mt-8 max-w-[44ch]">
          {data.intro}
        </p>
      )}
      <div className="mt-[clamp(3rem,8vw,8rem)] grid gap-12 md:grid-cols-12 md:gap-x-[clamp(1rem,2vw,2rem)]">
        {image && (
          <figure className="m-0 md:col-span-5">
            <Photo image={image} className="bg-rule" />
            {data.caption && <figcaption className="t-meta mt-3 text-graphite">{data.caption}</figcaption>}
          </figure>
        )}
        <ol data-reveal="stagger" className="m-0 list-none p-0 md:col-span-6 md:col-start-7">
          {data.principles?.map((p, i) => (
            <li key={p.id} className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-ink py-8">
              <span className="t-label pt-3">{num(i + 1)}</span>
              <div>
                <h3 className="t-statement m-0">{p.name}</h3>
                <p className="t-body mt-4 mb-0 max-w-[40ch]">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Studio({ data, settings, locale }: L & { data: HomePage['studio']; settings: SiteSetting | null }) {
  const t = getDictionary(locale)
  if (!data?.heading) return null
  return (
    <section id="studio" className="px-gutter py-section">
      <SectionHead n="06" label={t.home.studio} />
      <h2 data-reveal="up" className="t-statement m-0 max-w-[16ch]">
        {data.heading}
      </h2>
      <ul data-reveal="stagger" className="m-0 mt-[clamp(3rem,7vw,7rem)] grid list-none gap-10 p-0 md:grid-cols-3">
        {data.people?.map((p) => (
          <li key={p.id} className="border-t border-ink pt-4">
            <p className="t-label m-0 text-ash">{p.role}</p>
            <h3 className="t-heading mt-3 mb-0">{p.name}</h3>
            {p.text && <p className="t-body mt-3 mb-0 max-w-[30ch]">{p.text}</p>}
          </li>
        ))}
      </ul>
      {settings?.address?.length ? (
        <address data-reveal="up" className="t-meta mt-[clamp(3rem,6vw,6rem)] not-italic text-graphite">
          <span className="t-label block text-ash">{t.home.address}</span>
          <span className="mt-2 block">
            {settings.legalName}
            <br />
            {settings.address.map((a) => a.line).join(', ')}
          </span>
        </address>
      ) : null}
    </section>
  )
}

export function Journal({ data, posts, locale }: L & { data: HomePage['journal']; posts: Post[] }) {
  const t = getDictionary(locale)
  if (!posts.length) return null
  return (
    <section id="journal" className="px-gutter py-section">
      <SectionHead n="07" label={t.home.journal} />
      <h2 data-reveal="up" className="t-statement m-0 max-w-[16ch]">
        {data?.heading}
      </h2>
      <ul data-reveal="stagger" className="m-0 mt-[clamp(3rem,7vw,7rem)] grid list-none gap-x-[clamp(1rem,2vw,2rem)] gap-y-12 p-0 md:grid-cols-3">
        {posts.map((p) => {
          const image = img(p.featuredImage)
          return (
            <li key={p.id} className="group">
              <Link href={localePath(locale, `/blog/${p.slug}`)} className="block">
                {image && <Photo image={image} reveal={false} imgClassName="transition-transform duration-[1200ms] ease-[var(--ease-out-arch)] group-hover:scale-[1.03]" />}
                <p className="t-label mt-4 mb-0 text-ash">{formatDate(p.publishedAt, locale)}</p>
                <h3 className="t-heading link-draw mt-2 mb-0 text-[clamp(1.25rem,1rem+1vw,1.75rem)] group-hover:[background-size:100%_2px]">{p.title}</h3>
              </Link>
            </li>
          )
        })}
      </ul>
      <p className="mt-[clamp(3rem,6vw,6rem)] mb-0">
        <Link href={localePath(locale, '/blog')} className="link-draw t-label inline-flex min-h-11 items-center">
          {data?.moreLabel || t.allPosts} →
        </Link>
      </p>
    </section>
  )
}

export function ContactCta({ data, settings, locale }: L & { data: HomePage['contact']; settings: SiteSetting | null }) {
  const t = getDictionary(locale)
  if (!settings?.email) return null
  return (
    <section id="contact" className="bg-ink px-gutter py-section text-paper">
      <SectionHead n="08" label={t.home.contact} />
      <p data-reveal="up" className="t-lead m-0 max-w-[30ch] text-paper/80">
        {data?.lead}
      </p>
      <a href={`mailto:${settings.email}`} data-reveal="up" className="link-draw mt-8 block w-fit max-w-full text-[clamp(1.75rem,6.4vw,9rem)] leading-none font-extrabold tracking-[-0.05em] break-words">
        {settings.email}
      </a>
      <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
        <Link href={localePath(locale, '/contact')} className="inline-flex min-h-11 items-center bg-signal px-6 text-sm font-semibold text-ink no-underline transition-colors hover:bg-paper focus-visible:bg-paper">
          {data?.ctaLabel}
        </Link>
        <div className="t-meta flex flex-col gap-1 text-paper/70">
          {settings.phone && (
            <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="link-draw w-fit">
              {settings.phone}
            </a>
          )}
          {settings.careersEmail && (
            <a href={`mailto:${settings.careersEmail}`} className="link-draw w-fit">
              {t.home.careers}: {settings.careersEmail}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
