import { isDraft } from '../../lib/payload'
import { getDictionary } from '../../lib/i18n/dictionary'
import type { Locale } from '../../config/locales'

export async function PreviewBanner({ locale }: { locale: Locale }) {
  if (!(await isDraft())) return null
  const t = getDictionary(locale)
  return (
    <div data-preview-banner role="status" className="fixed inset-x-0 bottom-0 z-[90] flex items-center justify-between gap-4 bg-signal px-gutter py-3 text-ink">
      <span className="t-label">{t.preview.banner}</span>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- API route that clears the cookie, not a page */}
      <a href="/api/preview/exit" className="t-label underline underline-offset-4">
        {t.preview.exit}
      </a>
    </div>
  )
}
