'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useSyncExternalStore } from 'react'

const isEmbedded = () => {
  try {
    return window.self !== window.top
  } catch {
    return true // cross-origin parent: definitely framed
  }
}
const noSubscription = (): (() => void) => () => {}
// The admin is served from the same origin as the site, and Payload checks the message origin exactly.
const embeddedOrigin = (): string | null => (isEmbedded() ? window.location.origin : null)

/**
 * Rendered only in Draft Mode. When the page is embedded in the admin's Live Preview iframe it tells the admin
 * it is ready and re-renders the server components (router.refresh) whenever the document is saved/autosaved.
 * Outside an iframe (the plain "Preview" button) it does nothing.
 */
export function LivePreviewListener() {
  const router = useRouter()
  const refresh = useCallback(() => router.refresh(), [router])
  const origin = useSyncExternalStore(noSubscription, embeddedOrigin, () => null as string | null)

  useEffect(() => {
    if (origin) document.documentElement.dataset.embedded = ''
  }, [origin])

  if (!origin) return null
  return <RefreshRouteOnSave refresh={refresh} serverURL={origin} />
}
