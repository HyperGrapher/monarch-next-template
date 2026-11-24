import type { Media } from '../payload-types'

export type Img = { src: string; alt: string; width: number; height: number; caption?: string | null; srcSet?: string }

/**
 * Payload-served files (/api/media/file/…) become same-origin paths even if serverURL made them absolute.
 * Vercel Blob CDN URLs are left untouched.
 */
export const localUrl = (url: string) => url.replace(/^https?:\/\/[^/]+(\/api\/media\/file\/)/, '$1')

/** `srcset` from the generated widths (collections/Media.ts) plus the original. Undefined when there is nothing to choose from. */
export function srcSetOf(value: Pick<Media, 'url' | 'width' | 'sizes'>): string | undefined {
  const candidates = new Map<number, string>()
  for (const size of Object.values(value.sizes ?? {})) {
    if (size?.url && size.width) candidates.set(size.width, localUrl(size.url))
  }
  if (!candidates.size || !value.url || !value.width) return undefined
  if (!candidates.has(value.width)) candidates.set(value.width, localUrl(value.url))
  return [...candidates].sort(([a], [b]) => a - b).map(([w, u]) => `${u} ${w}w`).join(', ')
}

/** Normalise a (possibly unpopulated) upload relation into plain image props. */
export function img(value: number | Media | null | undefined): Img | null {
  if (!value || typeof value === 'number' || !value.url) return null
  return {
    src: localUrl(value.url),
    srcSet: srcSetOf(value),
    alt: value.alt ?? '',
    width: value.width || 1600,
    height: value.height || 1000,
    caption: value.caption,
  }
}
