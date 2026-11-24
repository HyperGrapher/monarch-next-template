import type { CollectionConfig } from 'payload'
import { publishedOrStaff, staffOnly } from '../access'
import { blocks } from '../blocks'
import { seoField } from '../fields/seo'
import { slugField } from '../fields/slug'
import { autosaveDrafts, livePreview, previewUrl } from '../lib/preview'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    preview: (doc, { locale }) => previewUrl(`/${doc.slug}`, locale),
    livePreview: livePreview((d) => (d.slug ? `/${d.slug}` : null)),
  },
  defaultSort: 'title',
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
            { name: 'intro', type: 'textarea', localized: true, admin: { description: 'Short lead paragraph under the title (1–2 sentences).' } },
            { name: 'featuredImage', type: 'upload', relationTo: 'media' },
            {
              name: 'layout',
              type: 'blocks',
              label: 'Page sections',
              admin: { description: 'Add, remove and drag sections to reorder them.' },
              blocks,
            },
          ],
        },
        { label: 'SEO', fields: [seoField] },
      ],
    },
    slugField(),
  ],
}
