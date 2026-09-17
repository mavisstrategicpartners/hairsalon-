import type { ProductCategory } from '@/lib/supabase/types'
import { priceListHairProducts } from '@/data/price-list-hair'

/**
 * `category` covers the Supabase product categories plus `Services`, which is
 * frontend-only content and is never stored in the products table.
 */
export type Product = {
  slug: string
  name: string
  price: number
  category: ProductCategory | 'Services'
  tag: string
  kind: 'product' | 'service'
  image: string
  /** Extra catalogue photos (max 3 including `image`). */
  images?: string[]
  /** When true, Shop shows an “Image unavailable” state instead of a photograph. */
  imageUnavailable?: boolean
  description: string
  length?: string
  lengths?: string[]
  /** When set, checkout uses this map instead of the default `price`. */
  lengthPrices?: { length: string; price: number }[]
  /** Price-list currency. USD items keep the listed wholesale figures. */
  currency?: 'ZAR' | 'USD'
  specs: { label: string; value: string }[]
}

export const IMAGE_UNAVAILABLE = '/images/products/image-unavailable.svg'

export const formatZar = (value: number) => `R${value.toLocaleString('en-US')}`

export function formatMoney(value: number, currency: Product['currency'] = 'ZAR') {
  if (currency === 'USD') return `$${value.toFixed(1)}`
  return formatZar(value)
}

export function formatProductPrice(product: Pick<Product, 'price' | 'currency'>, amount?: number) {
  return formatMoney(amount ?? product.price, product.currency)
}

export function priceForSelection(product: Product, length?: string) {
  if (product.lengthPrices && product.lengthPrices.length > 0) {
    const match = length
      ? product.lengthPrices.find((entry) => entry.length === length)
      : undefined
    return (match ?? product.lengthPrices[0]).price
  }
  return product.price
}

export const products: Product[] = [
  {
    slug: 'wig-installation-voucher',
    name: 'Wig Installation - VOUCHER',
    price: 800,
    category: 'Services',
    tag: 'Installation',
    kind: 'service',
    image: '/images/products/service-voucher.webp',
    description:
      'Professional wig installation in studio. Includes consultation and install. Redeem at 46 Plein Street.',
    specs: [
      { label: 'Duration', value: '90 min' },
      { label: 'Redeem', value: 'Johannesburg studio' },
      { label: 'Includes', value: 'Consultation + install' },
      { label: 'Valid', value: '12 months' },
    ],
  },
  ...priceListHairProducts,
  {
    slug: 'precision-cut-voucher',
    name: 'Precision Cut & Finish',
    price: 950,
    category: 'Services',
    tag: 'Cut',
    kind: 'service',
    image: '/images/gallery/stylist-portrait.jpg',
    description: 'Dry cut, shaped to your face and density. 75 minutes in studio.',
    specs: [
      { label: 'Duration', value: '75 min' },
      { label: 'Redeem', value: 'Johannesburg studio' },
    ],
  },
  {
    slug: 'bundle-installation-voucher',
    name: 'Bundle Installation',
    price: 2400,
    category: 'Services',
    tag: 'Install',
    kind: 'service',
    image: '/images/gallery/salon-studio-display.jpg',
    description: 'Sew-in with closure or frontal melt. About 3 hours in studio.',
    specs: [
      { label: 'Duration', value: '3 hrs' },
      { label: 'Redeem', value: 'Johannesburg studio' },
    ],
  },
  {
    slug: 'colour-gloss-voucher',
    name: 'Colour & Gloss',
    price: 1800,
    category: 'Services',
    tag: 'Colour',
    kind: 'service',
    image: '/images/gallery/blonde-balayage-unit.jpg',
    description: 'Custom colour on your hair or your unit. 2.5 hours.',
    specs: [
      { label: 'Duration', value: '2.5 hrs' },
      { label: 'Redeem', value: 'Johannesburg studio' },
    ],
  },
  {
    slug: 'wig-revamp-voucher',
    name: 'Wig Revamp',
    price: 1250,
    category: 'Services',
    tag: 'Revamp',
    kind: 'service',
    image: '/images/gallery/curly-install-client.jpg',
    description: 'Wash, detangle, re-pluck and restyle an existing unit. 2 hours.',
    specs: [
      { label: 'Duration', value: '2 hrs' },
      { label: 'Redeem', value: 'Johannesburg studio' },
    ],
  },
]

export const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Bundles', slug: 'bundles' },
  { name: 'Wigs', slug: 'wigs' },
  { name: 'Services', slug: 'services' },
] as const

export const testimonials = [
  {
    quote: 'The bundles arrived sealed and flawless. My stylist could not believe the shine.',
    author: 'Lerato M.',
    city: 'Soweto',
  },
  {
    quote: 'Booked online, walked in like a regular. It felt like a private salon.',
    author: 'Naledi K.',
    city: 'Midrand',
  },
  {
    quote: "The closure melts into my scalp. Best install I've had in years.",
    author: 'Amara O.',
    city: 'Durban',
  },
]

/** Fallback catalogue, used only while Supabase credentials are absent. */
export const hairProducts = products.filter((p) => p.kind === 'product')
/** Studio services stay static frontend content — never rows in `products`. */
export const serviceProducts = products.filter((p) => p.kind === 'service')

export type HairCollection = {
  slug: string
  name: string
  description: string
  image: string
  /** When false, the category stays available by URL but is not listed in Shop nav. */
  inNav?: boolean
}

export const hairCollections: HairCollection[] = [
  {
    slug: 'wigs',
    name: 'Wigs',
    description: 'Ready-to-wear units — glueless, frontal and full-frontal, finished for everyday wear.',
    image: '/images/products/ombre-glueless.webp',
  },
  {
    slug: 'bundles',
    name: 'Bundles',
    description: 'Wefts sold as singles. Three make a full install; mix lengths for a layered set.',
    image: '/images/products/body-wave-bundle.webp',
  },
  {
    slug: 'closures-frontals',
    name: 'Closures & Frontals',
    description: 'Closures, frontals and pondo sets — melt-ready hairlines to finish an install.',
    image: '/images/products/weave-closure-set.png',
  },
  {
    slug: 'straight-hair',
    name: 'Straight Hair',
    description: 'Sleek single-donor straight — full-frontal units and wefts for a pulled-back finish.',
    image: '/images/products/straight-full-frontal.webp',
  },
  {
    slug: 'body-wave',
    name: 'Body Wave',
    description: 'Body wave wefts with a soft S-pattern and natural bounce.',
    image: '/images/products/brazilian-body-wave-1.jpg',
  },
  {
    slug: 'curly-hair',
    name: 'Curly Hair',
    description: 'Curls and water wave — Italian curls, loose curl, deep curl and kinky deep.',
    image: '/images/products/waterwave-unit.webp',
  },
  {
    slug: 'other-hair',
    name: 'Other Hair',
    description: 'Hair that is not listed under wigs, straight, body wave or curly.',
    image: '/images/products/raw-hair-20.jpg',
  },
  {
    slug: 'bobs',
    name: 'Bobs',
    description: 'Short, sculpted bobs with dense ends — from wine red to a clean Vietnamese 5x5.',
    image: '/images/products/wine-red-bob.webp',
    inNav: false,
  },
]

export function getHairCollection(slug: string) {
  return hairCollections.find((c) => c.slug === slug)
}

/**
 * Collections prefer the real Supabase category. Straight and curly describe a
 * texture rather than a category, so those keep the original keyword match.
 */
export function productMatchesCollection(product: Product, slug: string) {
  if (product.kind !== 'product') return false
  const hay = `${product.name} ${product.tag} ${product.description} ${product.category}`.toLowerCase()
  switch (slug) {
    case 'wigs':
      // Bobs are finished units too, so they stay listed under Wigs.
      return product.category === 'Wigs' || product.category === 'Bobs'
    case 'bobs':
      return product.category === 'Bobs' || hay.includes('bob')
    case 'straight-hair':
      return hay.includes('straight')
    case 'body-wave':
      return /body\s*wave/.test(hay)
    case 'curly-hair':
      return /curl|kinky deep|water\s*wave/.test(hay)
    case 'bundles':
      return product.category === 'Bundles'
    case 'closures-frontals':
      return (
        product.category === 'Closures' ||
        product.category === 'Frontals' ||
        /closure|frontal|pondo/.test(hay)
      )
    case 'other-hair':
      return !['wigs', 'closures-frontals', 'straight-hair', 'body-wave', 'curly-hair'].some((key) =>
        productMatchesCollection(product, key)
      )
    default:
      return false
  }
}

export function getCollectionProducts(slug: string, list: Product[] = hairProducts) {
  return list.filter((p) => productMatchesCollection(p, slug))
}

export function shopNavCollections(list: Product[] = hairProducts) {
  return hairCollections.filter(
    (collection) =>
      collection.inNav !== false && list.some((product) => productMatchesCollection(product, collection.slug))
  )
}

export function primaryCollectionSlug(product: Product) {
  const order = [
    'wigs',
    'closures-frontals',
    'bundles',
    'straight-hair',
    'body-wave',
    'curly-hair',
    'other-hair',
    'bobs',
  ]
  return order.find((slug) => productMatchesCollection(product, slug))
}

export const hairCareCopy =
  'Wash in cool water with a sulphate-free shampoo. Detangle from the ends up. Air-dry on a stand. Heat-style on a medium setting only, and store in a silk bag when not in use.'

export const hairShippingCopy =
  'Pay by EFT at checkout. We dispatch from Johannesburg in 1–2 working days. Free courier on orders over R2 500. Standard delivery is 2–4 working days nationwide.'

export const serviceRedeemCopy =
  'Vouchers are valid for 12 months. Redeem at 46 Plein Street, Johannesburg. Bring your order confirmation. Book ahead so we can hold your chair.'

export const instagramUrl = 'https://www.instagram.com/m.biana?igsi=dGI3NHNvZWJxNHhu'

export function serviceDuration(product: Product) {
  return product.specs.find((s) => s.label === 'Duration')?.value ?? 'By appointment'
}

export const workGallery = [
  { src: '/images/gallery/curly-install-client.jpg', alt: 'Curly install' },
  { src: '/images/gallery/blonde-balayage-unit.jpg', alt: 'Blonde balayage unit' },
  { src: '/images/gallery/straight-lace-front-unit.jpg', alt: 'Straight lace front' },
  { src: '/images/gallery/kinky-curly-branded.jpg', alt: 'Kinky curly hair' },
  { src: '/images/gallery/body-wave-display.jpg', alt: 'Body wave display' },
  { src: '/images/gallery/deep-wave-frontal-set.jpg', alt: 'Deep wave frontal set' },
  { src: '/images/gallery/straight-bundles-closure.jpg', alt: 'Straight bundles and closure' },
  { src: '/biana/gallery-2.jpg', alt: 'Studio work' },
  { src: '/biana/gallery-3.jpg', alt: 'Finished unit' },
  { src: '/biana/gallery-4.jpg', alt: 'Client hair' },
  { src: '/images/gallery/ombre-bundles-closures.jpg', alt: 'Ombre bundles' },
  { src: '/images/about-work.png', alt: 'Units in studio' },
]

/** Homepage “In the studio” — unique 11 Sep mannequin / studio photographs. */
export type StudioMedia = {
  src: string
  alt: string
  kind?: 'image' | 'video'
}

export const studioGallery: StudioMedia[] = [
  { src: '/images/gallery/sep11/217.jpg', alt: 'Hair photographed 11 September 2026' },
  { src: '/images/gallery/sep11/218.jpg', alt: 'Hair photographed 11 September 2026' },
  { src: '/images/gallery/sep11/219.jpg', alt: 'Hair photographed 11 September 2026' },
  { src: '/images/gallery/sep11/221.jpg', alt: 'Hair photographed 11 September 2026' },
  { src: '/images/gallery/sep11/222.jpg', alt: 'Hair photographed 11 September 2026' },
  { src: '/images/gallery/sep11/223.jpg', alt: 'Hair photographed 11 September 2026' },
  { src: '/images/gallery/sep11/225.jpg', alt: 'Hair photographed 11 September 2026' },
  { src: '/videos/sep11/065.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/067.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/185.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/186.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/187.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/188.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/189.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/190.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/191.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/192.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/193.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/194.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/195.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/196.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/197.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/198.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/199.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/200.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/201.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/202.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/203.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/204.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/205.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/206.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/207.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/208.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/209.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/210.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/211.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/212.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/213.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/214.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
  { src: '/videos/sep11/224.mp4', alt: 'Studio video, 11 September 2026', kind: 'video' },
]

/** Gallery page — existing photos plus remaining unique 11 Sep photographs (exact file duplicates only removed). */
export const salonGallery: { src: string; alt: string; href?: string }[] = [
  { src: '/images/gallery/sep11/063.jpg', alt: 'Body WeaveBrazilian  32 inch( 3 bundles) R6.7k', href: '/product/brazilian-body-wave' },
  { src: '/images/gallery/sep11/066.jpg', alt: 'Body WeaveBrazilian  32 inch( 3 bundles) R6.7k', href: '/product/brazilian-body-wave' },
  { src: '/images/gallery/sep11/068.jpg', alt: 'Body WeaveBrazilian  32 inch( 3 bundles) R6.7k', href: '/product/brazilian-body-wave' },
  { src: '/images/gallery/sep11/070.jpg', alt: 'Body WeaveBrazilian  32 inch( 3 bundles) R6.7k', href: '/product/brazilian-body-wave' },
  { src: '/images/gallery/sep11/072.jpg', alt: 'Body WeaveBrazilian  32 inch( 3 bundles) R6.7k', href: '/product/brazilian-body-wave' },
  { src: '/images/gallery/sep11/073.jpg', alt: 'Body WeaveBrazilian  32 inch( 3 bundles) R6.7k', href: '/product/brazilian-body-wave' },
  { src: '/images/gallery/sep11/075.jpg', alt: 'Body WeaveBrazilian  32 inch( 3 bundles) R6.7k', href: '/product/brazilian-body-wave' },
  { src: '/images/gallery/sep11/076.jpg', alt: 'Body WeaveBrazilian  32 inch( 3 bundles) R6.7k', href: '/product/brazilian-body-wave' },
  { src: '/images/gallery/sep11/079.jpg', alt: 'Body WeaveBrazilian  32 inch( 3 bundles) R6.7k', href: '/product/brazilian-body-wave' },
  { src: '/images/gallery/sep11/080.jpg', alt: 'Body WeaveBrazilian  32 inch( 3 bundles) R6.7k', href: '/product/brazilian-body-wave' },
  { src: '/images/gallery/sep11/082.jpg', alt: '28 inch Brazilian Body Wave', href: '/product/brazilian-body-wave' },
  { src: '/images/gallery/sep11/084.jpg', alt: '2 tone Brazilian Body Wave', href: '/product/brazilian-body-wave-2tone' },
  { src: '/images/gallery/sep11/086.jpg', alt: 'Brazilian Body Wave Microbonding Microlink 22inch', href: '/product/brazilian-body-wave-micro-22' },
  { src: '/images/gallery/sep11/087.jpg', alt: 'Brazilian Body Wave Microbonding Microlink 22inch', href: '/product/brazilian-body-wave-micro-22' },
  { src: '/images/gallery/sep11/088.jpg', alt: 'Brazilian straight microbonding microlink 26 inch', href: '/product/brazilian-straight-micro-26' },
  { src: '/images/gallery/sep11/089.jpg', alt: 'Brazilian straight microbonding microlink 26 inch', href: '/product/brazilian-straight-micro-26' },
  { src: '/images/gallery/sep11/090.jpg', alt: 'Malaysian loose curl water wig 30 inches', href: '/product/malaysian-loose-curl-water-wig-30' },
  { src: '/images/gallery/sep11/092.jpg', alt: 'Malaysian Deep Curl 32 inch', href: '/product/malaysian-deep-curl' },
  { src: '/images/gallery/sep11/093.jpg', alt: 'Malaysian Deep Curl 32 inch', href: '/product/malaysian-deep-curl' },
  { src: '/images/gallery/sep11/094.jpg', alt: 'Malaysian Deep Curl 30 inch', href: '/product/malaysian-deep-curl' },
  { src: '/images/gallery/sep11/097.jpg', alt: 'Malaysian Loose Curl 26 inches', href: '/product/malaysian-loose-curl-26' },
  { src: '/images/gallery/sep11/100.jpg', alt: 'Malaysian Loose Curl 26 inches', href: '/product/malaysian-loose-curl-26' },
  { src: '/images/gallery/sep11/102.jpg', alt: 'Malaysian Loose Curl Microlink 24 inch', href: '/product/malaysian-loose-curl-micro-24' },
  { src: '/images/gallery/sep11/104.jpg', alt: 'Malaysian Loose Curl Microlink 24 inch', href: '/product/malaysian-loose-curl-micro-24' },
  { src: '/images/gallery/sep11/105.jpg', alt: 'Italian Curls 18 inch', href: '/product/italian-curls' },
  { src: '/images/gallery/sep11/108.jpg', alt: 'Italian Curls 18 inch', href: '/product/italian-curls' },
  { src: '/images/gallery/sep11/109.jpg', alt: 'Italian Curls 10 inch', href: '/product/italian-curls' },
  { src: '/images/gallery/sep11/110.jpg', alt: 'Italian Curls 10 inch', href: '/product/italian-curls' },
  { src: '/images/gallery/sep11/111.jpg', alt: 'Italian Curls 10 inch', href: '/product/italian-curls' },
  { src: '/images/gallery/sep11/113.jpg', alt: 'Italian Curls 30 inch', href: '/product/italian-curls' },
  { src: '/images/gallery/sep11/115.jpg', alt: 'Italian Curls 30 inch', href: '/product/italian-curls' },
  { src: '/images/gallery/sep11/116.jpg', alt: 'Italian Curls 24 inches', href: '/product/italian-curls' },
  { src: '/images/gallery/sep11/120.jpg', alt: 'Italian Curls Microlink Microbonding 28 inches', href: '/product/italian-curls-micro-28' },
  { src: '/images/gallery/sep11/123.jpg', alt: 'Italian Curls Microlink Microbonding 28 inches', href: '/product/italian-curls-micro-28' },
  { src: '/images/gallery/sep11/126.jpg', alt: 'Raw hair 50 inches' },
  { src: '/images/gallery/sep11/128.jpg', alt: 'Raw hair 50 inches' },
  { src: '/images/gallery/sep11/129.jpg', alt: 'Raw hair 50 inches' },
  { src: '/images/gallery/sep11/130.jpg', alt: 'Raw hair 20 inches', href: '/product/raw-hair-20' },
  { src: '/images/gallery/sep11/132.jpg', alt: 'Raw hair 20 inches', href: '/product/raw-hair-20' },
  { src: '/images/gallery/sep11/135.jpg', alt: 'Raw Colour Meroon 20inch', href: '/product/raw-colour-maroon-20' },
  { src: '/images/gallery/sep11/137.jpg', alt: 'Raw Colour Meroon 20inch', href: '/product/raw-colour-maroon-20' },
  { src: '/images/gallery/sep11/138.jpg', alt: 'Raw Colour Meroon 20inch', href: '/product/raw-colour-maroon-20' },
  { src: '/images/gallery/sep11/139.jpg', alt: 'Raw Water Wave Microbonding Colour Platinum 28 inches', href: '/product/raw-water-wave-platinum-28' },
  { src: '/images/gallery/sep11/141.jpg', alt: 'Raw Water Wave Microbonding Colour Platinum 28 inches', href: '/product/raw-water-wave-platinum-28' },
  { src: '/images/gallery/sep11/142.jpg', alt: 'Raw Water Wave Microbonding Colour Platinum 28 inches', href: '/product/raw-water-wave-platinum-28' },
  { src: '/images/gallery/sep11/144.jpg', alt: 'Raw Water Wave Microbonding Colour Platinum 28 inches', href: '/product/raw-water-wave-platinum-28' },
  { src: '/images/gallery/sep11/145.jpg', alt: 'Bouncy Body Wave 30 inches', href: '/product/bouncy-body-wave-30' },
  { src: '/images/gallery/sep11/147.jpg', alt: 'Bouncy Body Wave 30 inches', href: '/product/bouncy-body-wave-30' },
  { src: '/images/gallery/sep11/148.jpg', alt: 'Bounce Curls 16 inch', href: '/product/bounce-curls-16' },
  { src: '/images/gallery/sep11/150.jpg', alt: 'Bounce Curls 16 inch', href: '/product/bounce-curls-16' },
  { src: '/images/gallery/sep11/151.jpg', alt: 'Raw Kinky Straight 14 inches', href: '/product/raw-kinky-straight-14' },
  { src: '/images/gallery/sep11/152.jpg', alt: 'Raw Kinky Straight 14 inches', href: '/product/raw-kinky-straight-14' },
  { src: '/images/gallery/sep11/154.jpg', alt: 'Raw Kinky Straight 14 inches', href: '/product/raw-kinky-straight-14' },
  { src: '/images/gallery/sep11/157.jpg', alt: 'Kinky Straight Microbonding and Microlink 22inch', href: '/product/kinky-straight-micro-22' },
  { src: '/images/gallery/sep11/158.jpg', alt: 'Kinky Straight Microbonding and Microlink 22inch', href: '/product/kinky-straight-micro-22' },
  { src: '/images/gallery/sep11/159.jpg', alt: 'Kinky Straight Microbonding and Microlink 22inch', href: '/product/kinky-straight-micro-22' },
  { src: '/images/gallery/sep11/165.jpg', alt: 'Brazilian Water Wave Crochet 24 inches', href: '/product/brazilian-water-wave-crochet-24' },
  { src: '/images/gallery/sep11/166.jpg', alt: 'Brazilian Water Wave Crochet 24 inches', href: '/product/brazilian-water-wave-crochet-24' },
  { src: '/images/gallery/sep11/168.jpg', alt: 'Brazilian Water Wave Crochet 24 inches', href: '/product/brazilian-water-wave-crochet-24' },
  { src: '/images/gallery/sep11/170.jpg', alt: 'Hair photographed 11 September 2026' },
  { src: '/images/gallery/sep11/171.jpg', alt: 'Hair photographed 11 September 2026' },
  { src: '/images/gallery/sep11/175.jpg', alt: 'Hair photographed 11 September 2026' },
  { src: '/images/gallery/sep11/178.jpg', alt: 'Brazilian Kinky Deep 22 inches', href: '/product/brazilian-kinky-deep-22' },
  { src: '/images/gallery/sep11/179.jpg', alt: 'Brazilian Kinky Deep 22 inches', href: '/product/brazilian-kinky-deep-22' },
  { src: '/images/gallery/sep11/180.jpg', alt: 'Brazilian Kinky Deep 22 inches', href: '/product/brazilian-kinky-deep-22' },
  { src: '/images/gallery/sep11/181.jpg', alt: 'Brazilian Kinky Deep 22 inches', href: '/product/brazilian-kinky-deep-22' },
  { src: '/images/gallery/sep11/183.jpg', alt: 'Brazilian Kinky Deep 22 inches', href: '/product/brazilian-kinky-deep-22' },
  { src: '/images/gallery/sep11/217.jpg', alt: 'Hair photographed 11 September 2026' },
  { src: '/images/gallery/sep11/218.jpg', alt: 'Hair photographed 11 September 2026' },
  { src: '/images/gallery/sep11/219.jpg', alt: 'Hair photographed 11 September 2026' },
  { src: '/images/gallery/sep11/221.jpg', alt: 'Hair photographed 11 September 2026' },
  { src: '/images/gallery/sep11/222.jpg', alt: 'Hair photographed 11 September 2026' },
  { src: '/images/gallery/sep11/223.jpg', alt: 'Hair photographed 11 September 2026' },
  { src: '/images/gallery/sep11/064.jpg', alt: 'Body WeaveBrazilian  32 inch( 3 bundles) R6.7k', href: '/product/brazilian-body-wave' },
  { src: '/images/gallery/sep11/069.jpg', alt: 'Body WeaveBrazilian  32 inch( 3 bundles) R6.7k', href: '/product/brazilian-body-wave' },
  { src: '/images/gallery/sep11/071.jpg', alt: 'Body WeaveBrazilian  32 inch( 3 bundles) R6.7k', href: '/product/brazilian-body-wave' },
  { src: '/images/gallery/sep11/074.jpg', alt: 'Body WeaveBrazilian  32 inch( 3 bundles) R6.7k', href: '/product/brazilian-body-wave' },
  { src: '/images/gallery/sep11/077.jpg', alt: 'Body WeaveBrazilian  32 inch( 3 bundles) R6.7k', href: '/product/brazilian-body-wave' },
  { src: '/images/gallery/sep11/078.jpg', alt: 'Body WeaveBrazilian  32 inch( 3 bundles) R6.7k', href: '/product/brazilian-body-wave' },
  { src: '/images/gallery/sep11/083.jpg', alt: '28 inch Brazilian Body Wave', href: '/product/brazilian-body-wave' },
  { src: '/images/gallery/sep11/085.jpg', alt: '2 tone Brazilian Body Wave', href: '/product/brazilian-body-wave-2tone' },
  { src: '/images/gallery/sep11/091.jpg', alt: 'Malaysian loose curl water wig 30 inches', href: '/product/malaysian-loose-curl-water-wig-30' },
  { src: '/images/gallery/sep11/095.jpg', alt: 'Malaysian Deep Curl 30 inch', href: '/product/malaysian-deep-curl' },
  { src: '/images/gallery/sep11/096.jpg', alt: 'Malaysian Deep Curl 30 inch', href: '/product/malaysian-deep-curl' },
  { src: '/images/gallery/sep11/098.jpg', alt: 'Malaysian Loose Curl 26 inches', href: '/product/malaysian-loose-curl-26' },
  { src: '/images/gallery/sep11/099.jpg', alt: 'Malaysian Loose Curl 26 inches', href: '/product/malaysian-loose-curl-26' },
  { src: '/images/gallery/sep11/101.jpg', alt: 'Malaysian Loose Curl 26 inches', href: '/product/malaysian-loose-curl-26' },
  { src: '/images/gallery/sep11/103.jpg', alt: 'Malaysian Loose Curl Microlink 24 inch', href: '/product/malaysian-loose-curl-micro-24' },
  { src: '/images/gallery/sep11/106.jpg', alt: 'Italian Curls 18 inch', href: '/product/italian-curls' },
  { src: '/images/gallery/sep11/107.jpg', alt: 'Italian Curls 18 inch', href: '/product/italian-curls' },
  { src: '/images/gallery/sep11/112.jpg', alt: 'Italian Curls 10 inch', href: '/product/italian-curls' },
  { src: '/images/gallery/sep11/114.jpg', alt: 'Italian Curls 30 inch', href: '/product/italian-curls' },
  { src: '/images/gallery/sep11/117.jpg', alt: 'Italian Curls 24 inches', href: '/product/italian-curls' },
  { src: '/images/gallery/sep11/118.jpg', alt: 'Italian Curls 24 inches', href: '/product/italian-curls' },
  { src: '/images/gallery/sep11/119.jpg', alt: 'Italian Curls 24 inches', href: '/product/italian-curls' },
  { src: '/images/gallery/sep11/121.jpg', alt: 'Italian Curls Microlink Microbonding 28 inches', href: '/product/italian-curls-micro-28' },
  { src: '/images/gallery/sep11/122.jpg', alt: 'Italian Curls Microlink Microbonding 28 inches', href: '/product/italian-curls-micro-28' },
  { src: '/images/gallery/sep11/124.jpg', alt: 'Italian Curls Microlink Microbonding 28 inches', href: '/product/italian-curls-micro-28' },
  { src: '/images/gallery/sep11/125.jpg', alt: 'Italian Curls Microlink Microbonding 28 inches', href: '/product/italian-curls-micro-28' },
  { src: '/images/gallery/sep11/127.jpg', alt: 'Raw hair 50 inches' },
  { src: '/images/gallery/sep11/131.jpg', alt: 'Raw hair 20 inches', href: '/product/raw-hair-20' },
  { src: '/images/gallery/sep11/133.jpg', alt: 'Raw hair 20 inches', href: '/product/raw-hair-20' },
  { src: '/images/gallery/sep11/134.jpg', alt: 'Raw hair 20 inches', href: '/product/raw-hair-20' },
  { src: '/images/gallery/sep11/136.jpg', alt: 'Raw Colour Meroon 20inch', href: '/product/raw-colour-maroon-20' },
  { src: '/images/gallery/sep11/140.jpg', alt: 'Raw Water Wave Microbonding Colour Platinum 28 inches', href: '/product/raw-water-wave-platinum-28' },
  { src: '/images/gallery/sep11/143.jpg', alt: 'Raw Water Wave Microbonding Colour Platinum 28 inches', href: '/product/raw-water-wave-platinum-28' },
  { src: '/images/gallery/sep11/146.jpg', alt: 'Bouncy Body Wave 30 inches', href: '/product/bouncy-body-wave-30' },
  { src: '/images/gallery/sep11/149.jpg', alt: 'Bounce Curls 16 inch', href: '/product/bounce-curls-16' },
  { src: '/images/gallery/sep11/153.jpg', alt: 'Raw Kinky Straight 14 inches', href: '/product/raw-kinky-straight-14' },
  { src: '/images/gallery/sep11/155.jpg', alt: 'Raw Kinky Straight 14 inches', href: '/product/raw-kinky-straight-14' },
  { src: '/images/gallery/sep11/156.jpg', alt: 'Raw Kinky Straight 14 inches', href: '/product/raw-kinky-straight-14' },
  { src: '/images/gallery/sep11/160.jpg', alt: 'Kinky Straight Microbonding and Microlink 22inch', href: '/product/kinky-straight-micro-22' },
  { src: '/images/gallery/sep11/161.jpg', alt: 'Kinky Straight Microbonding and Microlink 22inch', href: '/product/kinky-straight-micro-22' },
  { src: '/images/gallery/sep11/162.jpg', alt: 'Kinky Straight Microbonding and Microlink 22inch', href: '/product/kinky-straight-micro-22' },
  { src: '/images/gallery/sep11/163.jpg', alt: 'Kinky Straight Microbonding and Microlink 22inch', href: '/product/kinky-straight-micro-22' },
  { src: '/images/gallery/sep11/164.jpg', alt: 'Kinky Straight Microbonding and Microlink 22inch', href: '/product/kinky-straight-micro-22' },
  { src: '/images/gallery/sep11/167.jpg', alt: 'Brazilian Water Wave Crochet 24 inches', href: '/product/brazilian-water-wave-crochet-24' },
  { src: '/images/gallery/sep11/172.jpg', alt: 'Hair photographed 11 September 2026' },
  { src: '/images/gallery/sep11/173.jpg', alt: 'Hair photographed 11 September 2026' },
  { src: '/images/gallery/sep11/174.jpg', alt: 'Hair photographed 11 September 2026' },
  { src: '/images/gallery/sep11/176.jpg', alt: 'Hair photographed 11 September 2026' },
  { src: '/images/gallery/sep11/177.jpg', alt: 'Hair photographed 11 September 2026' },
  { src: '/images/gallery/sep11/182.jpg', alt: 'Brazilian Kinky Deep 22 inches', href: '/product/brazilian-kinky-deep-22' },
  { src: '/images/gallery/sep11/184.jpg', alt: 'Brazilian Kinky Deep 22 inches', href: '/product/brazilian-kinky-deep-22' },
  { src: '/images/gallery/sep11/225.jpg', alt: 'Hair photographed 11 September 2026' },
]

export function toCartProduct(
  product: Product,
  extras?: { length?: string; quantity?: number }
) {
  const length = extras?.length ?? product.lengths?.[0] ?? product.length
  return {
    id: length ? `${product.slug}::${length}` : product.slug,
    slug: product.slug,
    name: product.name,
    price: priceForSelection(product, length),
    category: product.category,
    image: product.image,
    description: product.description,
    length,
    type: product.tag,
    currency: product.currency,
  }
}
