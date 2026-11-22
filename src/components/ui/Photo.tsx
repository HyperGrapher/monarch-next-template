import type { Img } from '../../lib/media'

/** Image at its natural ratio: reserved space (no layout shift), mist backplate, clip-path reveal. */
export function Photo({ image, reveal = true, eager = false, className = '', imgClassName = '', sizes }: { image: Img; reveal?: boolean; eager?: boolean; className?: string; imgClassName?: string; sizes?: string }) {
  return (
    <div data-reveal={reveal ? 'image' : undefined} className={`overflow-hidden bg-mist ${className}`} style={{ aspectRatio: `${image.width} / ${image.height}` }}>
      <img src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={sizes} loading={eager ? 'eager' : 'lazy'} decoding="async" className={`h-full w-full object-cover ${imgClassName}`} />
    </div>
  )
}
