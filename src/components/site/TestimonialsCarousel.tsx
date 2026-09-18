'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type Testimonial = {
  quote: string
  author: string
  city: string
}

const AUTOPLAY_MS = 4500
const SLIDE_MS = 750
const SWIPE_PX = 48
const EASE = `transform ${SLIDE_MS}ms cubic-bezier(0.32, 0.72, 0, 1)`

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const n = items.length
  const headingId = useId()
  const pointer = useRef<{ x: number; y: number } | null>(null)
  const reduceRef = useRef(false)

  const [index, setIndex] = useState(n)
  const [instant, setInstant] = useState(false)
  const [paused, setPaused] = useState(false)
  const [reduce, setReduce] = useState(false)
  const [visible, setVisible] = useState(1)

  const extended = n > 0 ? [...items, ...items, ...items] : []

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = window.matchMedia('(min-width: 768px)')
    const sync = () => {
      const reduced = motion.matches
      reduceRef.current = reduced
      setReduce(reduced)
      setVisible(desktop.matches ? Math.min(3, n) : 1)
    }
    sync()
    motion.addEventListener('change', sync)
    desktop.addEventListener('change', sync)
    return () => {
      motion.removeEventListener('change', sync)
      desktop.removeEventListener('change', sync)
    }
  }, [n])

  useEffect(() => {
    if (!instant) return
    const id = requestAnimationFrame(() => setInstant(false))
    return () => cancelAnimationFrame(id)
  }, [instant])

  const wrapIndex = useCallback(
    (current: number) => {
      if (n < 2) return current
      if (current >= 2 * n) return n
      if (current < n) return current + n
      return current
    },
    [n],
  )

  const settle = useCallback(
    (current: number) => {
      const wrapped = wrapIndex(current)
      if (wrapped === current) return
      setInstant(true)
      setIndex(wrapped)
    },
    [wrapIndex],
  )

  useEffect(() => {
    if (reduce) {
      settle(index)
      return
    }
    const timeout = window.setTimeout(() => settle(index), SLIDE_MS + 40)
    return () => window.clearTimeout(timeout)
  }, [index, reduce, settle])

  const goNext = useCallback(() => {
    if (n < 2) return
    setIndex((current) => (reduceRef.current ? wrapIndex(current + 1) : current + 1))
  }, [n, wrapIndex])

  const goPrev = useCallback(() => {
    if (n < 2) return
    setIndex((current) => (reduceRef.current ? wrapIndex(current - 1) : current - 1))
  }, [n, wrapIndex])

  const goTo = useCallback(
    (next: number) => {
      if (n < 2) return
      setIndex((current) => {
        if (next === current) return current
        return reduceRef.current ? wrapIndex(next) : next
      })
    },
    [n, wrapIndex],
  )

  useEffect(() => {
    if (paused || reduce || n < 2) return
    const id = window.setInterval(() => {
      if (document.hidden) return
      goNext()
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [paused, reduce, n, goNext])

  if (n === 0) return null

  const active = ((index % n) + n) % n

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={headingId}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          goPrev()
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          goNext()
        }
      }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false)
        }
      }}
      className="outline-none"
    >
      <p id={headingId} className="sr-only">
        Client comments
      </p>
      <div
        className="[container-type:inline-size] overflow-hidden py-2 [--gap:1rem] [--visible:1] md:[--gap:1.25rem] md:[--visible:3]"
        onPointerDown={(event) => {
          if (event.pointerType === 'mouse' && event.button !== 0) return
          pointer.current = { x: event.clientX, y: event.clientY }
        }}
        onPointerUp={(event) => {
          const start = pointer.current
          pointer.current = null
          if (!start) return
          const dx = event.clientX - start.x
          const dy = event.clientY - start.y
          if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy) * 1.15) return
          if (dx < 0) goNext()
          else goPrev()
        }}
        onPointerCancel={() => {
          pointer.current = null
        }}
        style={{ touchAction: 'pan-y' }}
      >
        <div
          className="flex items-stretch"
          data-slide={index}
          style={{
            gap: 'var(--gap)',
            transform: `translate3d(calc(${-index} * (100cqi + var(--gap)) / var(--visible)), 0, 0)`,
            transition: instant || reduce ? 'none' : EASE,
          }}
        >
          {extended.map((item, i) => {
            const inView = i >= index && i < index + visible
            return (
              <article
                key={`${item.author}-${i}`}
                aria-hidden={!inView}
                className="flex h-auto shrink-0 flex-col rounded-xl border border-[#1a1208]/8 bg-white p-6 shadow-[0_10px_32px_rgba(26,18,8,0.06)] transition-shadow duration-500 hover:shadow-[0_16px_40px_rgba(26,18,8,0.1)] sm:p-8 md:p-9"
                style={{
                  width: 'calc((100cqi - (var(--visible) - 1) * var(--gap)) / var(--visible))',
                }}
              >
                <span
                  className="font-display text-[3.4rem] leading-[0.7] text-[#c9a84c]/75"
                  aria-hidden="true"
                >
                  “
                </span>
                <blockquote className="mt-4 flex flex-1 flex-col">
                  <p className="font-display text-[1.28rem] italic leading-snug tracking-tight text-[#1a1208] sm:text-[1.4rem]">
                    {item.quote}
                  </p>
                  <footer className="mt-auto pt-7 font-mono text-[11px] uppercase tracking-[0.16em] text-[#1a1208]/45">
                    {item.author} · {item.city}
                  </footer>
                </blockquote>
              </article>
            )
          })}
        </div>
      </div>

      {n > 1 ? (
        <div className="mt-8 flex items-center justify-center gap-4 sm:mt-10 sm:gap-5">
          <button
            type="button"
            aria-label="Previous comments"
            onClick={goPrev}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#1a1208]/15 bg-white text-[#1a1208] transition-colors duration-300 hover:border-[#1a1208] hover:bg-[#1a1208] hover:text-white"
          >
            <Chevron dir="left" />
          </button>
          <div className="flex items-center gap-2.5" aria-label="Comment slides">
            {items.map((item, i) => (
              <button
                key={item.author}
                type="button"
                aria-label={`Show comments from ${item.author}`}
                aria-current={active === i ? 'true' : undefined}
                onClick={() => goTo(n + i)}
                className={cn(
                  'h-2.5 min-w-2.5 rounded-full transition-all duration-500',
                  active === i
                    ? 'w-7 bg-[#1a1208]'
                    : 'w-2.5 bg-[#1a1208]/20 hover:bg-[#1a1208]/40',
                )}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next comments"
            onClick={goNext}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#1a1208]/15 bg-white text-[#1a1208] transition-colors duration-300 hover:border-[#1a1208] hover:bg-[#1a1208] hover:text-white"
          >
            <Chevron dir="right" />
          </button>
        </div>
      ) : null}
    </div>
  )
}
