'use client'

import { useEffect, useRef, useState } from 'react'
import { initHero } from '../hero/hero-gl'
import { scrollToId } from '../../lib/motion'
import { useReady } from '../layout/Shell'
import type { Img } from '../../lib/media'

type Props = { name: string; word: string; left: Img; right: Img; statement: string; caption: string; cta: string }

export function Hero({ name, word, left, right, statement, caption, cta }: Props) {
  const onReady = useReady()
  const stage = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const leftEl = useRef<HTMLDivElement>(null)
  const rightEl = useRef<HTMLDivElement>(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    return initHero({
      stage: stage.current as HTMLElement,
      canvas: canvas.current as HTMLCanvasElement,
      left: leftEl.current as HTMLElement,
      right: rightEl.current as HTMLElement,
      leftSrc: left.src,
      rightSrc: right.src,
      word,
      onReady,
      onFallback: () => setFallback(true),
    })
  }, [onReady, left.src, right.src, word])

  return (
    <section id="top" className="relative w-full md:h-[63.2vw]" ref={stage}>
      <h1 className="sr-only">{name}</h1>
      <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 h-full w-full" style={{ display: fallback ? 'none' : 'block' }} />

      <div ref={leftEl} className="absolute top-16 left-[4%] h-[118vw] w-[60%] md:top-[4vw] md:left-[4.1%] md:h-[50.6vw] md:w-[59.8%]">
        {fallback && <img src={left.src} srcSet={left.srcSet} sizes="60vw" alt={left.alt} className="h-full w-full object-cover" />}
      </div>
      <div ref={rightEl} className="absolute top-16 left-[66%] h-[88vw] w-[30%] md:top-[3.85vw] md:left-[65.3%] md:h-[42.9vw] md:w-[29.2%]">
        {fallback && <img src={right.src} srcSet={right.srcSet} sizes="30vw" alt={right.alt} className="h-full w-full object-cover" />}
      </div>
      {fallback && (
        <div aria-hidden="true" className="absolute top-[calc(4rem+2vw)] left-[4%] text-[19vw] leading-none font-extrabold tracking-[-0.04em] text-ink md:top-[4vw] md:left-[4.1%] md:text-[15vw]">
          {word}
        </div>
      )}

      <div className="relative px-[4%] pt-[calc(4rem+124vw)] pb-14 md:contents">
        <p data-reveal="up" className="m-0 w-[90%] text-[9vw] leading-[1.02] font-bold tracking-[-0.045em] md:absolute md:top-[55.4vw] md:left-[4.1%] md:w-[42vw] md:text-[2.8vw] md:leading-[1.07]">
          {statement}
        </p>
        <div className="mt-8 md:absolute md:top-[47.7vw] md:left-[65.3%] md:mt-0 md:w-[22vw]">
          <p data-reveal="up" className="m-0 max-w-sm text-[0.95rem] leading-[1.35] font-medium tracking-[-0.01em] md:max-w-none md:text-[0.88vw]">
            {caption}
          </p>
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault()
              scrollToId('work')
            }}
            data-reveal="up"
            className="mt-5 inline-flex min-h-11 items-center bg-signal px-5 text-[0.8rem] font-semibold text-ink no-underline transition-colors hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper md:mt-[1vw] md:min-h-0 md:px-[1.1vw] md:py-[0.65vw] md:text-[0.75vw]"
          >
            {cta}
          </a>
        </div>
      </div>
    </section>
  )
}
