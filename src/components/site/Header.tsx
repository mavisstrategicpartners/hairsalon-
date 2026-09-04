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
    <header className="sticky top-0 z-30 h-[4.75rem] border-b border-[#c9a84c]/20 bg-white">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#c9a84c] bg-[#faf7f2] font-script text-lg leading-none text-[#8a6820]">
            B
          </span>
          <span className="font-display text-2xl italic tracking-tight text-[#1a1208]">
            Biana
            <span className="ml-2 font-script text-[0.85rem] not-italic normal-case tracking-normal text-[#8a6820]">
              Hair
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-8 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#2c2010] md:flex">
            {links.map((l) => {
              const href = l.href === '/' ? '/' : isHome ? l.hash : l.href
              const active = pathname === l.href
              return (
                <Link
                  key={l.href}
                  href={href}
                  className={`transition-colors hover:text-[#8a6820] ${active ? 'text-[#8a6820]' : ''}`}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>
          <Link
            href="/cart"
            className="border-l border-[#c9a84c]/35 pl-8 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#2c2010] hover:text-[#8a6820]"
          >
            Bag ({bagCount})
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="text-[0.72rem] font-bold uppercase tracking-[0.22em] md:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-white md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href === '/' ? '/' : isHome ? l.hash : l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border px-6 py-4 font-display text-2xl italic tracking-tight"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
