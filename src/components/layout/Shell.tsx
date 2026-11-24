'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { brandConfig } from '../../config/brand'
import { localePath, type Locale } from '../../config/locales'
import { initSmoothScroll, useReveal } from '../../lib/motion'

const ReadyContext = createContext<() => void>(() => {})
/** The hero calls this once its first WebGL frame is drawn (lifts the loader). */
export const useReady = () => useContext(ReadyContext)

/** Rendered on the home page when there is no shader hero, so the loader never waits for one. */
export function ReleaseLoader(): null {
  const onReady = useReady()
  useEffect(() => onReady(), [onReady])
  return null
}

export function Shell({ locale, loadingLabel, children }: { locale: Locale; loadingLabel: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === localePath(locale, '/')
  // The loader only exists on first load of the home page (where the shader hero is).
  const [ready, setReady] = useState(!isHome)
  const scope = useRef<HTMLDivElement>(null)
  const markReady = useCallback(() => setReady(true), [])

  useEffect(() => initSmoothScroll(), [])
  useReveal(scope, ready, pathname)

  return (
    <ReadyContext.Provider value={markReady}>
      <div
        id="loader"
        aria-hidden={ready}
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{
          background: brandConfig.paperColor,
          opacity: ready ? 0 : 1,
          visibility: ready ? 'hidden' : 'visible',
          transition: 'opacity 700ms ease, visibility 0s linear 700ms',
          pointerEvents: ready ? 'none' : 'auto',
        }}
      >
        <output className="block h-9 w-9 animate-spin rounded-full border-2 border-black/15 border-t-black" aria-label={loadingLabel} />
      </div>
      <noscript>
        <style>{'#loader{display:none!important}'}</style>
      </noscript>
      <div ref={scope}>{children}</div>
    </ReadyContext.Provider>
  )
}
