import type { CollectionConfig } from 'payload'
import { adminOnlyField, isAdmin } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'User', plural: 'Users' },
  admin: { useAsTitle: 'email', group: 'Users', defaultColumns: ['email', 'roles', 'updatedAt'] },
  auth: true,
  access: {
    // Public registration is disabled. The only exception is Payload's first-user flow:
    // creation is allowed ONLY while the collection is empty (the first user becomes admin).
    create: async ({ req }) => {
      if (isAdmin(req.user)) return true
      const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true })
      return totalDocs === 0
    },
    read: ({ req }) => {
      if (isAdmin(req.user)) return true
      if (req.user) return { id: { equals: req.user.id } }
      return false
    },
    update: ({ req }) => {
      if (isAdmin(req.user)) return true
      if (req.user) return { id: { equals: req.user.id } }
      return false
    },
    delete: ({ req }) => isAdmin(req.user),
    admin: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['editor'],
      required: true,
      saveToJWT: true,
      options: [
        { label: 'Admin (everything, including users)', value: 'admin' },
        { label: 'Editor (content & media only)', value: 'editor' },
      ],
      access: { create: adminOnlyField, update: adminOnlyField },
      hooks: {
        beforeChange: [
          // The very first user is always an admin.
          async ({ req, operation, value }) => {
            if (operation !== 'create') return value
            const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true })
            return totalDocs === 0 ? ['admin'] : value
          },
        ],
      },
    },
  ],
}
