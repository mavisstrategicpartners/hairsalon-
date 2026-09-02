'use client'

import { Product } from '@/lib/store'
import { Card, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ShoppingCart, Heart } from 'lucide-react'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Card 
      className="group overflow-hidden border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square bg-gradient-to-br from-[#d4653f]/10 to-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#d4653f]/20 to-white/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`h-28 w-28 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#d4653f] to-[#b85535] flex items-center justify-center transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
              <ShoppingCart className="h-14 w-14 text-white" />
            </div>
            <p className="text-xs text-[#d4653f] font-medium">{product.name.substring(0, 20)}...</p>
          </div>
        </div>
        
        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 h-8 w-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
        >
          <Heart 
            className={`h-4 w-4 ${isLiked ? 'fill-[#d4653f] text-[#d4653f]' : 'text-gray-400'}`} 
          />
        </button>

        {product.category === 'services' && (
          <Badge className="absolute top-3 left-3 bg-black/80 text-white" variant="secondary">
            Service
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-sm line-clamp-2 min-h-[2.5rem] text-gray-900 group-hover:text-[#d4653f] transition-colors">
            {product.name}
          </h3>
          {product.length && (
            <p className="text-xs text-[#d4653f] font-medium">Length: {product.length}</p>
          )}
          {product.type && (
            <Badge variant="outline" className="text-xs border-gray-300 text-[#d4653f] bg-[#d4653f]/10">
              {product.type}
            </Badge>
          )}
          <div className="flex items-center justify-between pt-2">
            <p className="text-lg font-bold text-[#d4653f]">
              R{product.price.toLocaleString()}
            </p>
            {product.category === 'wigs' && (
              <span className="text-xs text-gray-500">Premium Quality</span>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onAddToCart(product)}
          className="w-full bg-gradient-to-r from-[#d4653f] to-[#b85535] hover:from-[#b85535] hover:to-black text-white transition-all duration-300 hover:shadow-lg"
          variant="default"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
