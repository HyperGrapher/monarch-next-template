import type { CollectionConfig } from 'payload'
import { staffOnly } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media file', plural: 'Media' },
  admin: { useAsTitle: 'filename', group: 'Content', defaultColumns: ['filename', 'alt', 'updatedAt'] },
  access: { read: () => true, create: staffOnly, update: staffOnly, delete: staffOnly },
  fields: [
    { name: 'alt', type: 'text', localized: true, required: true, admin: { description: 'Describe what is visible (form, material, light). Required for accessibility; translate per language.' } },
    { name: 'caption', type: 'text', localized: true },
    { name: 'credit', type: 'text', admin: { description: 'Photographer / source / licence note.' } },
  ],
  upload: {
    mimeTypes: ['image/*'],
    // Not supported on Workers (no sharp). Optimise images BEFORE uploading (WebP/AVIF, ≤ 2400px).
    crop: false,
    focalPoint: false,
  },
}
