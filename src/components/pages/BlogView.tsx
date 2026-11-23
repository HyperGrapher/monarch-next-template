import Link from 'next/link'
import { notFound } from 'next/navigation'
import { localePath, type Locale } from '../../config/locales'
import { getDictionary } from '../../lib/i18n/dictionary'
import { img } from '../../lib/media'
import { getCategories, getLanding, getPosts } from '../../lib/queries'
import { formatDate } from '../../lib/text'
import type { JournalLanding } from '../../payload-types'
import { PageHeader } from '../ui/PageHeader'
import { Photo } from '../ui/Photo'

/** Statically cached: category and page are path segments (/blog/category/x/page/2), not a query string. */
export async function BlogView({ locale, category, page = 1 }: { locale: Locale; category?: string; page?: number }) {
  const t = getDictionary(locale)
  const [l, cats, res] = await Promise.all([getLanding<JournalLanding>('journal-landing', { locale }), getCategories({ locale }), getPosts({ locale }, page, category)])
  if (page > 1 && page > res.totalPages) notFound()
  const base = localePath(locale, '/blog')
  const href = (p: number, c = category) => `${base}${c ? `/category/${c}` : ''}${p > 1 ? `/page/${p}` : ''}`
  return (
    <>
      <PageHeader label={t.nav.blog} title={l?.title ?? t.nav.blog} intro={l?.intro} />
      <nav aria-label={t.blog.categories} className="px-gutter pb-10">
        <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-1 p-0">
          <li><Link href={base} aria-current={!category ? 'true' : undefined} className="link-draw t-label inline-flex min-h-11 items-center">{t.all}</Link></li>
          {cats.map((c) => (
            <li key={c.id}><Link href={href(1, c.slug)} aria-current={category === c.slug ? 'true' : undefined} className="link-draw t-label inline-flex min-h-11 items-center">{c.name}</Link></li>
          ))}
        </ul>
      </nav>
      {res.docs.length === 0 ? (
        <p className="t-body px-gutter pb-section">{t.blog.none}</p>
      ) : (
        <ul data-reveal="stagger" className="m-0 grid list-none gap-x-[clamp(1rem,2vw,2rem)] gap-y-14 px-gutter pb-16 md:grid-cols-3">
          {res.docs.map((p) => {
            const image = img(p.featuredImage)
            const cat = (p.categories ?? []).find((c): c is Exclude<typeof c, number> => typeof c !== 'number')
            return (
              <li key={p.id} className="group">
                <Link href={localePath(locale, `/blog/${p.slug}`)} className="block">
                  {image && <Photo image={image} reveal={false} imgClassName="transition-transform duration-[1200ms] group-hover:scale-[1.03]" />}
                  <p className="t-label mt-4 mb-0 text-ash">{formatDate(p.publishedAt, locale)}{cat?.name ? ` · ${cat.name}` : ''}</p>
                  <h2 className="t-heading link-draw mt-2 mb-0 text-[clamp(1.25rem,1rem+1vw,1.75rem)] group-hover:[background-size:100%_2px]">{p.title}</h2>
                  <p className="t-body mt-3 mb-0">{p.excerpt}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
      {res.totalPages > 1 && (
        <nav aria-label="Pagination" className="t-label flex items-center justify-between px-gutter pb-section">
          {res.hasPrevPage ? <Link href={href(page - 1)} className="link-draw inline-flex min-h-11 items-center">← {t.blog.newer}</Link> : <span />}
          <span>{t.blog.page} {res.page} {t.blog.of} {res.totalPages}</span>
          {res.hasNextPage ? <Link href={href(page + 1)} className="link-draw inline-flex min-h-11 items-center">{t.blog.older} →</Link> : <span />}
        </nav>
      )}
    </>
  )
}
