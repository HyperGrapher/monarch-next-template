import Link from 'next/link'
import { localePath, type Locale } from '../../config/locales'
import { resolveHref, isExternal } from '../../lib/links'
import { img } from '../../lib/media'
import { getProjects, getServices } from '../../lib/queries'
import type { Page } from '../../payload-types'
import { ProjectCard, rhythmClass } from '../home/ProjectCard'
import { Photo } from '../ui/Photo'
import { RichText } from '../ui/RichText'

type Block = NonNullable<Page['layout']>[number]
type Props = { blocks?: Block[] | null; locale: Locale }

const heading = (text?: string | null) => (text ? <h2 data-reveal="up" className="t-heading m-0 max-w-[24ch]">{text}</h2> : null)
const Btn = ({ href, children, locale, tone = 'signal' }: { href: string; children: React.ReactNode; locale: Locale; tone?: 'signal' | 'ink' }) => {
  const cls = `inline-flex min-h-11 items-center px-6 text-sm font-semibold no-underline transition-colors ${tone === 'signal' ? 'bg-signal text-ink hover:bg-ink hover:text-paper' : 'border border-current hover:bg-paper hover:text-ink'}`
  const h = resolveHref(href, locale)
  return isExternal(href) ? (
    <a href={h} className={cls} target="_blank" rel="noreferrer">{children}</a>
  ) : (
    <Link href={h} className={cls}>{children}</Link>
  )
}

export async function RenderBlocks({ blocks, locale }: Props) {
  if (!blocks?.length) return null
  const out = await Promise.all(
    blocks.map(async (b) => {
      switch (b.blockType) {
        case 'hero': {
          const image = img(b.image)
          return (
            <section key={b.id} className="px-gutter py-[clamp(3rem,6vw,6rem)]">
              {b.eyebrow && <p className="t-label mb-4 text-ash">{b.eyebrow}</p>}
              <h2 data-reveal="up" className="t-statement m-0 max-w-[18ch]">{b.heading}</h2>
              <div className={`mt-10 grid gap-10 ${b.layout === 'split' && image ? 'md:grid-cols-12' : ''}`}>
                <div className={b.layout === 'split' && image ? 'md:col-span-5' : 'max-w-[60ch]'}>
                  <RichText data={b.body} />
                  {b.ctas?.length ? (
                    <div className="mt-8 flex flex-wrap gap-4">
                      {b.ctas.map((c, i) => (
                        <Btn key={c.id} href={c.url} locale={locale} tone={i === 0 ? 'signal' : 'ink'}>{c.label}</Btn>
                      ))}
                    </div>
                  ) : null}
                </div>
                {image && <div className={b.layout === 'split' ? 'md:col-span-7' : ''}><Photo image={image} sizes={b.layout === 'split' ? '(min-width: 768px) 58vw, 100vw' : '100vw'} eager /></div>}
              </div>
            </section>
          )
        }
        case 'richText':
          return (
            <section key={b.id} className="px-gutter py-[clamp(2rem,5vw,5rem)]">
              <div className={`grid gap-8 ${b.width === 'wide' ? '' : 'md:grid-cols-12'}`}>
                {b.heading && <div className={b.width === 'wide' ? '' : 'md:col-span-4'}>{heading(b.heading)}</div>}
                <div className={b.width === 'wide' ? 'max-w-[90ch]' : 'md:col-span-7 md:col-start-6 max-w-[65ch]'} data-reveal="up">
                  <RichText data={b.content} />
                </div>
              </div>
            </section>
          )
        case 'textImage': {
          const image = img(b.image)
          const left = b.imagePosition === 'left'
          return (
            <section key={b.id} className={`px-gutter py-[clamp(3rem,7vw,7rem)] ${b.background === 'mist' ? 'bg-mist' : ''}`}>
              <div className="grid items-start gap-10 md:grid-cols-12 md:gap-x-[clamp(1rem,2vw,2rem)]">
                {image && <div className={`md:col-span-6 ${left ? 'md:order-1' : 'md:order-2 md:col-start-7'}`}><Photo image={image} sizes="(min-width: 768px) 50vw, 100vw" /></div>}
                <div className={`md:col-span-5 ${left ? 'md:order-2 md:col-start-8' : 'md:order-1 md:col-start-1'}`}>
                  {heading(b.heading)}
                  <div className="mt-6" data-reveal="up"><RichText data={b.content} /></div>
                </div>
              </div>
            </section>
          )
        }
        case 'gallery': {
          const items = (b.images ?? []).map((g) => ({ image: img(g.image), caption: g.caption, id: g.id })).filter((g) => g.image)
          const stag = b.layout !== 'grid'
          return (
            <section key={b.id} className="px-gutter py-[clamp(2rem,5vw,5rem)]">
              <ul className="m-0 grid list-none gap-x-[clamp(1rem,2vw,2rem)] gap-y-10 p-0 md:grid-cols-2">
                {items.map((g, i) => (
                  <li key={g.id} className={stag && i % 3 === 0 ? 'md:col-span-2' : stag && i % 3 === 2 ? 'md:mt-[8vw]' : ''}>
                    <figure className="m-0">
                      <Photo image={g.image!} sizes={stag && i % 3 === 0 ? '100vw' : '(min-width: 768px) 50vw, 100vw'} />
                      {g.caption && <figcaption className="t-meta mt-3 text-graphite">{g.caption}</figcaption>}
                    </figure>
                  </li>
                ))}
              </ul>
            </section>
          )
        }
        case 'stats':
          return (
            <section key={b.id} className="px-gutter py-[clamp(3rem,6vw,6rem)]">
              {heading(b.heading)}
              <dl data-reveal="stagger" className="m-0 mt-10 grid grid-cols-2 border-t border-ink md:grid-cols-4">
                {b.items.map((s) => (
                  <div key={s.id} className="border-b border-rule py-6 pr-4">
                    <dd className="t-display m-0 tabular-nums">{s.value}</dd>
                    <dt className="t-label mt-3 text-ash">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </section>
          )
        case 'servicesGrid': {
          const picked = (b.services ?? []).filter((s): s is Exclude<typeof s, number> => typeof s !== 'number' && !!s.title)
          const services = picked.length ? picked : await getServices({ locale })
          return (
            <section key={b.id} className="px-gutter py-[clamp(3rem,7vw,7rem)]">
              {heading(b.heading)}
              {b.intro && <p className="t-lead mt-4 max-w-[44ch] text-graphite">{b.intro}</p>}
              <ul data-reveal="stagger" className="m-0 mt-10 list-none border-b border-ink p-0">
                {services.map((s, i) => (
                  <li key={s.id} className="border-t border-ink">
                    <Link href={localePath(locale, `/services/${s.slug}`)} className="group grid gap-x-8 gap-y-3 py-6 transition-colors duration-500 hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper md:grid-cols-12 md:items-baseline md:px-4 md:py-8">
                      <span className="t-label md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="t-statement m-0 md:col-span-7">{s.title}</h3>
                      <p className="t-body m-0 max-w-md group-hover:text-paper/80 md:col-span-4">{s.summary}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        }
        case 'projectsGrid': {
          const picked = (b.projects ?? []).filter((p): p is Exclude<typeof p, number> => typeof p !== 'number' && !!p.title)
          const projects = picked.length ? picked : (await getProjects({ locale }, { featured: { equals: true } })).slice(0, b.limit ?? 4)
          return (
            <section key={b.id} className="px-gutter py-[clamp(3rem,7vw,7rem)]">
              {heading(b.heading)}
              {b.intro && <p className="t-lead mt-4 max-w-[44ch] text-graphite">{b.intro}</p>}
              <div className="mt-10 grid grid-cols-1 gap-y-[clamp(3.5rem,8vw,7rem)] md:grid-cols-12 md:gap-x-[clamp(1rem,2vw,2rem)]">
                {projects.map((p, i) => <ProjectCard key={p.id} p={p} i={i} locale={locale} className={rhythmClass(i)} />)}
              </div>
            </section>
          )
        }
        case 'testimonials':
          return (
            <section key={b.id} className="bg-mist px-gutter py-[clamp(3rem,7vw,7rem)]">
              {heading(b.heading)}
              <ul data-reveal="stagger" className="m-0 mt-10 grid list-none gap-10 p-0 md:grid-cols-2">
                {b.items.map((q) => (
                  <li key={q.id} className="border-t border-ink pt-4">
                    <blockquote className="t-lead m-0">“{q.quote}”</blockquote>
                    <p className="t-label mt-4 mb-0 text-ash">{q.name}{q.role ? ` · ${q.role}` : ''}</p>
                  </li>
                ))}
              </ul>
            </section>
          )
        case 'cta': {
          const dark = b.background === 'ink'
          return (
            <section key={b.id} className={`px-gutter py-[clamp(4rem,8vw,8rem)] ${dark ? 'bg-ink text-paper' : b.background === 'mist' ? 'bg-mist' : ''}`}>
              <h2 data-reveal="up" className="t-statement m-0 max-w-[16ch]">{b.heading}</h2>
              {b.description && <p className={`t-lead mt-6 max-w-[40ch] ${dark ? 'text-paper/80' : 'text-graphite'}`}>{b.description}</p>}
              <div className="mt-10"><Btn href={b.buttonUrl} locale={locale}>{b.buttonLabel}</Btn></div>
            </section>
          )
        }
        case 'faq':
          return (
            <section key={b.id} className="px-gutter py-[clamp(3rem,7vw,7rem)]">
              <div className="grid gap-10 md:grid-cols-12">
                <div className="md:col-span-4">{heading(b.heading)}</div>
                <div className="md:col-span-8">
                  {b.items.map((f) => (
                    <details key={f.id} className="group border-t border-ink py-5 last:border-b">
                      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-xl font-bold tracking-[-0.02em]">
                        {f.question}
                        <span aria-hidden="true" className="text-2xl transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="t-body mt-3 mb-0 max-w-[60ch]">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>
          )
        default:
          return null
      }
    }),
  )
  return <>{out}</>
}
