import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

/** Lexical → React via Payload's maintained renderer. Never raw HTML. */
export function RichText({ data, className = '' }: { data: unknown; className?: string }) {
  if (!data) return null
  return <PayloadRichText data={data as SerializedEditorState} className={`prose-monarch ${className}`} />
}
