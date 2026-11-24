import { localePath, type Locale } from '../config/locales'

/** Internal paths get the locale prefix; absolute URLs / mailto / tel pass through. */
export const resolveHref = (url: string | null | undefined, locale: Locale) => {
  if (!url) return '#'
  if (/^(https?:|mailto:|tel:|#)/i.test(url)) return url
  return localePath(locale, url.startsWith('/') ? url : `/${url}`)
}
export const isExternal = (url: string | null | undefined) => !!url && /^https?:/i.test(url)

/**
 * A same-origin path (pathname + search + hash) or null. Resolving against a dummy origin
 * catches everything browsers treat as another host: `//x`, `/\x`, and paths with tabs/newlines,
 * which the URL parser strips (`/\t/x` → `//x`).
 */
export const safeLocalPath = (path: string): string | null => {
  if (!path.startsWith('/')) return null
  const base = 'http://local.invalid'
  let parsed: URL
  try {
    parsed = new URL(path, base)
  } catch {
    return null
  }
  if (parsed.origin !== base) return null
  // Also refuse control characters and backslashes outright: nothing legitimate needs them.
  if (/[\u0000-\u001f\u007f\\]/.test(path)) return null
  return `${parsed.pathname}${parsed.search}${parsed.hash}`
}
