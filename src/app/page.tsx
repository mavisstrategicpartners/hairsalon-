'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import { useCartStore } from '@/lib/store'
import Link from 'next/link'
import { Sparkles, Truck, Shield, Heart, Star, Crown } from 'lucide-react'

export default function Home() {
  const addItem = useCartStore((state) => state.addItem)
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#d4653f] via-[#b85535] to-black text-white py-24 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Crown className="h-8 w-8 text-yellow-300" />
              <span className="text-sm md:text-base font-medium tracking-widest uppercase text-white/90">
                Premium Hair Services
              </span>
              <Crown className="h-8 w-8 text-yellow-300" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Discover Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
