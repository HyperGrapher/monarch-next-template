import type { Field } from 'payload'

export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  admin: { description: 'Search & social sharing. Leave empty to use sensible defaults.' },
  fields: [
    { name: 'title', type: 'text', localized: true, maxLength: 70, admin: { description: 'Ideal: 50–60 characters.' } },
    { name: 'description', type: 'textarea', localized: true, maxLength: 180, admin: { description: 'Ideal: 120–160 characters.' } },
    { name: 'image', type: 'upload', relationTo: 'media', admin: { description: 'Social share image (1200×630 recommended).' } },
    { name: 'noIndex', type: 'checkbox', defaultValue: false, label: 'Hide from search engines' },
  ],
}
