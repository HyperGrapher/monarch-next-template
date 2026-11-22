import type { GlobalConfig } from 'payload'
import { staffOnly } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  admin: { group: 'Website Settings' },
  access: { read: () => true, update: staffOnly },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Company',
          fields: [
            { name: 'companyName', type: 'text', required: true, admin: { description: 'Shown in the header logo and footer.' } },
            { name: 'wordmark', type: 'text', required: true, admin: { description: 'Big hero word, usually the company name in capitals (one word fits best).' } },
            { name: 'legalName', type: 'text' },
            { name: 'tagline', type: 'text', localized: true },
            { name: 'footerDescription', type: 'textarea', localized: true },
            { name: 'copyright', type: 'text', localized: true, admin: { description: 'Text after the © and year.' } },
            { name: 'announcement', type: 'text', localized: true, admin: { description: 'Optional one-line notice shown above the header. Leave empty to hide.' } },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'email', type: 'email', required: true },
            { name: 'careersEmail', type: 'email' },
            { name: 'phone', type: 'text' },
            {
              name: 'address',
              type: 'array',
              labels: { singular: 'Address line', plural: 'Address lines' },
              fields: [{ name: 'line', type: 'text', required: true }],
            },
            { name: 'mapUrl', type: 'text', admin: { description: 'Link to your location on a map (no API key needed).' } },
            {
              name: 'social',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Default SEO',
          fields: [
            { name: 'seoTitle', type: 'text', localized: true },
            { name: 'seoDescription', type: 'textarea', localized: true },
            { name: 'seoImage', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
  ],
}
