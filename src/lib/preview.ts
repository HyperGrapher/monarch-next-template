import type { LivePreviewConfig, PayloadRequest } from 'payload'
import { defaultLocale, localePath, type Locale } from '../config/locales'
import { siteUrl } from './seo'

/** Admin "Preview" button target. The /api/preview route checks the editor's session. */
export const previewUrl = (path: string, locale?: string) => {
  const target = localePath((locale as Locale) || defaultLocale, path)
  const secret = process.env.PREVIEW_SECRET ? `&secret=${encodeURIComponent(process.env.PREVIEW_SECRET)}` : ''
  return `/api/preview?path=${encodeURIComponent(target)}${secret}`
}

/**
 * Origin the admin is being served from. The Live Preview iframe must be absolute (the admin posts messages with it
 * as target origin) and same-origin (the session cookie has to reach /api/preview), so use the request's own host
 * — this also works on Vercel preview deployments and localhost — and only fall back to the configured site URL.
 */
export const requestOrigin = (req?: Pick<PayloadRequest, 'headers'>) => {
  const host = req?.headers?.get('x-forwarded-host') || req?.headers?.get('host')
  if (!host) return siteUrl()
  const local = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(host)
  const proto = (req?.headers?.get('x-forwarded-proto') || (local ? 'http' : 'https')).split(',')[0].trim()
  return `${proto}://${host}`
}

const breakpoints: NonNullable<LivePreviewConfig['breakpoints']> = [
  { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
  { label: 'Tablet', name: 'tablet', width: 820, height: 1180 },
  { label: 'Laptop', name: 'laptop', width: 1280, height: 800 },
]

/**
 * Admin Live Preview (iframe next to the edit form) for a document. `pathFor` returns the public path of the
 * document, or null while it cannot be previewed yet (e.g. a new page without a slug). The iframe loads the same
 * `/api/preview` route as the Preview button, so it needs the editor's session and runs in Draft Mode; the
 * `<LivePreviewListener />` on the page refreshes it whenever the document is (auto)saved.
 */
export const livePreview = (pathFor: (data: Record<string, any>) => string | null): LivePreviewConfig => ({
  breakpoints,
  url: ({ data, locale, req }) => {
    const path = pathFor(data ?? {})
    return path === null ? null : `${requestOrigin(req)}${previewUrl(path, locale?.code)}`
  },
})

/** Draft autosave: Live Preview shows saved drafts, so changes are saved shortly after the editor stops typing. */
export const autosaveDrafts = { autosave: { interval: 1000, showSaveDraftButton: true } }
