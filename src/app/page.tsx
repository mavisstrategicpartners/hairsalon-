'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import BrandLogo from '@/components/BrandLogo'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import { useCartStore } from '@/lib/store'
import Link from 'next/link'
import GalleryShowcase from '@/components/GalleryShowcase'
import { Sparkles, Truck, Shield, Heart, Star, Crown } from 'lucide-react'

export default function Home() {
  const addItem = useCartStore((state) => state.addItem)
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(0,0,0,0.28),_transparent_32%),linear-gradient(135deg,_#d96d4a_0%,_#c55f3d_32%,_#9a3d2d_100%)] text-white py-24 md:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,_rgba(255,255,255,0.18),_transparent_18%),radial-gradient(circle_at_85%_15%,_rgba(0,0,0,0.20),_transparent_22%)]"></div>
        <div className="absolute inset-0 opacity-80 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:54px_54px]"></div>
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-10 grayscale-[0.2]">
          <BrandLogo
            width={1100}
            height={700}
            className="h-[70vh] w-auto max-w-[90%] object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.22)]"
          />
        </div>
        <div className="absolute -right-16 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-black/10 blur-3xl"></div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <Crown className="h-7 w-7 text-[#f9d778] drop-shadow-[0_0_12px_rgba(255,223,127,0.8)]" />
              <span className="text-sm font-medium tracking-[0.28em] text-[#f6efe7]/95 uppercase md:text-base">
                Premium Hair Services
              </span>
              <Crown className="h-7 w-7 text-[#f9d778] drop-shadow-[0_0_12px_rgba(255,223,127,0.8)]" />
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-[0.9] tracking-[-0.05em] text-[#f8f0ea] md:text-7xl">
              Discover Your
              <span className="mt-2 block bg-gradient-to-r from-[#fce5ca] via-[#f7e9d8] to-[#f3d9b2] bg-clip-text text-transparent drop-shadow-[0_6px_24px_rgba(0,0,0,0.18)]">
                Perfect Look
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90 leading-relaxed max-w-2xl mx-auto">
              Professional hair services at Biana Hair Salon. Your destination for beautiful hair in Johannesburg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" className="bg-white text-[#d4653f] hover:bg-[#d4653f]/10 hover:scale-105 transition-all shadow-xl text-lg px-8 py-6 rounded-full">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Shop Collection
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 hover:scale-105 transition-all text-lg px-8 py-6 rounded-full">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Work */}
      <section id="gallery" className="scroll-mt-24 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.28em] text-[#d4653f]">
              Portfolio
            </p>
            <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
              Our Work
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              A few looks from recent installs, units, and bundles. See the full gallery for more.
            </p>
          </div>
          <GalleryShowcase preview />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#d4653f]" />
              <span className="text-sm font-medium">100% Human Hair</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-[#d4653f]" />
              <span className="text-sm font-medium">Nationwide Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-[#d4653f]" />
              <span className="text-sm font-medium">500+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-[#d4653f]" />
              <span className="text-sm font-medium">5-Star Quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-[#d4653f]/10 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Why Women Choose Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We're committed to helping you look and feel your absolute best with premium quality products.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-gray-200 hover:shadow-xl transition-shadow group">
              <CardContent className="pt-8 pb-6">
                <div className="h-16 w-16 mx-auto mb-4 bg-gradient-to-br from-[#d4653f] to-[#b85535] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-lg text-gray-900">Free Shipping</h3>
                <p className="text-sm text-gray-600">Complimentary delivery on orders over R1000</p>
              </CardContent>
            </Card>
            <Card className="text-center border-gray-200 hover:shadow-xl transition-shadow group">
              <CardContent className="pt-8 pb-6">
                <div className="h-16 w-16 mx-auto mb-4 bg-gradient-to-br from-[#d4653f] to-[#b85535] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-lg text-gray-900">Quality Guaranteed</h3>
                <p className="text-sm text-gray-600">100% premium human hair, ethically sourced</p>
              </CardContent>
            </Card>
            <Card className="text-center border-gray-200 hover:shadow-xl transition-shadow group">
              <CardContent className="pt-8 pb-6">
                <div className="h-16 w-16 mx-auto mb-4 bg-gradient-to-br from-[#d4653f] to-[#b85535] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-lg text-gray-900">Expert Support</h3>
                <p className="text-sm text-gray-600">Personalized guidance from hair specialists</p>
              </CardContent>
            </Card>
            <Card className="text-center border-gray-200 hover:shadow-xl transition-shadow group">
              <CardContent className="pt-8 pb-6">
                <div className="h-16 w-16 mx-auto mb-4 bg-gradient-to-br from-[#d4653f] to-[#b85535] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-lg text-gray-900">Premium Quality</h3>
                <p className="text-sm text-gray-600">Hand-selected products for excellence</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Trending Now
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our most loved wigs and hair extensions, handpicked for their exceptional quality and style.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addItem}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/shop">
              <Button size="lg" variant="outline" className="border-2 border-[#d4653f] text-[#d4653f] hover:bg-[#d4653f] hover:text-white transition-all text-lg px-8 py-6 rounded-full">
                Explore Full Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-[#d4653f]/10 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Join thousands of satisfied women who have transformed their look with Biana Hair Salon.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border-gray-200">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "Absolutely love my new hair! The quality is amazing and it looks so natural. 
                  Biana Hair Salon has become my go-to for all my hair needs."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#d4653f] to-[#b85535]"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Thandi M.</p>
                    <p className="text-sm text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-gray-200">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "The customer service is exceptional! They helped me find the perfect match 
                  for my style. Shipping was fast and the packaging was beautiful."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Sarah K.</p>
                    <p className="text-sm text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-gray-200">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "I've tried many hair vendors, but Bianca's Hair stands out. 
                  The quality is consistent, prices are fair, and the results speak for themselves."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-rose-400 to-red-400"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Lerato D.</p>
                    <p className="text-sm text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#d4653f] via-[#b85535] to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <Crown className="h-16 w-16 mx-auto mb-6 text-yellow-300" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Feel Beautiful?
            </h2>
            <p className="text-xl mb-10 text-white/90 leading-relaxed">
              Join our community of confident women who have discovered their perfect look. 
              Free shipping on orders over R1000, plus exclusive member benefits.
            </p>
            <Link href="/shop">
              <Button size="lg" className="bg-white text-[#d4653f] hover:bg-[#d4653f]/10 hover:scale-105 transition-all shadow-2xl text-xl px-12 py-7 rounded-full">
                <Sparkles className="h-6 w-6 mr-3" />
                Start Your Transformation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
