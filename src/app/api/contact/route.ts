import { getClient } from '../../../lib/payload'
import { defaultLocale, isLocale } from '../../../config/locales'
import { getDictionary } from '../../../lib/i18n/dictionary'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

// Public can only POST here; the collection itself denies all public access.
export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return Response.json({ ok: false }, { status: 400 })
  const requested = str(body.locale, 5)
  const locale = isLocale(requested) ? requested : defaultLocale
  // Abuse protection: honeypot + "too fast" timing trap. Bots get a silent success.
  const elapsed = typeof body.elapsed === 'number' ? body.elapsed : 0
  if (str(body.website, 200) || elapsed < 1500) return Response.json({ ok: true })

  const t = getDictionary(locale).contact
  const data = { name: str(body.name, 120), email: str(body.email, 200), phone: str(body.phone, 40), message: str(body.message, 4000) }
  const errors: Record<string, string> = {}
  if (data.name.length < 2) errors.name = t.invalid
  if (!emailRe.test(data.email)) errors.email = t.invalid
  if (data.message.length < 10) errors.message = t.invalid
  if (Object.keys(errors).length) return Response.json({ ok: false, errors }, { status: 422 })

  try {
    const payload = await getClient()
    await payload.create({ collection: 'contact-submissions', data: { ...data, locale }, overrideAccess: true })
    // Email delivery is optional and not configured: nothing is sent, we only store the message.
    return Response.json({ ok: true })
  } catch {
    return Response.json({ ok: false }, { status: 500 })
  }
}
