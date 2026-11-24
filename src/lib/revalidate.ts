import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

/**
 * Public pages are statically cached (ISR). Any content change purges the whole
 * locale layout (site is tiny, and header/footer use SiteSettings). Outside a Next
 * request (seed script, migrations) revalidatePath throws; that is fine to ignore.
 */
const purge = () => {
  try {
    revalidatePath('/', 'layout')
  } catch {
    /* not inside a Next request */
  }
}

// Autosaves (Live Preview) only write a draft version while the editor types; they never change what visitors
// see, so they must not purge the cache every second.
const isAutosave = (req: any) => req?.query?.autosave === 'true' || req?.query?.autosave === true

export const revalidateAfterChange: CollectionAfterChangeHook & GlobalAfterChangeHook = ({ doc, context, req }: any) => {
  if (!context?.disableRevalidate && !isAutosave(req)) purge()
  return doc
}
export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, context }: any) => {
  if (!context?.disableRevalidate) purge()
  return doc
}
