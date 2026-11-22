export function SectionHead({ n, label, className = '' }: { n?: string; label: string; className?: string }) {
  return (
    <div className={`mb-[clamp(2.5rem,6vw,6rem)] ${className}`}>
      <span data-reveal="rule" className="block h-[3px] w-full bg-current" />
      <div className="t-label mt-3 flex justify-between">
        <span>{n}</span>
        <span>{label}</span>
      </div>
    </div>
  )
}
