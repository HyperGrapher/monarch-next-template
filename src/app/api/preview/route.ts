import { draftMode, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getClient } from '../../../lib/payload'

// Enables Draft Mode ONLY for a signed-in CMS user (cookie session verified server-side)
// and, when PREVIEW_SECRET is set, only with the matching secret. Redirects to local paths only.
export async function GET(req: Request) {
  const url = new URL(req.url)
  const path = url.searchParams.get('path') ?? '/'
  if (!path.startsWith('/') || path.startsWith('//')) return new Response('Invalid path', { status: 400 })
  const secret = process.env.PREVIEW_SECRET
  if (secret && url.searchParams.get('secret') !== secret) return new Response('Forbidden', { status: 403 })
  const payload = await getClient()
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) return new Response('Unauthorized', { status: 401 })
  ;(await draftMode()).enable()
  redirect(path)
}
