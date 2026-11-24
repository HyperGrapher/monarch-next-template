import type { CollectionConfig } from 'payload'
import { publishedOrStaff, staffOnly } from '../access'
import { blocks } from '../blocks'
import { seoField } from '../fields/seo'
import { slugField } from '../fields/slug'
import { autosaveDrafts, livePreview, previewUrl } from '../lib/preview'

export const projectTypes = ['cultural', 'residential', 'housing', 'public', 'commercial', 'interiors'] as const

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Project', plural: 'Projects' },
  admin: {
    useAsTitle: 'title',
    group: 'Portfolio',
    defaultColumns: ['title', 'type', 'year', 'featured', '_status', 'updatedAt'],
    description: 'All projects in this demo are fictional.',
    preview: (doc, { locale }) => previewUrl(`/projects/${doc.slug}`, locale),
    livePreview: livePreview((d) => (d.slug ? `/projects/${d.slug}` : null)),
  },
  defaultSort: 'order',
  versions: { drafts: autosaveDrafts, maxPerDoc: 10 },
  access: { read: publishedOrStaff, create: staffOnly, update: staffOnly, delete: staffOnly },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'title', type: 'text', localized: true, required: true },
            { name: 'summary', type: 'textarea', localized: true, required: true, admin: { description: 'One or two sentences for cards and the project header.' } },
            { name: 'coverImage', type: 'upload', relationTo: 'media', required: true, admin: { description: 'Shown at its natural ratio — no cropping.' } },
            {
              name: 'gallery',
              type: 'array',
              labels: { singular: 'Image', plural: 'Gallery images' },
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'caption', type: 'text', localized: true },
              ],
            },
            { name: 'layout', type: 'blocks', label: 'Project story', blocks },
          ],
        },
        {
          label: 'Facts',
          fields: [
            {
              name: 'type',
              type: 'select',
              required: true,
              defaultValue: 'cultural',
              options: projectTypes.map((v) => ({ label: v[0].toUpperCase() + v.slice(1), value: v })),
            },
            { name: 'location', type: 'text', localized: true, required: true, admin: { description: 'City, Country' } },
            { name: 'year', type: 'number', required: true, min: 1900, max: 2100 },
            { name: 'areaM2', type: 'number', label: 'Area (m²)', min: 0 },
            {
              name: 'buildStatus',
              type: 'select',
              required: true,
              defaultValue: 'built',
              options: [
                { label: 'Built', value: 'built' },
                { label: 'In construction', value: 'inConstruction' },
              ],
            },
          ],
        },
        { label: 'Relations', fields: [{ name: 'relatedServices', type: 'relationship', relationTo: 'services', hasMany: true }] },
        { label: 'SEO', fields: [seoField] },
      ],
    },
    slugField(),
    { name: 'order', type: 'number', defaultValue: 10, admin: { position: 'sidebar', description: 'Lower numbers come first.' } },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
  ],
}
