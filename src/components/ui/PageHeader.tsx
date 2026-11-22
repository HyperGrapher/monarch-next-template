import { SectionHead } from './SectionHead'

export function PageHeader({ label, title, intro, n = '' }: { label?: string; title: string; intro?: string | null; n?: string }) {
  return (
    <header className="px-gutter pt-[calc(4rem+clamp(2rem,5vw,5rem))] pb-[clamp(2rem,5vw,5rem)]">
      <SectionHead n={n} label={label ?? ''} />
      <h1 data-reveal="up" className="t-display m-0 max-w-[16ch] break-words">
        {title}
      </h1>
      {intro && (
        <p data-reveal="up" className="t-lead mt-8 max-w-[46ch] text-graphite">
          {intro}
        </p>
      )}
    </header>
  )
}
