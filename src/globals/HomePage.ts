import type { GlobalConfig } from 'payload'
import { staffOnly } from '../access'
import { seoField } from '../fields/seo'
import { previewUrl } from '../lib/preview'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Home page',
  admin: { group: 'Content', preview: (_doc, { locale }) => previewUrl('/', locale) },
  access: { read: () => true, update: staffOnly },
  versions: { drafts: true, max: 10 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          description: 'Two photographs with the company wordmark cut across both.',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                { name: 'leftImage', type: 'upload', relationTo: 'media', required: true, admin: { description: 'Large panel — landscape works best.' } },
                { name: 'rightImage', type: 'upload', relationTo: 'media', required: true, admin: { description: 'Narrow panel — portrait works best.' } },
                { name: 'statement', type: 'text', localized: true, required: true, admin: { description: 'One short, strong sentence.' } },
                { name: 'caption', type: 'textarea', localized: true, required: true },
                { name: 'ctaLabel', type: 'text', localized: true, required: true },
              ],
            },
          ],
        },
        {
          label: 'Introduction',
          fields: [
            {
              name: 'intro',
              type: 'group',
              fields: [
                { name: 'statement', type: 'textarea', localized: true, required: true },
                {
                  name: 'facts',
                  type: 'array',
                  maxRows: 6,
                  fields: [
                    { name: 'label', type: 'text', localized: true, required: true },
                    { name: 'value', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Work',
          fields: [
            {
              name: 'work',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', localized: true, required: true },
                { name: 'projects', type: 'relationship', relationTo: 'projects', hasMany: true, admin: { description: 'Choose and order the projects shown (6 recommended). Leave empty to use featured projects.' } },
                { name: 'moreLabel', type: 'text', localized: true },
              ],
            },
          ],
        },
        {
          label: 'Archive',
          fields: [
            {
              name: 'archive',
              type: 'group',
              fields: [
                {
                  name: 'numbers',
                  type: 'array',
                  maxRows: 4,
                  fields: [
                    { name: 'value', type: 'number', required: true },
                    { name: 'label', type: 'text', localized: true, required: true },
                  ],
                },
                { name: 'categoriesLabel', type: 'text', localized: true },
                {
                  name: 'categories',
                  type: 'array',
                  fields: [
                    { name: 'name', type: 'text', localized: true, required: true },
                    { name: 'count', type: 'number', required: true, min: 0 },
                  ],
                },
                { name: 'stripLabel', type: 'text', localized: true },
                {
                  name: 'images',
                  type: 'array',
                  labels: { singular: 'Photo', plural: 'Archive strip photos' },
                  admin: { description: 'Photographs for the horizontally scrolling strip. Each gets an automatic "Archive 01" caption.' },
                  fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
                },
              ],
            },
          ],
        },
        {
          label: 'Services',
          fields: [
            {
              name: 'services',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', localized: true, required: true },
                { name: 'items', type: 'relationship', relationTo: 'services', hasMany: true, admin: { description: 'Leave empty to list every service.' } },
              ],
            },
          ],
        },
        {
          label: 'Approach',
          fields: [
            {
              name: 'approach',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', localized: true, required: true },
                { name: 'intro', type: 'textarea', localized: true },
                { name: 'image', type: 'upload', relationTo: 'media' },
                { name: 'caption', type: 'text', localized: true },
                {
                  name: 'principles',
                  type: 'array',
                  maxRows: 5,
                  fields: [
                    { name: 'name', type: 'text', localized: true, required: true },
                    { name: 'text', type: 'textarea', localized: true, required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Studio',
          fields: [
            {
              name: 'studio',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', localized: true, required: true },
                {
                  name: 'people',
                  type: 'array',
                  fields: [
                    { name: 'name', type: 'text', required: true },
                    { name: 'role', type: 'text', localized: true, required: true },
                    { name: 'text', type: 'textarea', localized: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Journal & contact',
          fields: [
            {
              name: 'journal',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', localized: true, required: true },
                { name: 'moreLabel', type: 'text', localized: true },
              ],
            },
            {
              name: 'contact',
              type: 'group',
              fields: [
                { name: 'lead', type: 'text', localized: true, required: true },
                { name: 'ctaLabel', type: 'text', localized: true, required: true },
              ],
            },
          ],
        },
        { label: 'SEO', fields: [seoField] },
      ],
    },
  ],
}
