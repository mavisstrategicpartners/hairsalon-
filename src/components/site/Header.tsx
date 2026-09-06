'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Search, ShoppingBag, User } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { hairCollections } from '@/data/catalog'
import { SiteSearch } from '@/components/site/SiteSearch'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/collections', label: 'Collections' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  if (href === '/shop') return pathname === '/shop' || pathname.startsWith('/product/')
  if (href === '/collections') return pathname === '/collections' || pathname.startsWith('/shop/')
  return pathname === href
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [collectionsOpen, setCollectionsOpen] = useState(false)
  const pathname = usePathname()
  const hasHydrated = useCartStore((state) => state.hasHydrated)
  const totalItems = useCartStore((state) => state.getTotalItems())
  const bagCount = hasHydrated ? totalItems : 0

  const linkClass = (href: string) => {
    const active = isActive(pathname, href)
    const shop = href === '/shop'
    return `hover:text-[#c9a84c] ${
      shop ? (active ? 'text-[#c9a84c]' : 'text-white') : active ? 'text-[#c9a84c]' : 'text-[#d4d4d4]'
    } ${shop ? 'font-bold' : ''}`
  }

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black">
      <div className="mx-auto flex h-[4.75rem] max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Biana Hair home">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white font-script text-lg leading-none text-white">
            B
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block font-display text-[1.15rem] tracking-[0.28em] text-white">BIANA</span>
            <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.42em] text-[#c9a84c]">
              Hair
            </span>
          </span>
        </Link>

          <nav className="hidden items-center gap-5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] xl:flex xl:gap-7">
          {navLinks.map((l) =>
            l.href === '/collections' ? (
              <div
                key={l.href}
                className="relative"
                onMouseEnter={() => setCollectionsOpen(true)}
                onMouseLeave={() => setCollectionsOpen(false)}
              >
                <Link href="/collections" className={linkClass(l.href)}>
                  Collections
                </Link>
                {collectionsOpen ? (
                  <div className="absolute left-0 top-full z-20 min-w-[220px] border border-white/10 bg-black py-3">
                    {hairCollections.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/shop/${c.slug}`}
                        className="block px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#d4d4d4] hover:text-[#c9a84c]"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                {l.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="text-white hover:text-[#c9a84c]"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link href="/account" aria-label="Account" className="text-white hover:text-[#c9a84c]">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/cart" aria-label={`Bag (${bagCount})`} className="relative text-white hover:text-[#c9a84c]">
            <ShoppingBag className="h-5 w-5" />
            {bagCount > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center bg-[#c9a84c] px-1 font-mono text-[9px] text-black">
                {bagCount}
              </span>
            ) : null}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white xl:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-white/10 bg-black xl:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/10 px-6 py-4 font-display text-2xl italic tracking-tight text-white"
            >
              {l.label}
            </Link>
          ))}
          {hairCollections.map((c) => (
            <Link
              key={c.slug}
              href={`/shop/${c.slug}`}
              onClick={() => setOpen(false)}
              className="block border-b border-white/10 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#d4d4d4]"
            >
              {c.name}
            </Link>
          ))}
        </nav>
      ) : null}

      <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
