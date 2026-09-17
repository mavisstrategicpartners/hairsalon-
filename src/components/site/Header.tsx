'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Search, ShoppingBag, User } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { shopNavCollections } from '@/data/catalog'
import { SiteSearch } from '@/components/site/SiteSearch'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
] as const

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  if (href === '/shop') {
    return pathname === '/shop' || pathname.startsWith('/shop/') || pathname.startsWith('/product/')
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const pathname = usePathname()
  const hasHydrated = useCartStore((state) => state.hasHydrated)
  const totalItems = useCartStore((state) => state.getTotalItems())
  const bagCount = hasHydrated ? totalItems : 0
  const shopCategories = shopNavCollections()

  const linkClass = (href: string) => {
    const active = isActive(pathname, href)
    return `text-[#fff6ee]/80 hover:text-white ${active ? 'text-white' : ''}`
  }

  const closeMenu = () => {
    setOpen(false)
    setShopOpen(false)
  }

  return (
    <header className="sticky top-0 z-30 bg-[#c45e14]">
      <div className="mx-auto flex h-[5.5rem] max-w-[1400px] items-center justify-between gap-4 px-5 sm:h-[6.5rem] sm:px-10 lg:px-16">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Biana Hair home">
          <Image
            src="/images/logo-biana-hair.png"
            alt="Biana Hair"
            width={555}
            height={545}
            priority
            className="h-[4.5rem] w-auto bg-transparent object-contain object-left sm:h-[5.5rem]"
          />
        </Link>

        <nav className="hidden items-center gap-6 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white lg:flex lg:gap-8">
          {navLinks.map((l) =>
            l.href === '/shop' ? (
              <div
                key={l.href}
                className="relative"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <Link href="/shop" className={linkClass(l.href)}>
                  Shop
                </Link>
                {shopOpen ? (
                  <div className="absolute left-0 top-full z-20 min-w-[220px] bg-[#a84d10] py-3">
                    <Link
                      href="/shop"
                      className="block px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/80 hover:text-white"
                    >
                      All Hair
                    </Link>
                    {shopCategories.map((c) => (
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
            className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white lg:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-white/15 bg-[#c45e14] lg:hidden">
          {navLinks.map((l) =>
            l.href === '/shop' ? (
              <div key={l.href}>
                <Link
                  href="/shop"
                  onClick={closeMenu}
                  className="block border-b border-white/15 px-6 py-4 font-display text-2xl italic tracking-tight text-white"
                >
                  Shop
                </Link>
                {shopCategories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/shop/${c.slug}`}
                    onClick={closeMenu}
                    className="block border-b border-white/15 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className="block border-b border-white/15 px-6 py-4 font-display text-2xl italic tracking-tight text-white"
              >
                {l.label}
              </Link>
            )
          )}
        </nav>
      ) : null}

      <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
