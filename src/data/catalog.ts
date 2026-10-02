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
      'Professional wig installation in studio. Includes consultation and install. Redeem at 46 Plein Street, Johannesburg or 223 Central Street, Pretoria Central.',
    specs: [
      { label: 'Duration', value: '90 min' },
      { label: 'Redeem', value: 'Johannesburg or Pretoria studio' },
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
      { label: 'Redeem', value: 'Johannesburg or Pretoria studio' },
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
      { label: 'Redeem', value: 'Johannesburg or Pretoria studio' },
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
      { label: 'Redeem', value: 'Johannesburg or Pretoria studio' },
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
      { label: 'Redeem', value: 'Johannesburg or Pretoria studio' },
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
    image: '/images/products/malaysian-loose-curl-wig-30.jpg',
  },
  {
    slug: 'bundles',
    name: 'Bundles',
    description: 'Wefts sold as singles. Three make a full install; mix lengths for a layered set.',
    image: '/images/products/brazilian-body-wave-1.jpg',
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
    image: '/images/products/brazilian-straight-micro-26.jpg',
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
    image: '/images/products/italian-curls-18.jpg',
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
    image: '/images/products/malaysian-loose-curl-wig-30.jpg',
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
export function productMatchesCollection(product: Product, slug: string): boolean {
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
      return !['wigs', 'closures-frontals', 'straight-hair', 'body-wave', 'curly-hair'].some((key): boolean =>
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
  'Vouchers are valid for 12 months. Redeem at 46 Plein Street, Johannesburg, or 223 Central Street, Central House, 3rd Floor, Salon 318, Pretoria Central. Bring your order confirmation. Book ahead so we can hold your chair.'

export const instagramUrl = 'https://www.instagram.com/m.biana?igsi=dGI3NHNvZWJxNHhu'

export function serviceDuration(product: Product) {
  return product.specs.find((s) => s.label === 'Duration')?.value ?? 'By appointment'
}

/** Homepage “In the studio” — wig videos, white studio product photographs and 11 Sep studio videos. */
export type StudioMedia = {
  src: string
  alt: string
  kind?: 'image' | 'video'
  href?: string
}

export const studioGallery: StudioMedia[] = [
  { src: '/images/products/B11.mp4', alt: 'Luxury Donor Body Wave 24 inch', kind: 'video' },
  { src: '/images/products/B12.mp4', alt: 'Luxury Donor 613 Body Wave 20 inch', kind: 'video' },
  { src: '/images/products/B13.mp4', alt: 'Luxury Donor 613 Body Wave 20 inch', kind: 'video' },
  { src: '/images/products/B14.mp4', alt: 'Luxury Donor Brown Body Wave 24 inch', kind: 'video' },
  { src: '/images/products/brazilian-body-wave-1.jpg', alt: 'Brazillian straight and body wave', href: '/product/brazilian-body-wave' },
  { src: '/images/products/brazilian-body-wave-2tone.jpg', alt: '2 toned brazillian straight and body wave', href: '/product/brazilian-body-wave-2tone' },
  { src: '/images/products/brazilian-body-wave-micro-22.jpg', alt: 'Brazillian micro bonding & micro link hair', href: '/product/brazilian-body-wave-micro-22' },
  { src: '/images/products/brazilian-straight-micro-26.jpg', alt: 'Brazilian straight microbonding microlink 26 inch', href: '/product/brazilian-straight-micro-26' },
  { src: '/images/products/malaysian-loose-curl-wig-30.jpg', alt: 'Malaysian loose curl water wig 30 inches', href: '/product/malaysian-loose-curl-water-wig-30' },
  { src: '/images/products/malaysian-loose-curl-26.jpg', alt: 'Malaysian Loose Curl 26 inches', href: '/product/malaysian-loose-curl-26' },
  { src: '/images/products/malaysian-curly-water-wave.jpg', alt: '2 toned Malesian curly water wave', href: '/product/malesian-curly-water-wave-2tone' },
  { src: '/images/products/italian-curls-18.jpg', alt: 'Itallian curl', href: '/product/italian-curls' },
  { src: '/images/products/italian-curls-micro-28.jpg', alt: 'Itallian curls- micro bonding and micro link hair', href: '/product/italian-curls-micro-28' },
  { src: '/images/products/raw-kinky-straight-14.jpg', alt: 'Raw kinky straight hair', href: '/product/raw-kinky-straight-14' },
  { src: '/images/products/kinky-straight-micro-22.jpg', alt: 'Kinky Straight Microbonding and Microlink 22inch', href: '/product/kinky-straight-micro-22' },
  { src: '/images/products/bouncy-body-wave.jpg', alt: 'Bouncy body wave', href: '/product/bouncy-body-wave-30' },
  { src: '/images/products/bounce-curls-16.jpg', alt: 'Bounce Curls 16 inch', href: '/product/bounce-curls-16' },
  { src: '/images/products/raw-hair-20.jpg', alt: 'Raw hair', href: '/product/raw-hair-20' },
  { src: '/images/products/raw-colour-maroon-20.jpg', alt: 'Raw Colour Meroon 20inch', href: '/product/raw-colour-maroon-20' },
  { src: '/images/products/raw-water-wave-platinum-28.jpg', alt: 'Raw Water Wave Microbonding Colour Platinum 28 inches', href: '/product/raw-water-wave-platinum-28' },
  { src: '/images/products/brazilian-water-wave-crochet-24.jpg', alt: 'Brazilian Water Wave Crochet 24 inches', href: '/product/brazilian-water-wave-crochet-24' },
  { src: '/images/products/crochet-hair-colour.jpg', alt: 'Crochet hair colour', href: '/product/crochet-hair-colour' },
  { src: '/images/products/brazilian-kinky-deep-22.jpg', alt: 'Brazilian Kinky Deep 22 inches', href: '/product/brazilian-kinky-deep-22' },
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
