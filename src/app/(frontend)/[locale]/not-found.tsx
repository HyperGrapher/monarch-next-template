'use client'

import Link from 'next/link'
import { localePath } from '../../../config/locales'
import { getDictionary } from '../../../lib/i18n/dictionary'
import { useLocale } from '../../../lib/i18n/useLocale'

// Rendered inside the [locale] layout, so it is always styled. A client component so it can read the
// locale from the URL (not-found receives no params); unknown locales fall back to the default.
export default function NotFound() {
  const locale = useLocale()
  const t = getDictionary(locale)
  return (
    <section className="flex min-h-[80vh] flex-col justify-center px-gutter pt-32 pb-section">
      <p className="t-label mb-6 border-t-[3px] border-ink pt-3">404</p>
      <h1 className="t-display m-0 max-w-[14ch]">{t.notFound.title}</h1>
      <p className="t-lead mt-8 max-w-[36ch] text-graphite">{t.notFound.text}</p>
      <Link href={localePath(locale, '/')} className="mt-10 inline-flex min-h-11 w-fit items-center bg-signal px-6 text-sm font-semibold text-ink no-underline hover:bg-ink hover:text-paper">{t.notFound.cta}</Link>
    </section>
  )
}
