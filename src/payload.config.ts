import path from 'path'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { revalidateAfterChange, revalidateAfterDelete } from './lib/revalidate'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Services } from './collections/Services'
import { Projects } from './collections/Projects'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage'
import { ServicesLanding, ProjectsLanding, JournalLanding, ContactPage } from './globals/landings'
import { defaultLocale, localeLabels, locales } from './config/locales'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Pages are prerendered during `next build`, which initialises Payload. Use a throwaway secret
// there if the real one is not exposed to the build (nothing signed at build time is shipped).
const secret = process.env.PAYLOAD_SECRET || (process.env.NEXT_PHASE === 'phase-production-build' ? 'build-time-placeholder' : undefined)

export default buildConfig({
  // Optional absolute origin (e.g. https://example.com). Unset = relative URLs, which the site prefers.
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  // Public pages are ISR-cached: any content change purges them (see lib/revalidate.ts).
  collections: [Users, Pages, Services, Projects, Posts, Categories, Media, ContactSubmissions].map((c) =>
    ['users', 'contact-submissions'].includes(c.slug)
      ? c
      : { ...c, hooks: { ...c.hooks, afterChange: [...(c.hooks?.afterChange ?? []), revalidateAfterChange], afterDelete: [...(c.hooks?.afterDelete ?? []), revalidateAfterDelete] } },
  ),
  globals: [SiteSettings, HomePage, ServicesLanding, ProjectsLanding, JournalLanding, ContactPage].map((g) => ({
    ...g,
    hooks: { ...g.hooks, afterChange: [...(g.hooks?.afterChange ?? []), revalidateAfterChange] },
  })),
  localization: {
    locales: locales.map((code) => ({ code, label: localeLabels[code] })),
    defaultLocale,
    // No silent fallback: a missing translation must stay visible to editors (and handled on the frontend).
    fallback: false,
  },
  editor: lexicalEditor(),
  // Image dimensions and the responsive widths in collections/Media.ts.
  sharp,
  secret: secret || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
    // Never regenerate on startup (dev, seed, tests): without a Blob token that silently drops `_objectKey`.
    // Run `pnpm generate:types`, which sets a dummy token.
    autoGenerate: false,
  },
  db: postgresAdapter({
    // Neon: use the POOLED connection string (host contains "-pooler").
    pool: { connectionString: process.env.DATABASE_URL, max: 5 },
    push: false, // schema changes ship as migrations (src/migrations)
  }),
  plugins: [
    // Media goes to Vercel Blob when BLOB_READ_WRITE_TOKEN is set; otherwise (local dev) to ./media.
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            enabled: true,
            collections: { media: { disablePayloadAccessControl: true } }, // public CDN URLs, no function hit per image
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
})

