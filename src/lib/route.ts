/** Route props for [locale] pages (params is a Promise in the Next 16 App Router). */
export type LocaleParams = { params: Promise<{ locale: string }> }
export type LocaleSlugParams = { params: Promise<{ locale: string; slug: string }> }
export type LocaleLayoutProps = LocaleParams & { children: React.ReactNode }
