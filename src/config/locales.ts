// Single source of truth for locales. The single-language branch changes only this file
// (and brand.ts) — see README "Single-language edition".
export const locales = ['tr', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'tr'

export const localeLabels: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
}

// BCP-47 / Open Graph locale tags
export const ogLocales: Record<Locale, string> = { tr: 'tr_TR', en: 'en_US' }

export const isLocale = (value: string | undefined): value is Locale =>
  !!value && (locales as readonly string[]).includes(value)

/** true when more than one locale is configured (drives switcher + URL prefix) */
export const isMultilingual = locales.length > 1

/** Build a public path for a locale. Single-language edition: no prefix. */
export const localePath = (locale: Locale, path = '/') => {
  const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  return isMultilingual ? `/${locale}${clean}` || `/${locale}` : clean || '/'
}
