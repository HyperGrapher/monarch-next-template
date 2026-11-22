import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageHeader } from '../../../../components/ui/PageHeader'
import { localePath, isLocale } from '../../../../config/locales'
import { getDictionary } from '../../../../lib/i18n/dictionary'
import { img } from '../../../../lib/media'
import { getLanding, getServices, getSettings } from '../../../../lib/queries'
import type { LocaleParams } from '../../../../lib/route'
import { buildMetadata } from '../../../../lib/seo'
import { Photo } from '../../../../components/ui/Photo'
import type { ServicesLanding } from '../../../../payload-types'

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const [l, s] = await Promise.all([getLanding<ServicesLanding>('services-landing', { locale }), getSettings({ locale })])
  return buildMetadata({ locale, path: '/services', title: l?.title, description: l?.intro, seo: l?.seo, siteName: s?.companyName })
}

export default async function ServicesPage({ params }: LocaleParams) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const [l, services] = await Promise.all([getLanding<ServicesLanding>('services-landing', { locale }), getServices({ locale })])
  return (
    <>
      <PageHeader label={t.nav.services} title={l?.title ?? t.nav.services} intro={l?.intro} />
      <ul data-reveal="stagger" className="m-0 mx-gutter mb-section list-none border-b border-ink p-0">
        {services.map((s, i) => {
          const cover = img(s.coverImage)
          return (
            <li key={s.id} className="border-t border-ink">
              <Link href={localePath(locale, `/services/${s.slug}`)} className="group grid gap-x-8 gap-y-4 py-8 md:grid-cols-12 md:items-start md:px-4">
                <span className="t-label md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                <div className="md:col-span-6">
                  <h2 className="t-statement link-draw m-0 group-hover:[background-size:100%_2px]">{s.title}</h2>
                  <p className="t-body mt-4 mb-0 max-w-[44ch]">{s.summary}</p>
                </div>
                {cover && <div className="md:col-span-4 md:col-start-9"><Photo image={cover} reveal={false} imgClassName="transition-transform duration-[1200ms] group-hover:scale-[1.03]" /></div>}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
