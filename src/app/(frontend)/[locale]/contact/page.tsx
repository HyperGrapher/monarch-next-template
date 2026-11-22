import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHeader } from '../../../../components/ui/PageHeader'
import { isLocale } from '../../../../config/locales'
import { getDictionary } from '../../../../lib/i18n/dictionary'
import { getLanding, getSettings } from '../../../../lib/queries'
import type { LocaleParams } from '../../../../lib/route'
import { buildMetadata } from '../../../../lib/seo'
import type { ContactPage as ContactPageDoc } from '../../../../payload-types'
import { ContactForm } from './ContactForm'

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const [l, s] = await Promise.all([getLanding<ContactPageDoc>('contact-page', { locale }), getSettings({ locale })])
  return buildMetadata({ locale, path: '/contact', title: l?.title, description: l?.intro, seo: l?.seo, siteName: s?.companyName })
}

export default async function ContactPage({ params }: LocaleParams) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const t = getDictionary(locale)
  const [l, s] = await Promise.all([getLanding<ContactPageDoc>('contact-page', { locale }), getSettings({ locale })])
  const ld = s?.companyName && {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: s.companyName,
    email: s.email,
    telephone: s.phone,
    address: s.address?.length ? { '@type': 'PostalAddress', streetAddress: s.address.map((a) => a.line).join(', ') } : undefined,
  }
  return (
    <>
      {ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />}
      <PageHeader label={t.nav.contact} title={l?.title ?? t.nav.contact} intro={l?.intro} />
      <div className="grid gap-16 px-gutter pb-section md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="t-label mb-8 border-t-[3px] border-ink pt-3">{t.contact.details}</h2>
          <dl className="m-0 grid gap-6">
            {s?.email && <div><dt className="t-label text-ash">{t.contact.email}</dt><dd className="m-0 mt-1 text-xl font-bold tracking-[-0.02em]"><a href={`mailto:${s.email}`} className="link-draw">{s.email}</a></dd></div>}
            {s?.phone && <div><dt className="t-label text-ash">{t.contact.phone}</dt><dd className="m-0 mt-1 text-xl font-bold tracking-[-0.02em]"><a href={`tel:${s.phone.replace(/\s/g, '')}`} className="link-draw">{s.phone}</a></dd></div>}
            {s?.address?.length ? (
              <div>
                <dt className="t-label text-ash">{t.contact.address}</dt>
                <dd className="m-0 mt-1"><address className="not-italic">{s.address.map((a) => <span key={a.id} className="block">{a.line}</span>)}</address>
                  {s.mapUrl && <a href={s.mapUrl} target="_blank" rel="noreferrer" className="link-draw t-label mt-3 inline-flex min-h-11 items-center">{t.contact.map} ↗</a>}
                </dd>
              </div>
            ) : null}
            {l?.hours && <div><dt className="t-label text-ash">{t.contact.hours}</dt><dd className="m-0 mt-1">{l.hours}</dd></div>}
          </dl>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          {l?.formIntro && <p className="t-lead mt-0 mb-10 text-graphite">{l.formIntro}</p>}
          <ContactForm locale={locale} t={t.contact} />
        </div>
      </div>
    </>
  )
}
