/**
 * Generates the responsive widths (collections/Media.ts → imageSizes) for media uploaded before they existed.
 *   DRY_RUN=1 pnpm media:sizes   → list what would be processed, change nothing (start with this)
 *   pnpm media:sizes             → only media that has no generated sizes yet
 *   ALL=1 pnpm media:sizes       → every image (e.g. after changing the widths or the quality)
 * (Environment variables, not --flags: `payload run` drops arguments that are not after a `--`.)
 * PowerShell: `$env:DRY_RUN="1"; pnpm media:sizes`, then `Remove-Item Env:DRY_RUN` before the real run.
 * Pending migrations (the size columns) must be applied first; the script checks and stops otherwise.
 *
 * Each original is downloaded and uploaded again through Payload, exactly like "Replace file" in the admin:
 * the new files are stored first, then the old ones are removed. Alt text, captions and every reference to
 * the media document stay as they are. Uses DATABASE_URL and BLOB_READ_WRITE_TOKEN (or ./media without a token),
 * so point it at the environment you mean. Published pages pick up the new srcset after the next content
 * change or redeploy (ISR cache).
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { imageWidths } from '../src/collections/Media'
import type { Media } from '../src/payload-types'
import { migrations } from '../src/migrations'

const flag = (name: string) => process.env[name] === '1' || process.env[name] === 'true'
const all = flag('ALL')
const dryRun = flag('DRY_RUN')

async function readOriginal(doc: Media): Promise<Buffer> {
  if (doc.url && /^https?:\/\//.test(doc.url)) {
    const res = await fetch(doc.url)
    if (!res.ok) throw new Error(`download failed (${res.status}) ${doc.url}`)
    return Buffer.from(await res.arrayBuffer())
  }
  // Local disk storage (no Blob token): Payload's default static dir.
  return fs.readFile(path.resolve(process.cwd(), 'media', doc.filename ?? ''))
}

async function main() {
  const payload = await getPayload({ config: await config })

  // The size columns come from a migration: refuse to run (with a clear message) until it is applied.
  const { docs: applied } = await payload.find({ collection: 'payload-migrations', limit: 0, pagination: false, depth: 0, overrideAccess: true })
  const done = new Set(applied.map((m) => m.name))
  const pending = migrations.map((m) => m.name).filter((n) => !done.has(n))
  if (pending.length) {
    console.error(`[sizes] This database has ${pending.length} pending migration(s): ${pending.join(', ')}`)
    console.error('[sizes] Apply them first (deploy to production, or run `pnpm migrate` with the same DATABASE_URL), then run this again.')
    process.exit(1)
  }
  const { docs } = await payload.find({ collection: 'media', limit: 0, pagination: false, depth: 0, overrideAccess: true })
  const smallest = Math.min(...imageWidths)
  const todo = docs.filter((d) => {
    if (!d.mimeType?.startsWith('image/') || !d.filename) return false
    if ((d.width ?? 0) <= smallest) return false // nothing smaller to generate
    return all || !Object.values(d.sizes ?? {}).some((s) => s?.url)
  })
  console.log(`[sizes] ${todo.length} of ${docs.length} media file(s) to process${dryRun ? ' (dry run)' : ''}`)

  let failed = 0
  for (const doc of todo) {
    if (dryRun) {
      console.log(`[sizes] would process #${doc.id} ${doc.filename}`)
      continue
    }
    try {
      const data = await readOriginal(doc)
      await payload.update({
        collection: 'media',
        id: doc.id,
        data: {},
        file: { data, mimetype: doc.mimeType!, name: doc.filename!, size: data.length },
        overwriteExistingFiles: true, // keep the file name (local disk would otherwise add a suffix)
        overrideAccess: true,
      })
      console.log(`[sizes] ✓ #${doc.id} ${doc.filename}`)
    } catch (e) {
      failed++
      console.error(`[sizes] ✗ #${doc.id} ${doc.filename}:`, e instanceof Error ? e.message : e)
    }
  }
  process.exit(failed ? 1 : 0)
}

// Top-level await: `payload run` exits when the module finishes loading.
try {
  await main()
} catch (e) {
  console.error(e)
  process.exit(1)
}
