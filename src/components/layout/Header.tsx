'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { isMultilingual, localeLabels, localePath, locales, type Locale } from '../../config/locales'
import { scrollToTop, startScroll, stopScroll } from '../../lib/motion'
import { Logo } from '../ui/Logo'

export type NavItem = { key: string; href: string; label: string }
type Props = {
  locale: Locale
  name: string
  nav: NavItem[]
  contact: { label: string; href: string }
  email?: string | null
  phone?: string | null
  address?: string | null
  labels: { menu: string; open: string; close: string; sections: string; language: string; backToTop: string }
}

/** Path without the locale prefix, so the language switcher can keep you on the same page. */
const stripLocale = (pathname: string, locale: Locale) => {
  const prefix = localePath(locale, '/')
  const rest = pathname.startsWith(prefix) ? pathname.slice(prefix.length) : pathname
  return rest.startsWith('/') ? rest : `/${rest}`
}

export function Header({ locale, name, nav, contact, email, phone, address, labels }: Props) {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const overlay = useRef<HTMLDivElement>(null)
  const openRef = useRef(open)
  openRef.current = open
  const here = stripLocale(pathname, locale)

  // Close the menu after navigation
  // biome-ignore lint/correctness/useExhaustiveDependencies: close on route change
  useEffect(() => setOpen(false), [pathname])

  // Hide on deliberate downward travel, show on deliberate upward travel.
  useEffect(() => {
    let travel = 0
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const dy = y - lastY
      lastY = y
      if (openRef.current) return
      if (y < 160) {
        travel = 0
        setHidden(false)
        return
      }
      if (dy === 0) return
      if (Math.sign(dy) !== Math.sign(travel)) travel = 0
      travel += dy
      if (travel > 72) setHidden(true)
      else if (travel < -96) setHidden(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menu: scroll lock, inert page, focus trap, Escape.
  useEffect(() => {
    const page = document.getElementById('page')
    let raf1 = 0
    let raf2 = 0
    if (open) {
      const sw = window.innerWidth - document.documentElement.clientWidth
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          stopScroll()
          document.documentElement.style.setProperty('--sbw', `${sw}px`)
          document.documentElement.style.paddingRight = `${sw}px`
          document.documentElement.style.overflow = 'hidden'
          page?.setAttribute('inert', '')
          overlay.current?.querySelector<HTMLElement>('a,button')?.focus()
        })
      })
    } else {
      startScroll()
      document.documentElement.style.overflow = ''
      document.documentElement.style.paddingRight = ''
      document.documentElement.style.removeProperty('--sbw')
      page?.removeAttribute('inert')
    }
    const onKey = (e: KeyboardEvent) => {
      if (!openRef.current) return
      if (e.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
      if (e.key === 'Tab') {
        const f = [...(overlay.current?.querySelectorAll<HTMLElement>('a,button') ?? []), ...(toggle.current ? [toggle.current] : [])]
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        const cur = document.activeElement
        if (e.shiftKey && cur === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && cur === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      document.documentElement.style.paddingRight = ''
      document.documentElement.style.removeProperty('--sbw')
    }
  }, [open])

  const switcher = isMultilingual && (
    <ul className="m-0 flex list-none gap-3 p-0" aria-label={labels.language}>
      {locales.map((l) => (
        <li key={l}>
          <Link
            href={localePath(l, here === '/' ? '/' : here)}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? 'true' : undefined}
            aria-label={localeLabels[l]}
            className="link-draw t-label inline-flex min-h-11 min-w-8 items-center justify-center"
          >
            {l.toUpperCase()}
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[60] flex h-16 items-center justify-between pr-[calc(var(--spacing-gutter)+var(--sbw,0px))] pl-gutter text-white mix-blend-difference md:h-[3.6vw] md:min-h-14"
        style={{ transform: hidden ? 'translateY(-110%)' : 'translateY(0)', transition: 'transform 0.9s var(--ease-out-arch)' }}
      >
        <Link
          href={localePath(locale, '/')}
          aria-label={`${name}, ${labels.backToTop}`}
          className="text-[max(15px,1.05vw)]"
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey) return
            setOpen(false)
            if (here === '/') {
              e.preventDefault()
              scrollToTop()
            }
          }}
        >
          <Logo name={name} />
        </Link>
        <div className="flex items-center gap-2 md:gap-6">
          <div className="hidden items-center gap-6 md:flex">
            {switcher}
            <Link href={contact.href} className="link-draw t-label inline-flex min-h-11 items-center" aria-current={here.startsWith('/contact') ? 'true' : undefined}>
              {contact.label}
            </Link>
          </div>
          <button
            ref={toggle}
            type="button"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? labels.close : labels.open}
            onClick={() => setOpen((o) => !o)}
            className="relative flex h-10 w-[4.25rem] cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full bg-white"
          >
            <span className="block h-px w-[18px] bg-black transition-transform duration-500" style={{ transform: open ? 'translateY(3px) rotate(45deg)' : 'none' }} />
            <span className="block h-px w-[18px] bg-black transition-transform duration-500" style={{ transform: open ? 'translateY(-3px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </header>

      <div
        ref={overlay}
        id="menu"
        role="dialog"
        aria-modal="true"
        aria-label={labels.menu}
        inert={!open}
        className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-ink px-gutter pt-24 pb-8 text-paper"
        style={{
          transform: open ? 'translate3d(0,0,0)' : 'translate3d(0,-100%,0)',
          willChange: 'transform',
          visibility: open ? 'visible' : 'hidden',
          transition: open ? 'transform 0.9s var(--ease-arch), visibility 0s' : 'transform 0.9s var(--ease-arch), visibility 0s linear 0.9s',
        }}
      >
        <nav aria-label={labels.sections}>
          <ul className="m-0 list-none p-0">
            {nav.map((n, i) => {
              const active = n.href === '/' ? here === '/' : here.startsWith(n.href)
              return (
                <li
                  key={n.key}
                  className="border-t border-paper/20"
                  style={{
                    transform: open ? 'none' : 'translateY(40px)',
                    opacity: open ? 1 : 0,
                    transition: `transform 0.8s var(--ease-out-arch) ${open ? 0.25 + i * 0.06 : 0}s, opacity 0.6s ${open ? 0.25 + i * 0.06 : 0}s`,
                  }}
                >
                  <Link
                    href={localePath(locale, n.href)}
                    aria-current={active ? 'page' : undefined}
                    className="flex min-h-11 items-baseline gap-6 py-2 text-[clamp(2.25rem,8vw,6.5rem)] leading-none font-extrabold tracking-[-0.045em] hover:text-signal focus-visible:text-signal aria-[current=page]:text-signal"
                  >
                    <span className="t-label w-8 shrink-0 font-semibold">{String(i + 1).padStart(2, '0')}</span>
                    {n.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="t-meta flex flex-col gap-3 pt-8 text-paper/70 md:flex-row md:items-center md:justify-between">
          {email && (
            <a href={`mailto:${email}`} className="link-draw w-fit">
              {email}
            </a>
          )}
          {phone && (
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="link-draw w-fit">
              {phone}
            </a>
          )}
          {address && <span>{address}</span>}
          <div className="md:hidden">{switcher}</div>
        </div>
      </div>
    </>
  )
}
