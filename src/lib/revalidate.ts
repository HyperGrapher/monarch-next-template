import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook, PayloadRequest } from 'payload'

/**
 * Public pages are statically cached (ISR). A change visitors can see purges the whole site
 * (it is small, and the header/footer use SiteSettings). Outside a Next request (seed script,
 * migrations) revalidatePath throws; that is fine to ignore.
 */
const purge = () => {
  try {
    revalidatePath('/', 'layout')
  } catch {
    /* not inside a Next request */
  }
}

// Autosaves (Live Preview) only write a draft version while the editor types.
const isAutosave = (req: any) => req?.query?.autosave === 'true' || req?.query?.autosave === true

type Status = 'draft' | 'published' | null | undefined
type ChangeArgs = {
  doc: { id?: number | string; _status?: Status }
  previousDoc?: { _status?: Status } | null
  operation?: 'create' | 'update'
  context?: Record<string, unknown>
  req: PayloadRequest
  collection?: { slug: string; versions?: { drafts?: unknown } | boolean }
  global?: { slug: string; versions?: { drafts?: unknown } | boolean }
}

const hasDrafts = (entity?: ChangeArgs['collection']) => !!entity && typeof entity.versions === 'object' && !!entity.versions?.drafts

/** Status of the published (main) document right now, inside the same transaction. */
async function mainStatus({ req, collection, global, doc }: ChangeArgs): Promise<Status> {
  const payload = req.payload
  const read = { draft: false, overrideAccess: true, depth: 0, req, select: { _status: true } as any }
  const main = collection
    ? await payload.findByID({ collection: collection.slug as any, id: doc.id as any, ...read })
    : await payload.findGlobal({ slug: global!.slug as any, ...read })
  return (main as { _status?: Status } | null)?._status
}

/**
 * Does this save change what visitors see?
 * - no drafts on this collection/global → every save is live
 * - a new media upload is not used anywhere yet
 * - publishing → yes; saving a draft of a never-published document → no
 * - `_status: 'draft'` on a document that WAS published is either "Save draft" (main document unchanged)
 *   or "Unpublish" (main document becomes a draft). Only the second matters, so look at the main document.
 */
export async function changesPublicContent(args: ChangeArgs): Promise<boolean> {
  const { collection, global, operation, doc, previousDoc } = args
  if (collection?.slug === 'media' && operation === 'create') return false
  if (!hasDrafts(collection ?? global)) return true
  if (doc._status === 'published') return true
  if (previousDoc?._status !== 'published') return false
  try {
    return (await mainStatus(args)) !== 'published'
  } catch {
    return true // when in doubt, purge
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook & GlobalAfterChangeHook = async (args: any) => {
  if (!args.context?.disableRevalidate && !isAutosave(args.req) && (await changesPublicContent(args))) purge()
  return args.doc
}
export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, context }: any) => {
  if (!context?.disableRevalidate) purge()
  return doc
}
