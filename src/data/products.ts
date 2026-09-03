import { Product } from '@/lib/store'

export const products: Product[] = [
  {
    id: '7',
    name: 'Wig Installation - VOUCHER',
    price: 800,
    category: 'services',
    image: '/images/products/service-voucher.webp',
    description: 'Professional wig installation service voucher. Includes consultation and installation.',
    type: 'Installation'
  },
  {
    id: '8',
    name: '10" Wine Red Double Drawn Frontal Bob',
    price: 2800,
    category: 'wigs',
    image: '/images/products/wine-red-bob.webp',
    description: 'Stunning wine red double drawn frontal bob, 10 inches. Bold and beautiful.',
    length: '10"',
    type: 'Bob'
  },
  {
    id: '9',
    name: '18" Ombre Glueless Unit',
    price: 4200,
    category: 'wigs',
    image: '/images/products/ombre-glueless.webp',
    description: '18 inch ombre glueless unit. Easy to wear with beautiful color gradient.',
    length: '18"',
    type: 'Ombre'
  },
  {
    id: '10',
    name: '12" - 30" Bundles + Closure for Pondo',
    price: 3500,
    category: 'bundles',
    image: '/images/products/pondo-bundles.webp',
    description: 'Complete bundle set with closure for pondo style. Various lengths available.',
    length: '12"-30"',
    type: 'Pondo'
  },
  {
    id: '11',
    name: '8" Full-frontal Bob',
    price: 2200,
    category: 'wigs',
    image: '/images/products/full-frontal-bob-8.webp',
    description: 'Short and stylish 8 inch full frontal bob. Perfect for a chic look.',
    length: '8"',
    type: 'Bob'
  },
  {
    id: '12',
    name: '14" Goldie Unit',
    price: 3600,
    category: 'wigs',
    image: '/images/products/goldie-unit.webp',
    description: '14 inch Goldie unit with premium quality hair. Elegant and natural.',
    length: '14"',
    type: 'Goldie'
  },
  {
    id: '1',
    name: '12" Double Drawn Frontal Bob',
    price: 2500,
    category: 'wigs',
    image: '/images/products/double-drawn-bob-12.webp',
    description: 'Premium double drawn frontal bob wig, 12 inches length. Made with 100% human hair.',
    length: '12"',
    type: 'Bob'
  },
  {
    id: '2',
    name: '14" Vietnamese 5X5 Bob',
    price: 3200,
    category: 'wigs',
    image: '/images/products/vietnamese-bob.webp',
    description: 'Vietnamese hair 5x5 closure bob, 14 inches. High quality and natural look.',
    length: '14"',
    type: 'Bob'
  },
  {
    id: '3',
    name: '30" Waterwave Frontal Unit',
    price: 4500,
    category: 'wigs',
    image: '/images/products/waterwave-unit.webp',
    description: '30 inch waterwave frontal unit with beautiful waves. Premium quality.',
    length: '30"',
    type: 'Waterwave'
  },
  {
    id: '4',
    name: '20" Straight Full-frontal Unit',
    price: 3800,
    category: 'wigs',
    image: '/images/products/straight-full-frontal.webp',
    description: '20 inch straight full frontal unit. Sleek and sophisticated look.',
    length: '20"',
    type: 'Straight'
  },
  {
    id: '5',
    name: 'Straight Hair Bundle',
    price: 1200,
    category: 'bundles',
    image: '/images/products/straight-bundle.webp',
    description: '100% human hair straight bundle. Perfect for custom installations.',
    length: '18"',
    type: 'Straight'
  },
  {
    id: '6',
    name: 'Body Wave Bundle',
    price: 1300,
    category: 'bundles',
    image: '/images/products/body-wave-bundle.webp',
    description: 'Beautiful body wave bundle. Natural bounce and movement.',
    length: '20"',
    type: 'Body Wave'
  }
]

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'wigs', name: 'Wigs' },
  { id: 'bundles', name: 'Hair Bundles' },
  { id: 'services', name: 'Services' }
]
