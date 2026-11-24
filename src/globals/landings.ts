import type { Field, GlobalConfig } from 'payload'
import { staffOnly } from '../access'
import { seoField } from '../fields/seo'
import { livePreview, previewUrl } from '../lib/preview'

const landing = (slug: string, label: string, path: string, extra: Field[] = []): GlobalConfig => ({
  slug,
  label,
  admin: { group: 'Content', preview: (_d, { locale }) => previewUrl(path, locale), livePreview: livePreview(() => path) },
  access: { read: () => true, update: staffOnly },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    { name: 'intro', type: 'textarea', localized: true },
    ...extra,
    seoField,
  ],
})

export const ServicesLanding = landing('services-landing', 'Services page', '/services')
export const ProjectsLanding = landing('projects-landing', 'Projects page', '/projects')
export const JournalLanding = landing('journal-landing', 'Blog page', '/blog')
export const ContactPage = landing('contact-page', 'Contact page', '/contact', [
  { name: 'formIntro', type: 'textarea', localized: true },
  { name: 'hours', type: 'text', localized: true },
])
