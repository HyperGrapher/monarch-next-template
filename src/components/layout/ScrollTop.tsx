'use client'

import { useEffect, useState } from 'react'
import { scrollToTop } from '../../lib/motion'

export function ScrollTop({ label }: { label: string }) {
  const [progress, setProgress] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
      setShow(window.scrollY > window.innerHeight)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <button
      type="button"
      aria-label={label}
      onClick={scrollToTop}
      tabIndex={show ? 0 : -1}
      className="fixed right-[calc(1rem+var(--sbw,0px))] bottom-4 z-40 h-12 w-12 cursor-pointer bg-paper text-ink md:right-[calc(2rem+var(--sbw,0px))] md:bottom-8"
      style={{ opacity: show ? 1 : 0, pointerEvents: show ? 'auto' : 'none', transition: 'opacity 0.4s' }}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0" aria-hidden="true">
        <rect x="0.5" y="0.5" width="47" height="47" fill="none" stroke="currentColor" strokeOpacity="0.2" />
        <rect x="0.5" y="0.5" width="47" height="47" pathLength={1} fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="1" style={{ strokeDashoffset: 1 - progress }} />
        <path d="M24 32V16M17 22l7-7 7 7" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </button>
  )
}
