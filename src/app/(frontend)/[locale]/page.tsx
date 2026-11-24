import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Hero } from '../../../components/home/Hero'
import { ReleaseLoader } from '../../../components/layout/Shell'
import { Approach, Archive, ContactCta, Intro, Journal, Services, Studio, Work } from '../../../components/home/Sections'
import { brandConfig } from '../../../config/brand'
import { isLocale } from '../../../config/locales'
import { img } from '../../../lib/media'
import { getHome, getPosts, getProjects, getServices, getSettings } from '../../../lib/queries'
import type { LocaleParams } from '../../../lib/route'
import { buildMetadata } from '../../../lib/seo'

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const [home, s] = await Promise.all([getHome({ locale }), getSettings({ locale })])
  return buildMetadata({ locale, path: '/', seo: home?.seo, title: s?.seoTitle || s?.companyName, description: s?.tagline, siteName: s?.companyName, fallbackImage: s?.seoImage })
}

export default async function HomeRoute({ params }: LocaleParams) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const ctx = { locale }
  const [home, settings] = await Promise.all([getHome(ctx), getSettings(ctx)])
  if (!home) notFound()

  const selected = (home.work?.projects ?? []).filter((p): p is Exclude<typeof p, number> => typeof p !== 'number')
  const [allProjects, allServices, posts] = await Promise.all([
    selected.length ? Promise.resolve([]) : getProjects(ctx, { featured: { equals: true } }),
    getServices(ctx),
    getPosts(ctx, 1),
  ])
  const projects = (selected.length ? selected : allProjects).filter((p) => !!p.title).slice(0, 6)
  const pickedServices = (home.services?.items ?? []).filter((s): s is Exclude<typeof s, number> => typeof s !== 'number' && !!s.title)
  const services = pickedServices.length ? pickedServices : allServices

  const left = img(home.hero?.leftImage)
  const right = img(home.hero?.rightImage)
  const name = settings?.companyName ?? brandConfig.fallbackName

  return (
    <>
      {left && right ? (
        <Hero name={name} word={settings?.wordmark ?? name.toUpperCase()} left={left} right={right} statement={home.hero?.statement ?? ''} caption={home.hero?.caption ?? ''} cta={home.hero?.ctaLabel ?? ''} />
      ) : (
        // No hero images (e.g. a deleted media file): the loader waits for the hero, so release it here.
        <ReleaseLoader />
      )}
      <Intro data={home.intro} locale={locale} />
      <Work data={home.work} projects={projects} locale={locale} />
      <Archive data={home.archive} locale={locale} />
      <Services data={home.services} services={services} locale={locale} />
      <Approach data={home.approach} locale={locale} />
      <Studio data={home.studio} settings={settings} locale={locale} />
      <Journal data={home.journal} posts={posts.docs.slice(0, 3)} locale={locale} />
      <ContactCta data={home.contact} settings={settings} locale={locale} />
    </>
  )
}
