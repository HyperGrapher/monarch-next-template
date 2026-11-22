import type { Field } from 'payload'

const map: Record<string, string> = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a', î: 'i', û: 'u' }
export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[çğıöşüâîû]/g, (c) => map[c] ?? c)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

/** Stable (non-localized) slug: identical in every language so URLs and switching stay simple. */
export const slugField = (from = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: { position: 'sidebar', description: 'URL part. Same in all languages. Generated from the title if left empty.' },
  hooks: {
    beforeValidate: [
      ({ value, data, siblingData }) => {
        if (typeof value === 'string' && value.trim()) return slugify(value)
        const source = (data as any)?.[from] ?? (siblingData as any)?.[from]
        return typeof source === 'string' ? slugify(source) : value
      },
    ],
  },
})
