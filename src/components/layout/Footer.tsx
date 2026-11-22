import Link from 'next/link'
import { brandConfig } from '../../config/brand'
import { localePath, type Locale } from '../../config/locales'
import { getDictionary } from '../../lib/i18n/dictionary'
import type { SiteSetting } from '../../payload-types'
import type { NavItem } from './Header'

export function Footer({ locale, settings: s, nav }: { locale: Locale; settings: SiteSetting | null; nav: NavItem[] }) {
  const t = getDictionary(locale)
  const name = s?.companyName ?? brandConfig.fallbackName
  return (
    <footer className="px-gutter pt-16 pb-10">
      <span className="block h-[3px] w-full bg-ink" />
      <div className="grid gap-10 pt-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="t-heading m-0">{name}</p>
          {s?.footerDescription && <p className="t-meta mt-3 max-w-sm text-graphite">{s.footerDescription}</p>}
          {s?.address?.length ? (
            <p className="t-meta mt-3 max-w-xs text-graphite">
              {s.legalName && (
                <>
                  {s.legalName}
                  <br />
                </>
              )}
              {s.address.map((a) => a.line).join(', ')}
            </p>
          ) : null}
        </div>
        <nav aria-label={t.footer.navigation} className="md:col-span-3">
          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {nav.map((n) => (
              <li key={n.key}>
                <Link href={localePath(locale, n.href)} className="link-draw t-label inline-flex min-h-11 items-center">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="t-meta flex flex-col gap-1 md:col-span-4">
          {s?.email && (
            <a href={`mailto:${s.email}`} className="link-draw w-fit">
              {s.email}
            </a>
          )}
          {s?.phone && (
            <a href={`tel:${s.phone.replace(/\s/g, '')}`} className="link-draw w-fit">
              {s.phone}
            </a>
          )}
          {s?.social?.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="link-draw w-fit">
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <div className="t-meta mt-16 flex flex-wrap justify-between gap-4 text-ash">
        <span>
          © {new Date().getFullYear()} {s?.copyright || s?.legalName || name}
        </span>
        <span className="flex gap-6" title={t.footer.legalNote}>
          {t.footer.legal.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </span>
      </div>
    </footer>
  )
}
