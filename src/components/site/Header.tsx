'use client'

import Link from 'next/link'
import Image from 'next/image'
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
    return `text-[#fff6ee]/80 hover:text-white ${active ? 'text-white' : ''}`
  }

  return (
    <header className="sticky top-0 z-30 bg-[#c45e14]">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Biana Hair home">
          <Image
            src="/images/logo-biana-hair-on-dark.png"
            alt="Biana Hair"
            width={280}
            height={72}
            priority
            className="h-10 w-auto max-h-10 object-contain object-left"
          />
        </Link>

          <nav className="hidden items-center gap-5 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-white xl:flex xl:gap-7">
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
                  <div className="absolute left-0 top-full z-20 min-w-[220px] bg-[#a84d10] py-3">
                    {hairCollections.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/shop/${c.slug}`}
                        className="block px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/80 hover:text-white"
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

        <div className="flex items-center gap-3.5">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="flex items-center text-white hover:text-white/80"
          >
            <Search className="h-4 w-4" strokeWidth={1.6} />
          </button>
          <Link href="/account" aria-label="Account" className="flex items-center text-white hover:text-white/80">
            <User className="h-4 w-4" strokeWidth={1.6} />
          </Link>
          <Link href="/cart" aria-label={`Bag (${bagCount})`} className="relative flex items-center text-white hover:text-white/80">
            <ShoppingBag className="h-4 w-4" strokeWidth={1.6} />
            {bagCount > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center bg-white px-1 font-mono text-[9px] text-[#c45e14]">
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
        <nav className="border-t border-white/15 bg-[#c45e14] xl:hidden">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/15 px-6 py-4 font-display text-2xl italic tracking-tight text-white"
            >
              {l.label}
            </Link>
          ))}
          {hairCollections.map((c) => (
            <Link
              key={c.slug}
              href={`/shop/${c.slug}`}
              onClick={() => setOpen(false)}
              className="block border-b border-white/15 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70"
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
