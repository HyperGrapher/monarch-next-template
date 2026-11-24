/**
 * Schema drift guard: the checked-in migrations must describe exactly the schema that the current
 * collections + Payload/Drizzle versions generate. A dependency update (or a collection edit) that changes
 * the schema without a migration fails here — instead of failing later in the production build.
 */
import '../helpers/testEnv'
import { execSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const dir = path.resolve(process.cwd(), 'src/migrations')

describe('database schema', () => {
  it('matches the checked-in migrations (no pending schema changes)', () => {
    const indexFile = path.join(dir, 'index.ts')
    const indexBefore = readFileSync(indexFile, 'utf8')
    const before = new Set(readdirSync(dir))

    let output = ''
    try {
      // --skip-empty: exits quietly when nothing changed, otherwise writes a new migration file.
      // The Blob plugin only adds its `_objectKey` column when a token is set, so give it a dummy one
      // (the same as when the committed migrations were generated). Nothing is sent anywhere.
      output = execSync('pnpm exec payload migrate:create schema_drift_check --skip-empty', {
        encoding: 'utf8',
        stdio: 'pipe',
        timeout: 120_000,
        env: {
          ...process.env,
          NODE_OPTIONS: '--no-deprecation',
          BLOB_READ_WRITE_TOKEN: 'vercel_blob_rw_dummy_x',
        },
        input: '',
      })
    } finally {
      // Never leave generated files behind, whatever happened.
      const created = readdirSync(dir).filter((f) => !before.has(f))
      for (const f of created) rmSync(path.join(dir, f), { force: true })
      if (existsSync(indexFile)) writeFileSync(indexFile, indexBefore)
      if (created.length) {
        throw new Error(
          `Schema changed without a migration (would create: ${created.join(', ')}).\n` +
            'Run `pnpm migrate:create` (with a dummy BLOB_READ_WRITE_TOKEN), review and commit the migration.\n' +
            output,
        )
      }
    }
    expect(output).not.toMatch(/Migration created at/)
  }, 150_000)
})
