import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
      // @ts-expect-error present at runtime, missing from IncomingAuthType in this version
    passwordHashIterations: 100000,
  },
  fields: [],
}
