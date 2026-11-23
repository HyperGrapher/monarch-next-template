import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import '../styles.css'
import { Footer } from '../../../components/layout/Footer'
import { Header, type NavItem } from '../../../components/layout/Header'
import { PreviewBanner } from '../../../components/layout/PreviewBanner'
import { ScrollTop } from '../../../components/layout/ScrollTop'
import { Shell } from '../../../components/layout/Shell'
import { brandConfig } from '../../../config/brand'
import { isLocale, localePath, locales } from '../../../config/locales'
import { getDictionary } from '../../../lib/i18n/dictionary'
import type { LocaleLayoutProps } from '../../../lib/route'
import { buildMetadata, siteUrl } from '../../../lib/seo'
import { getSettings } from '../../../lib/queries'

// Statically cached (ISR). CMS edits purge it via revalidatePath (src/lib/revalidate.ts);
// the daily revalidate is only a safety net.
export const revalidate = 86400
export const generateStaticParams = () => locales.map((locale) => ({ locale }))

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const s = await getSettings({ locale })
  const name = s?.companyName ?? brandConfig.fallbackName
  return {
    metadataBase: new URL(siteUrl()),
    ...buildMetadata({ locale, path: '/', title: s?.seoTitle || name, description: s?.seoDescription || s?.tagline, siteName: name, fallbackImage: s?.seoImage }),
    title: { default: s?.seoTitle || name, template: `%s — ${name}` },
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const s = await getSettings({ locale })
  const name = s?.companyName ?? brandConfig.fallbackName
  const nav: NavItem[] = [
    ...(brandConfig.modules.projects ? [{ key: 'projects', href: '/projects', label: t.nav.projects }] : []),
    { key: 'services', href: '/services', label: t.nav.services },
    { key: 'about', href: '/about', label: t.nav.about },
    ...(brandConfig.modules.journal ? [{ key: 'blog', href: '/blog', label: t.nav.blog }] : []),
    { key: 'contact', href: '/contact', label: t.nav.contact },
  ]
  const address = s?.address?.map((a) => a.line).slice(0, 2).join(', ')

  return (
    <html lang={locale}>
      <body>
        <a href="#content" className="sr-only z-[200] bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
          {t.skip}
        </a>
        <Shell locale={locale} loadingLabel="Loading">
          {s?.announcement && (
            <p className="t-label m-0 bg-ink px-gutter py-2 text-center text-paper">{s.announcement}</p>
          )}
          <Header
            locale={locale}
            name={name}
            nav={nav}
            contact={{ label: t.contactCta, href: localePath(locale, '/contact') }}
            email={s?.email}
            phone={s?.phone}
            address={address}
            labels={{ menu: t.menu, open: t.openMenu, close: t.closeMenu, sections: t.sections, language: t.language, backToTop: t.backHome }}
          />
          <div id="page" className="overflow-x-clip bg-paper text-ink">
            <main id="content">{children}</main>
            <Footer locale={locale} settings={s} nav={nav} />
          </div>
          <ScrollTop label={t.scrollTop} />
        </Shell>
        <PreviewBanner locale={locale} />
      </body>
    </html>
  )
}
