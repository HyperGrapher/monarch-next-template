'use client'

import { defaultLocale } from '../../../config/locales'
import { getDictionary } from '../../../lib/i18n/dictionary'

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const t = getDictionary(defaultLocale)
  return (
    <section className="flex min-h-[80vh] flex-col justify-center px-gutter pt-32 pb-section">
      <h1 className="t-display m-0 max-w-[14ch]">{t.error.title}</h1>
      <p className="t-lead mt-8 max-w-[36ch] text-graphite">{t.error.text}</p>
      <button type="button" onClick={reset} className="mt-10 inline-flex min-h-11 w-fit cursor-pointer items-center bg-signal px-6 text-sm font-semibold text-ink hover:bg-ink hover:text-paper">{t.error.retry}</button>
    </section>
  )
}
