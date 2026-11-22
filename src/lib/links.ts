import { localePath, type Locale } from '../config/locales'

/** Internal paths get the locale prefix; absolute URLs / mailto / tel pass through. */
export const resolveHref = (url: string | null | undefined, locale: Locale) => {
  if (!url) return '#'
  if (/^(https?:|mailto:|tel:|#)/i.test(url)) return url
  return localePath(locale, url.startsWith('/') ? url : `/${url}`)
}
export const isExternal = (url: string | null | undefined) => !!url && /^https?:/i.test(url)
