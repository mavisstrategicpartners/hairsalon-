import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="font-display text-3xl italic tracking-tight">
            <span className="text-foreground">Biana</span>
            <span className="ml-2 font-script text-base not-italic normal-case tracking-normal text-[#8a6820]">
              Hair
            </span>
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
            Cape Town · Johannesburg · By appointment
          </p>
          <p className="mt-6 max-w-[38ch] text-sm leading-relaxed text-muted-foreground">
            Raw, single-donor hair and in-studio styling. Prices shown in South African Rand, shipping
            nationwide.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <Link href="/shop" className="hover:text-foreground">
            Shop
          </Link>
          <Link href="/about" className="hover:text-foreground">
            About
          </Link>
          <Link href="/contact" className="hover:text-foreground">
            Contact
          </Link>
          <Link href="/cart" className="hover:text-foreground">
            Cart
          </Link>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-6 py-5 font-mono text-[10px] uppercase tracking-[0.16em] text-faint sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Biana HAIR (Pty) Ltd</span>
          <span>All prices in ZAR, VAT included</span>
        </div>
      </div>
    </footer>
  )
}
