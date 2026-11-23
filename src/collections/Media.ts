import type { CollectionConfig } from 'payload'
import { imageSize } from 'image-size'
import { staffOnly } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media file', plural: 'Media' },
  admin: { useAsTitle: 'filename', group: 'Content', defaultColumns: ['filename', 'alt', 'updatedAt'] },
  access: { read: () => true, create: staffOnly, update: staffOnly, delete: staffOnly },
  hooks: {
    // Without sharp Payload cannot read dimensions. Read them from the file header
    // so the frontend can reserve aspect ratio (no layout shift).
    beforeChange: [
      ({ data, req }) => {
        const file = req.file
        if (file?.data && file.mimetype?.startsWith('image/')) {
          try {
            const { width, height } = imageSize(new Uint8Array(file.data))
            if (width && height) return { ...data, width, height }
          } catch {
            /* unsupported format: leave dimensions empty */
          }
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'alt', type: 'text', localized: true, required: true, admin: { description: 'Describe what is visible (form, material, light). Required for accessibility; translate per language.' } },
    { name: 'caption', type: 'text', localized: true },
    { name: 'credit', type: 'text', admin: { description: 'Photographer / source / licence note.' } },
  ],
  upload: {
    mimeTypes: ['image/*'],
    // Resizing/cropping is off. Optimise images BEFORE uploading (WebP/AVIF, ≤ 2400px).
    crop: false,
    focalPoint: false,
  },
}
