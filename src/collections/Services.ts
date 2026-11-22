import type { CollectionConfig } from 'payload'
import { publishedOrStaff, staffOnly } from '../access'
import { blocks } from '../blocks'
import { seoField } from '../fields/seo'
import { slugField } from '../fields/slug'
import { previewUrl } from '../lib/preview'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  admin: {
    useAsTitle: 'title',
    group: 'Portfolio',
    defaultColumns: ['title', 'order', 'featured', '_status', 'updatedAt'],
    preview: (doc, { locale }) => previewUrl(`/services/${doc.slug}`, locale),
  },
  defaultSort: 'order',
  versions: { drafts: true, maxPerDoc: 10 },
  access: { read: publishedOrStaff, create: staffOnly, update: staffOnly, delete: staffOnly },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'title', type: 'text', localized: true, required: true },
            { name: 'summary', type: 'textarea', localized: true, required: true, admin: { description: 'Shown on cards and lists. 1–2 sentences.' } },
            { name: 'coverImage', type: 'upload', relationTo: 'media' },
            { name: 'layout', type: 'blocks', label: 'Detail page sections', blocks },
          ],
        },
        {
          label: 'Relations',
          fields: [{ name: 'relatedProjects', type: 'relationship', relationTo: 'projects', hasMany: true }],
        },
        { label: 'SEO', fields: [seoField] },
      ],
    },
    slugField(),
    { name: 'order', type: 'number', defaultValue: 10, admin: { position: 'sidebar', description: 'Lower numbers come first.' } },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
  ],
}
