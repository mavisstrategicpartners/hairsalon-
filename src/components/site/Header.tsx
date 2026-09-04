'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useCartStore } from '@/lib/store'

const links = [
  { href: '/', hash: '/', label: 'Home' },
  { href: '/shop', hash: '/#shop', label: 'Shop' },
  { href: '/about', hash: '/#about', label: 'About' },
  { href: '/contact', hash: '/#contact', label: 'Contact' },
] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const hasHydrated = useCartStore((state) => state.hasHydrated)
  const totalItems = useCartStore((state) => state.getTotalItems())
  const bagCount = hasHydrated ? totalItems : 0

  return (
    <header className="sticky top-0 z-30 h-[4.75rem] border-b border-[#c9a84c]/35 bg-[#070707]">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#c9a84c] bg-[#111111] font-script text-lg leading-none text-[#c9a84c]">
            B
          </span>
          <span className="font-display text-2xl italic tracking-tight text-[#f4ead8]">
            Biana
            <span className="ml-2 font-script text-[0.85rem] not-italic normal-case tracking-normal text-[#c9a84c]">
              Hair
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-8 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#f4ead8] md:flex">
            {links.map((l) => {
              const href = l.href === '/' ? '/' : isHome ? l.hash : l.href
              const active = pathname === l.href
              return (
                <Link
                  key={l.href}
                  href={href}
                  className={`transition-colors hover:text-[#c9a84c] ${active ? 'text-[#c9a84c]' : ''}`}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>
          <Link
            href="/cart"
            className="border-l border-[#c9a84c]/40 pl-8 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#f4ead8] hover:text-[#c9a84c]"
          >
            Bag ({bagCount})
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#f4ead8] md:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[#c9a84c]/35 bg-[#070707] md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href === '/' ? '/' : isHome ? l.hash : l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-[#c9a84c]/25 px-6 py-4 font-display text-2xl italic tracking-tight text-[#f4ead8]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
