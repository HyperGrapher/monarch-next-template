/** Plain text of a Lexical document (for reading-time and excerpts). */
export function lexicalText(node: any): string {
  if (!node) return ''
  if (typeof node.text === 'string') return node.text
  const kids = node.root?.children ?? node.children
  return Array.isArray(kids) ? kids.map(lexicalText).join(' ') : ''
}
export const readingMinutes = (content: unknown) => {
  const words = lexicalText(content).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}
export const formatDate = (iso: string | null | undefined, locale: string) =>
  iso ? new Intl.DateTimeFormat(locale === 'tr' ? 'tr-TR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso)) : ''
export const formatArea = (m2: number | null | undefined, locale: string) =>
  m2 ? `${new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : 'en-GB').format(m2)} m²` : ''
