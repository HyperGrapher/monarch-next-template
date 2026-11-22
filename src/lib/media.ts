import type { Media } from '../payload-types'

export type Img = { src: string; alt: string; width: number; height: number; caption?: string | null }

/** Normalise a (possibly unpopulated) upload relation into plain image props. */
export function img(value: number | Media | null | undefined): Img | null {
  if (!value || typeof value === 'number' || !value.url) return null
  return {
    src: value.url,
    alt: value.alt ?? '',
    width: value.width || 1600,
    height: value.height || 1000,
    caption: value.caption,
  }
}
