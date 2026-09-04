import Link from 'next/link'
import BrandLogo from './BrandLogo'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex rounded-full border border-white/10 bg-white/5 p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
            >
              <BrandLogo
                width={220}
                height={120}
                className="h-14 w-auto object-contain md:h-16"
              />
            </Link>
            <p className="text-gray-400 text-sm">
              Professional hair services at 46 Plein Street, Johannesburg. Your destination for beautiful hair.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#d4653f] transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="text-gray-400 hover:text-[#d4653f] transition-colors text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-[#d4653f] transition-colors text-sm">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#d4653f] transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#d4653f] transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-[#d4653f] transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-[#d4653f] transition-colors text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-[#d4653f] transition-colors text-sm">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-[#d4653f] transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/m.biana?igsi=dGI3NHNvZWJxNHhu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#d4653f] transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@bianamavuie?_r=1&_t=ZS-99ODccenNA7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#d4653f] transition-colors text-sm"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Biana Hair Salon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
