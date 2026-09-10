import Link from 'next/link'
import Image from 'next/image'

const shopLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/shop/bundles', label: 'Bundles' },
  { href: '/shop/closures-frontals', label: 'Closures & Frontals' },
  { href: '/collections', label: 'Collections' },
]

const studioLinks = [
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const accountLinks = [
  { href: '/cart', label: 'Bag' },
  { href: '/account', label: 'Account' },
  { href: '/', label: 'Home' },
]

export function Footer() {
  return (
    <footer className="bg-[#c45e14] text-white">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Image
            src="/images/logo-biana-hair-on-dark.png"
            alt="Biana Hair"
            width={280}
            height={72}
            className="h-12 w-auto max-w-[260px] object-contain"
          />
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/75">
            Johannesburg · By appointment
          </p>
          <p className="mt-6 max-w-[38ch] text-sm leading-relaxed text-white/80">
            Raw, single-donor hair and in-studio styling. Prices in Rand. Pay by EFT.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">Shop</p>
            <ul className="mt-4 space-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/80">
              {shopLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">Studio</p>
            <ul className="mt-4 space-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/80">
              {studioLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">Visit</p>
            <ul className="mt-4 space-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/80">
              {accountLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-6 py-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/65 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Biana HAIR (Pty) Ltd</span>
          <span>All prices in ZAR, VAT included</span>
        </div>
      </div>
    </footer>
  )
}
