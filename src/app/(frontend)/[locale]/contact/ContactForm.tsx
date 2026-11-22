'use client'

import { useState } from 'react'
import type { Dict } from '../../../../lib/i18n/dictionary'

type State = 'idle' | 'sending' | 'success' | 'error' | 'invalid'

export function ContactForm({ locale, t }: { locale: string; t: Dict['contact'] }) {
  const [state, setState] = useState<State>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [startedAt] = useState(() => Date.now())

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setState('sending')
    setErrors({})
    const data = Object.fromEntries(new FormData(form))
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...data, locale, elapsed: Date.now() - startedAt }) })
      if (res.ok) {
        setState('success')
        form.reset()
      } else if (res.status === 422) {
        setErrors(((await res.json()) as { errors?: Record<string, string> }).errors ?? {})
        setState('invalid')
      } else setState('error')
    } catch {
      setState('error')
    }
  }

  const field = 'mt-2 block w-full border-0 border-b border-ink bg-transparent py-3 text-base outline-offset-4 focus-visible:outline-2 aria-[invalid=true]:border-signal aria-[invalid=true]:border-b-2'
  const Row = ({ name, label, type = 'text', required = true, area = false }: { name: string; label: string; type?: string; required?: boolean; area?: boolean }) => (
    <div>
      <label htmlFor={name} className="t-label">{label}{!required && <span className="text-ash"> · {t.optional}</span>}</label>
      {area ? (
        <textarea id={name} name={name} rows={6} required={required} maxLength={4000} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-err` : undefined} className={field} />
      ) : (
        <input id={name} name={name} type={type} required={required} maxLength={120} autoComplete={name === 'name' ? 'name' : name} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-err` : undefined} className={field} />
      )}
      {errors[name] && <p id={`${name}-err`} className="t-meta mt-1 mb-0 text-[#b3260e]">{errors[name]}</p>}
    </div>
  )

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8" aria-describedby="form-status">
      <Row name="name" label={t.name} />
      <Row name="email" label={t.email} type="email" />
      <Row name="phone" label={t.phone} type="tel" required={false} />
      <Row name="message" label={t.message} area />
      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div>
        <button type="submit" disabled={state === 'sending'} className="inline-flex min-h-12 cursor-pointer items-center bg-signal px-8 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper disabled:opacity-60">
          {state === 'sending' ? t.sending : t.send}
        </button>
      </div>
      <p id="form-status" role="status" aria-live="polite" className="t-meta m-0 min-h-6">
        {state === 'success' && t.success}
        {state === 'error' && t.error}
        {state === 'invalid' && t.invalid}
      </p>
    </form>
  )
}
