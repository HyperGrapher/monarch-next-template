import type { Img } from '../../lib/media'

/**
 * Image at its natural ratio: reserved space (no layout shift), mist backplate, clip-path reveal.
 * `sizes` tells the browser how wide the image is drawn so it can pick a width from `srcset`;
 * the default (full viewport) is right for full-bleed images — pass a smaller one in grids.
 * `eager` is for the main above-the-fold image: loaded immediately, with high priority (LCP).
 */
export function Photo({ image, reveal = true, eager = false, className = '', imgClassName = '', sizes = '100vw' }: { image: Img; reveal?: boolean; eager?: boolean; className?: string; imgClassName?: string; sizes?: string }) {
  return (
    <div data-reveal={reveal ? 'image' : undefined} className={`overflow-hidden bg-mist ${className}`} style={{ aspectRatio: `${image.width} / ${image.height}` }}>
      <img src={image.src} srcSet={image.srcSet} sizes={image.srcSet ? sizes : undefined} alt={image.alt} width={image.width} height={image.height} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} decoding="async" className={`h-full w-full object-cover ${imgClassName}`} />
    </div>
  )
}
