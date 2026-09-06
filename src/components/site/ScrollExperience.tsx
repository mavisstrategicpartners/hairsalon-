'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isAboveFold(el: Element) {
  return el.getBoundingClientRect().top < window.innerHeight * 0.9
}

export function ScrollExperience() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('scroll-premium')

    const applyReduced = () => {
      root.classList.toggle('reduce-motion', prefersReducedMotion())
    }
    applyReduced()

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    motion.addEventListener('change', applyReduced)

    if (prefersReducedMotion()) {
      return () => {
        motion.removeEventListener('change', applyReduced)
        root.classList.remove('scroll-premium', 'reduce-motion')
      }
    }

    const main = document.querySelector('main')
    if (!main) {
      return () => motion.removeEventListener('change', applyReduced)
    }

    const marked = new WeakSet<Element>()
    const parallax: HTMLElement[] = []

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-inview')
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    )

    const bindReveals = () => {
      main.querySelectorAll('section, form').forEach((el) => {
        if (marked.has(el)) return
        marked.add(el)
        if (isAboveFold(el)) {
          el.classList.add('is-inview')
          return
        }
        el.classList.add('reveal-ready')
        io.observe(el)
      })
    }

    const bindParallax = () => {
      main.querySelectorAll('img').forEach((img) => {
        if (!(img instanceof HTMLElement) || marked.has(img)) return
        const wrap = img.parentElement
        if (!wrap) return
        if (wrap.getBoundingClientRect().height < 220) return
        marked.add(img)
        wrap.classList.add('scroll-parallax-wrap')
        img.classList.add('scroll-parallax-media')
        parallax.push(img)
      })
    }

    const bind = () => {
      bindReveals()
      bindParallax()
    }

    const start = window.requestAnimationFrame(bind)
    const late = window.setTimeout(bind, 350)

    let ticking = false
    const updateParallax = () => {
      ticking = false
      const vh = window.innerHeight
      for (const img of parallax) {
        const wrap = img.parentElement
        if (!wrap) continue
        const rect = wrap.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > vh) continue
        const progress = (vh - rect.top) / (vh + rect.height)
        const y = (progress - 0.5) * 20
        img.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(1.05)`
      }
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(updateParallax)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateParallax()

    let debounce: number | undefined
    const mo = new MutationObserver(() => {
      window.clearTimeout(debounce)
      debounce = window.setTimeout(bind, 80)
    })
    mo.observe(main, { childList: true, subtree: true })

    return () => {
      window.cancelAnimationFrame(start)
      window.clearTimeout(late)
      window.clearTimeout(debounce)
      window.removeEventListener('scroll', onScroll)
      motion.removeEventListener('change', applyReduced)
      io.disconnect()
      mo.disconnect()
    }
  }, [pathname])

  return null
}
