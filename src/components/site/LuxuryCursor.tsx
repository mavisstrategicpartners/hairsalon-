'use client'

import { useEffect, useRef, useState } from 'react'

type CursorMode = 'default' | 'hover' | 'view' | 'add' | 'text'

function canUseMouseCursor() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function readMode(el: Element | null): CursorMode {
  if (!el) return 'default'
  if (el.closest('input, textarea, select, [contenteditable="true"]')) return 'text'

  const control = el.closest('button, [role="button"]')
  const label = `${control?.textContent ?? ''} ${control?.getAttribute('aria-label') ?? ''}`.toLowerCase()
  if (control && /add to bag|add voucher/.test(label)) return 'add'

  const link = el.closest('a')
  if (link) {
    const href = link.getAttribute('href') ?? ''
    if (href.includes('/product/') || href.includes('/gallery')) return 'view'
    const box = link.getBoundingClientRect()
    if (link.querySelector('img') && box.height >= 180 && box.width >= 140) return 'view'
  }

  if (el.closest('article')) return control ? 'hover' : 'view'

  const img = el.closest('img')
  if (img) {
    const box = (img.parentElement ?? img).getBoundingClientRect()
    if (Math.min(box.width, box.height) >= 180) return 'view'
  }

  if (control || link || el.closest('summary, label')) return 'hover'
  return 'default'
}

export function LuxuryCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const visible = useRef(false)
  const raf = useRef(0)
  const [ready, setReady] = useState(false)
  const [mode, setMode] = useState<CursorMode>('default')

  useEffect(() => {
    if (!canUseMouseCursor()) return
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ease = reduce ? 1 : 0.18
    const root = document.documentElement

    const loop = () => {
      const p = pos.current
      p.x += (p.tx - p.x) * ease
      p.y += (p.ty - p.y) * ease
      const el = dotRef.current
      if (el) {
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`
        el.style.opacity = visible.current ? '1' : '0'
      }
      raf.current = window.requestAnimationFrame(loop)
    }
    raf.current = window.requestAnimationFrame(loop)

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') {
        visible.current = false
        root.classList.remove('has-luxury-cursor')
        return
      }

      pos.current.tx = e.clientX
      pos.current.ty = e.clientY
      if (!visible.current) {
        pos.current.x = e.clientX
        pos.current.y = e.clientY
      }
      visible.current = true

      const next = readMode(document.elementFromPoint(e.clientX, e.clientY))
      if (next === 'text') root.classList.remove('has-luxury-cursor')
      else root.classList.add('has-luxury-cursor')
      setMode((prev) => (prev === next ? prev : next))
    }

    const hide = () => {
      visible.current = false
    }

    const onTouch = () => {
      visible.current = false
      root.classList.remove('has-luxury-cursor')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', hide)
    window.addEventListener('touchstart', onTouch, { passive: true })

    return () => {
      window.cancelAnimationFrame(raf.current)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', hide)
      window.removeEventListener('touchstart', onTouch)
      root.classList.remove('has-luxury-cursor')
    }
  }, [ready])

  if (!ready) return null

  const label = mode === 'view' ? 'View' : mode === 'add' ? 'Add' : ''

  return (
    <div ref={dotRef} className={`luxury-cursor luxury-cursor--${mode}`} aria-hidden>
      <span className="luxury-cursor-ring">
        {label ? <span className="luxury-cursor-label">{label}</span> : null}
      </span>
    </div>
  )
}
