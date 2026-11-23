// Starts the app for e2e against a FRESH TEST database: reset → migrate → seed → build → start.
// Never touches DATABASE_URL (see tests/helpers/testEnv.ts for the guard).
import 'dotenv/config'
import { execSync, spawn } from 'node:child_process'

const test = process.env.TEST_DATABASE_URL
if (!test) throw new Error('TEST_DATABASE_URL is not set (throwaway Postgres only, never production).')
if (process.env.MONARCH_TEST_ENV !== '1' && test === process.env.DATABASE_URL) throw new Error('TEST_DATABASE_URL must differ from DATABASE_URL.')

const port = process.env.E2E_PORT || '3100'
const env = {
  ...process.env,
  MONARCH_TEST_ENV: '1',
  DATABASE_URL: test,
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET || 'test-secret-not-for-production',
  NEXT_PUBLIC_SITE_URL: `http://localhost:${port}`,
  BLOB_READ_WRITE_TOKEN: '', // '' not deleted: Next would re-read the real token from .env
  PREVIEW_SECRET: '',
  NODE_OPTIONS: '--no-deprecation',
}
const run = (cmd) => execSync(cmd, { stdio: 'inherit', env })

run('pnpm exec payload run tests/helpers/dropDatabase.ts')
run('pnpm exec payload migrate')
run('pnpm seed')
run('pnpm build')
const child = spawn('pnpm', ['exec', 'next', 'start', '-p', port], { stdio: 'inherit', env })
child.on('exit', (code) => process.exit(code ?? 0))
process.on('SIGTERM', () => child.kill('SIGTERM'))
process.on('SIGINT', () => child.kill('SIGINT'))
