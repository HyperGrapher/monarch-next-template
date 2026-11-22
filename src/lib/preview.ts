import { defaultLocale, localePath, type Locale } from '../config/locales'

/** Admin "Preview" button target. The /api/preview route checks the editor's session. */
export const previewUrl = (path: string, locale?: string) => {
  const target = localePath((locale as Locale) || defaultLocale, path)
  const secret = process.env.PREVIEW_SECRET ? `&secret=${encodeURIComponent(process.env.PREVIEW_SECRET)}` : ''
  return `/api/preview?path=${encodeURIComponent(target)}${secret}`
}
