import type { Metadata } from 'next'
import { isMultilingual, localePath, locales, ogLocales, type Locale } from '../config/locales'
import type { Media } from '../payload-types'
import { localUrl } from './media'

/**
 * Canonical origin. NEXT_PUBLIC_SITE_URL should always be set in production; if it is missing, use the
 * production domain Vercel provides instead of silently emitting localhost canonicals/sitemaps.
 */
export const siteUrl = () => {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : ''
  return (process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SERVER_URL || vercel || 'http://localhost:3000').replace(/\/$/, '')
}

/** Absolute URL for a path or an already-absolute URL (Blob CDN images are absolute). */
export const absoluteUrl = (u: string) => (/^https?:\/\//.test(u) ? u : `${siteUrl()}${u}`)

type Seo = { title?: string | null; description?: string | null; image?: number | Media | null; noIndex?: boolean | null } | null | undefined

export function buildMetadata(opts: {
  locale: Locale
  path: string
  title?: string | null
  description?: string | null
  seo?: Seo
  siteName?: string | null
  fallbackImage?: number | Media | null
  type?: 'website' | 'article'
  /** Locales this content exists in (hreflang). Default: all — right for fixed routes and globals. */
  availableLocales?: readonly Locale[]
}): Metadata {
  const { locale, path, seo } = opts
  const title = seo?.title || opts.title || opts.siteName || undefined
  const description = seo?.description || opts.description || undefined
  const imageDoc = seo?.image ?? opts.fallbackImage
  const image = imageDoc && typeof imageDoc !== 'number' && imageDoc.url ? [{ url: absoluteUrl(localUrl(imageDoc.url)), width: imageDoc.width ?? undefined, height: imageDoc.height ?? undefined }] : undefined
  const url = `${siteUrl()}${localePath(locale, path)}`
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: isMultilingual && (opts.availableLocales ?? locales).length > 1 ? Object.fromEntries((opts.availableLocales ?? locales).map((l) => [l, `${siteUrl()}${localePath(l, path)}`])) : undefined,
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: { title: title ?? undefined, description, url, siteName: opts.siteName ?? undefined, locale: ogLocales[locale], type: opts.type ?? 'website', images: image },
    twitter: { card: image ? 'summary_large_image' : 'summary', title: title ?? undefined, description },
  }
}
