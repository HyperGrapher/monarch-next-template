import type { CollectionConfig, ImageSize } from 'payload'
import { staffOnly } from '../access'

/**
 * Responsive widths generated once, at upload (sharp), and stored next to the original in the same storage
 * (Vercel Blob, S3, disk…). Pages pick one with srcset/sizes, so phones never download the 2400 px original and
 * no per-request image service is needed — this works the same on any host.
 * Sizes larger than the original are skipped (Payload's default: no enlargement).
 */
export const imageWidths = [480, 800, 1200, 1600] as const
const imageSizes: ImageSize[] = imageWidths.map((width) => ({
  name: `w${width}`,
  width,
  formatOptions: { format: 'webp', options: { quality: 80 } },
}))

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
    // Upload the original at ≤ 2400 px (WebP/AVIF/JPEG). Smaller widths are generated automatically.
    // No cropping: every image is shown at its natural ratio.
    crop: false,
    focalPoint: false,
    imageSizes,
    adminThumbnail: 'w480',
  },
}
