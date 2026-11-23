import fs from 'fs'
import path from 'path'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { CloudflareContext, getCloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'
import { r2Storage } from '@payloadcms/storage-r2'

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
const realpath = (value: string) => {
  try {
    return fs.existsSync(value) ? fs.realpathSync(value) : undefined
  } catch {
    return undefined
  }
}

const isCLI = process.argv.some((value) => {
  const resolved = realpath(value)
  if (!resolved) return false
  return (
    resolved.endsWith(path.join('payload', 'bin.js')) ||
    resolved.endsWith(path.join('next', 'dist', 'bin', 'next'))
  )
})
const isProduction = process.env.NODE_ENV === 'production'

const createLog =
  (level: string, fn: typeof console.log) => (objOrMsg: object | string, msg?: string) => {
    if (typeof objOrMsg === 'string') {
      fn(JSON.stringify({ level, msg: objOrMsg }))
    } else {
      fn(JSON.stringify({ level, ...objOrMsg, msg: msg ?? (objOrMsg as { msg?: string }).msg }))
    }
  }

const cloudflareLogger = {
  level: process.env.PAYLOAD_LOG_LEVEL || 'info',
  trace: createLog('trace', console.debug),
  debug: createLog('debug', console.debug),
  info: createLog('info', console.log),
  warn: createLog('warn', console.warn),
  error: createLog('error', console.error),
  fatal: createLog('fatal', console.error),
  silent: () => {},
} as any // Use PayloadLogger type when it's exported

const logger = {
  level: process.env.PAYLOAD_LOG_LEVEL || 'info',
  
  info: (m: any) => console.log('[payload]', m),
  debug: (m: any) => console.log('[payload]', m),
  warn: (m: any) => console.warn('[payload]', typeof m === 'string' ? m : m?.message),
  error: (e: any) => {
    const dump = (o: any) =>
      o ? Object.getOwnPropertyNames(o).map(k => `${k}=${String(o[k]).slice(0, 300)}`).join(' || ') : 'none'
    console.error('[payload]', 'E:', dump(e), '| ERR:', dump(e?.err))
  },

  silent: () => {},

} as any


// Loud error for missing secret
// Pages are prerendered during `next build`, which initialises Payload. The real secret is a
// runtime Worker secret and is not available to the build, so use a throwaway value there only
// (nothing signed at build time is ever shipped).
const secret = process.env.PAYLOAD_SECRET || (process.env.NEXT_PHASE === 'phase-production-build' ? 'build-time-placeholder' : undefined)


const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

export default buildConfig({
  // serverURL: process.env.PAYLOAD_SERVER_URL || 'https://monarch-next-template.burakmestan.workers.dev',
  serverURL:'https://monarch-next-template.burakmestan.workers.dev',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  auth: {
    passwordHashIterations: 100000,
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
  secret: secret || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteD1Adapter({ binding: cloudflare.env.D1, push: false }), // schema changes ship as migrations
  // logger: isProduction ? cloudflareLogger : undefined,
  // logger: isProduction ? cloudflareLogger : cloudflareLogger,
  logger: logger,
  plugins: [
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
  ],
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        // Optional: point at a wrangler config with local (non-remote) bindings
        // for offline builds/dev, e.g. WRANGLER_CONFIG=wrangler.local.jsonc
        configPath: process.env.WRANGLER_CONFIG || undefined,
        remoteBindings: isProduction && !process.env.WRANGLER_CONFIG,
      } satisfies GetPlatformProxyOptions),
  )
}

