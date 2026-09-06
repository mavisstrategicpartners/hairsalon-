import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="font-display text-3xl tracking-[0.2em]">BIANA</div>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#c9a84c]">Hair</p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
            Johannesburg · By appointment
          </p>
          <p className="mt-6 max-w-[38ch] text-sm leading-relaxed text-white/60">
            Raw, single-donor hair and in-studio styling. Prices in Rand. Pay by EFT.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/shop" className="hover:text-white">
            Shop
          </Link>
          <Link href="/collections" className="hover:text-white">
            Collections
          </Link>
          <Link href="/services" className="hover:text-white">
            Services
          </Link>
          <Link href="/gallery" className="hover:text-white">
            Gallery
          </Link>
          <Link href="/about" className="hover:text-white">
            About
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
          <Link href="/cart" className="hover:text-white">
            Bag
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-6 py-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Biana HAIR (Pty) Ltd</span>
          <span>All prices in ZAR, VAT included</span>
        </div>
      </div>
    </footer>
  )
}
