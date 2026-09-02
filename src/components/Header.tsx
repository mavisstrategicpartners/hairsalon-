'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useCartStore } from '@/lib/store'
import { useState } from 'react'
import BrandLogo from './BrandLogo'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const hasHydrated = useCartStore((state) => state.hasHydrated)
  const totalItems = useCartStore((state) => state.getTotalItems())

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e8d7cd] bg-[#f7f1eb] shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center rounded-full border border-[#d4653f]/20 bg-gradient-to-r from-[#fffbf8] via-[#f7efe9] to-[#f1e5dc] p-1.5 shadow-sm transition-transform hover:scale-[1.01]"
          >
            <BrandLogo
              priority
              width={220}
              height={120}
              className="h-14 w-auto object-contain md:h-16"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            <Link
              href="/"
              className="text-sm font-medium text-[#2b1d1a] transition-colors hover:text-[#d4653f]"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-sm font-medium text-[#2b1d1a] transition-colors hover:text-[#d4653f]"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-[#2b1d1a] transition-colors hover:text-[#d4653f]"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-[#2b1d1a] transition-colors hover:text-[#d4653f]"
            >
              Contact
            </Link>
          </nav>

          {/* Cart Button */}
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {hasHydrated && totalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-[#d4653f] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-sm font-medium text-gray-700 hover:text-[#d4653f] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-gray-700 hover:text-[#d4653f] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-gray-700 hover:text-[#d4653f] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
