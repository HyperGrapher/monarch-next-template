import type { CollectionConfig } from 'payload'
import { publishedOrStaff, staffOnly } from '../access'
import { seoField } from '../fields/seo'
import { slugField } from '../fields/slug'
import { previewUrl } from '../lib/preview'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blog post', plural: 'Blog posts' },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'categories', 'publishedAt', '_status'],
    preview: (doc, { locale }) => previewUrl(`/blog/${doc.slug}`, locale),
  },
  defaultSort: '-publishedAt',
  versions: { drafts: true, maxPerDoc: 10 },
  access: { read: publishedOrStaff, create: staffOnly, update: staffOnly, delete: staffOnly },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Article',
          fields: [
            { name: 'title', type: 'text', localized: true, required: true },
            { name: 'excerpt', type: 'textarea', localized: true, required: true, maxLength: 260 },
            { name: 'featuredImage', type: 'upload', relationTo: 'media', required: true },
            { name: 'content', type: 'richText', localized: true, required: true },
          ],
        },
        { label: 'SEO', fields: [seoField] },
      ],
    },
    slugField(),
    { name: 'publishedAt', type: 'date', defaultValue: () => new Date().toISOString(), admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } } },
    { name: 'author', type: 'text', admin: { position: 'sidebar' } },
    { name: 'categories', type: 'relationship', relationTo: 'categories', hasMany: true, admin: { position: 'sidebar' } },
  ],
}
