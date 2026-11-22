import type { CollectionConfig } from 'payload'
import { staffOnly } from '../access'

// Entries are created ONLY by the server route /api/contact (Local API, validated).
// Nobody can create/read/update/delete them through the public REST/GraphQL API.
export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'Contact message', plural: 'Contact messages' },
  admin: { useAsTitle: 'name', group: 'Website Settings', defaultColumns: ['name', 'email', 'createdAt'] },
  defaultSort: '-createdAt',
  access: { create: () => false, read: staffOnly, update: () => false, delete: staffOnly },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 120 },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', maxLength: 40 },
    { name: 'message', type: 'textarea', required: true, maxLength: 4000 },
    { name: 'locale', type: 'text', admin: { readOnly: true } },
  ],
}
