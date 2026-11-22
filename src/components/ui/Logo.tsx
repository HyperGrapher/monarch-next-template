export function Logo({ name, className = '' }: { name: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 font-medium tracking-tight ${className}`}>
      <svg width="18" height="14" viewBox="0 0 18 14" fill="currentColor" aria-hidden="true">
        <path d="M0 14V2l5 3V0l4 2.4L13 0v5l5-3v12h-4.5V8L9 11 4.5 8v6z" />
      </svg>
      {name}
    </span>
  )
}
