import type { TextFieldSingleValidation } from 'payload'

/** Accepts an absolute http(s) URL (empty is fine when the field is optional). Rejects `javascript:` etc. */
export const httpUrl: TextFieldSingleValidation = (value) => {
  if (!value) return true
  try {
    const u = new URL(value)
    if (u.protocol === 'https:' || u.protocol === 'http:') return true
  } catch {
    /* not a URL */
  }
  return 'Enter a full web address starting with https://'
}
