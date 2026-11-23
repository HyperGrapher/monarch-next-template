import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Photo } from '../../../../../components/ui/Photo'
import { RichText } from '../../../../../components/ui/RichText'
import { isLocale, localePath, locales } from '../../../../../config/locales'
import { getDictionary } from '../../../../../lib/i18n/dictionary'
import { img } from '../../../../../lib/media'
import { getPost, getRelatedPosts, getSettings, getSlugs } from '../../../../../lib/queries'
import type { LocaleSlugParams } from '../../../../../lib/route'
import { absoluteUrl, buildMetadata, siteUrl } from '../../../../../lib/seo'
import { formatDate, readingMinutes } from '../../../../../lib/text'

export async function generateStaticParams(): Promise<{ locale: string; slug: string }[]> {
  const perLocale = await Promise.all(locales.map(async (locale) => (await getSlugs('posts', locale)).map((slug) => ({ locale, slug }))))
  return perLocale.flat()
}

export async function generateMetadata({ params }: LocaleSlugParams): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const [p, site] = await Promise.all([getPost(slug, { locale }), getSettings({ locale })])
  if (!p) return {}
  return buildMetadata({ locale, path: `/blog/${slug}`, title: p.title, description: p.excerpt, seo: p.seo, siteName: site?.companyName, fallbackImage: p.featuredImage, type: 'article' })
}

export default async function PostPage({ params }: LocaleSlugParams) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const p = await getPost(slug, { locale })
  if (!p) notFound()
  const [related, site] = await Promise.all([getRelatedPosts(p, { locale }), getSettings({ locale })])
  const image = img(p.featuredImage)
  const cats = (p.categories ?? []).filter((c): c is Exclude<typeof c, number> => typeof c !== 'number' && !!c.name)
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    description: p.excerpt,
    datePublished: p.publishedAt,
    dateModified: p.updatedAt,
    inLanguage: locale,
    author: p.author ? { '@type': 'Person', name: p.author } : undefined,
    publisher: site?.companyName ? { '@type': 'Organization', name: site.companyName } : undefined,
    image: image ? absoluteUrl(image.src) : undefined,
    mainEntityOfPage: `${siteUrl()}${localePath(locale, `/blog/${slug}`)}`,
  }
  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />
      <header className="px-gutter pt-[calc(4rem+clamp(2rem,5vw,5rem))] pb-10">
        <span data-reveal="rule" className="block h-[3px] w-full bg-ink" />
        <p className="t-label mt-3 mb-10 flex flex-wrap gap-x-4 text-ash">
          <span>{formatDate(p.publishedAt, locale)}</span>
          {cats.length > 0 && <span>{cats.map((c) => c.name).join(', ')}</span>}
          <span>{t.blog.readingTime(readingMinutes(p.content))}</span>
        </p>
        <h1 data-reveal="up" className="t-display m-0 max-w-[18ch] break-words">{p.title}</h1>
        <p data-reveal="up" className="t-lead mt-8 max-w-[46ch] text-graphite">{p.excerpt}</p>
        {p.author && <p className="t-label mt-6 mb-0">{t.blog.by} {p.author}</p>}
      </header>
      {image && <div className="px-gutter"><Photo image={image} eager /></div>}
      <div className="px-gutter py-[clamp(3rem,6vw,6rem)]">
        <div className="mx-auto max-w-[68ch]"><RichText data={p.content} /></div>
      </div>
      {related.length > 0 && (
        <section className="px-gutter pb-section">
          <h2 className="t-label mb-8 border-t-[3px] border-ink pt-3">{t.blog.related}</h2>
          <ul className="m-0 grid list-none gap-x-8 gap-y-10 p-0 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.id}>
                <Link href={localePath(locale, `/blog/${r.slug}`)} className="link-draw t-heading text-[clamp(1.25rem,1rem+1vw,1.75rem)]">{r.title}</Link>
                <p className="t-label mt-2 mb-0 text-ash">{formatDate(r.publishedAt, locale)}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
