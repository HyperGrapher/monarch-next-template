/**
 * Test environment guard. The tests CREATE AND DELETE data, and `.env` normally points at a real
 * (production) database — so they only ever run against an explicit TEST_DATABASE_URL.
 *   TEST_DATABASE_URL=postgres://user:pass@localhost:5432/monarch_test pnpm test
 */
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

const testUrl = process.env.TEST_DATABASE_URL
if (!testUrl) {
  throw new Error('TEST_DATABASE_URL is not set. Point it at a throwaway Postgres database (never production).')
}
// Child processes (payload CLI) inherit the already-swapped env, so check only on first load.
if (process.env.MONARCH_TEST_ENV !== '1' && testUrl === process.env.DATABASE_URL) {
  throw new Error('TEST_DATABASE_URL must differ from DATABASE_URL: the tests wipe the database.')
}

process.env.MONARCH_TEST_ENV = '1'
process.env.DATABASE_URL = testUrl
process.env.PAYLOAD_SECRET = process.env.PAYLOAD_SECRET || 'test-secret-not-for-production'
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
// Local disk uploads, never the real Blob store.
// (set to '' rather than deleted: Next would otherwise re-read the real values from .env)
process.env.BLOB_READ_WRITE_TOKEN = ''
process.env.PREVIEW_SECRET = ''
