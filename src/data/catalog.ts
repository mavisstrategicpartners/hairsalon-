export type Product = {
  slug: string
  name: string
  price: number
  category: 'Wigs' | 'Bundles' | 'Services'
  tag: string
  kind: 'product' | 'service'
  image: string
  description: string
  length?: string
  lengths?: string[]
  specs: { label: string; value: string }[]
}

export const formatZar = (value: number) => `R${value.toLocaleString('en-US')}`

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
  {
    slug: 'wine-red-bob-10',
    name: '10" Wine Red Double Drawn Frontal Bob',
    price: 2800,
    category: 'Wigs',
    tag: 'Bob',
    kind: 'product',
    image: '/images/products/wine-red-bob.webp',
    description: 'Double drawn frontal bob in wine red, 10 inches. Bold colour, dense ends.',
    length: '10"',
    specs: [
      { label: 'Length', value: '10"' },
      { label: 'Cap', value: 'Frontal' },
      { label: 'Hair', value: 'Double drawn' },
    ],
  },
  {
    slug: 'ombre-glueless-18',
    name: '18" Ombre Glueless Unit',
    price: 4200,
    category: 'Wigs',
    tag: 'Ombre',
    kind: 'product',
    image: '/images/products/ombre-glueless.webp',
    description: '18 inch glueless ombre unit. Dark root into honey — no glue required.',
    length: '18"',
    specs: [
      { label: 'Length', value: '18"' },
      { label: 'Cap', value: 'Glueless' },
      { label: 'Colour', value: 'Ombre' },
    ],
  },
  {
    slug: 'pondo-bundles-closure',
    name: '12" - 30" Bundles + Closure for Pondo',
    price: 3500,
    category: 'Bundles',
    tag: 'Pondo',
    kind: 'product',
    image: '/images/products/pondo-bundles.webp',
    description: 'Complete pondo set: bundles plus matching closure. Lengths from 12 to 30 inches.',
    length: '12"-30"',
    lengths: ['12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"', '30"'],
    specs: [
      { label: 'Set', value: 'Bundles + closure' },
      { label: 'Length', value: '12" – 30"' },
      { label: 'Style', value: 'Pondo' },
    ],
  },
  {
    slug: 'full-frontal-bob-8',
    name: '8" Full-frontal Bob',
    price: 2200,
    category: 'Wigs',
    tag: 'Bob',
    kind: 'product',
    image: '/images/products/full-frontal-bob-8.webp',
    description: 'Short full-frontal bob, 8 inches. Clean line, easy wear.',
    length: '8"',
    specs: [
      { label: 'Length', value: '8"' },
      { label: 'Cap', value: 'Full frontal' },
    ],
  },
  {
    slug: 'goldie-unit-14',
    name: '14" Goldie Unit',
    price: 3600,
    category: 'Wigs',
    tag: 'Goldie',
    kind: 'product',
    image: '/images/products/goldie-unit.webp',
    description: '14 inch Goldie unit. Warm tone, premium density.',
    length: '14"',
    specs: [
      { label: 'Length', value: '14"' },
      { label: 'Finish', value: 'Goldie' },
    ],
  },
  {
    slug: 'double-drawn-bob-12',
    name: '12" Double Drawn Frontal Bob',
    price: 2500,
    category: 'Wigs',
    tag: 'Bob',
    kind: 'product',
    image: '/images/products/double-drawn-bob-12.webp',
    description: '12 inch double drawn frontal bob. 100% human hair, even ends.',
    length: '12"',
    specs: [
      { label: 'Length', value: '12"' },
      { label: 'Hair', value: 'Double drawn' },
      { label: 'Cap', value: 'Frontal' },
    ],
  },
  {
    slug: 'vietnamese-bob-14',
    name: '14" Vietnamese 5X5 Bob',
    price: 3200,
    category: 'Wigs',
    tag: 'Bob',
    kind: 'product',
    image: '/images/products/vietnamese-bob.webp',
    description: 'Vietnamese 5x5 closure bob, 14 inches. Natural swing, low weight.',
    length: '14"',
    specs: [
      { label: 'Length', value: '14"' },
      { label: 'Cap', value: '5x5' },
      { label: 'Origin', value: 'Vietnamese' },
    ],
  },
  {
    slug: 'waterwave-unit-30',
    name: '30" Waterwave Frontal Unit',
    price: 4500,
    category: 'Wigs',
    tag: 'Waterwave',
    kind: 'product',
    image: '/images/products/waterwave-unit.webp',
    description: '30 inch waterwave frontal unit. Long wave with a glass finish.',
    length: '30"',
    specs: [
      { label: 'Length', value: '30"' },
      { label: 'Texture', value: 'Waterwave' },
      { label: 'Cap', value: 'Frontal' },
    ],
  },
  {
    slug: 'straight-full-frontal-20',
    name: '20" Straight Full-frontal Unit',
    price: 3800,
    category: 'Wigs',
    tag: 'Straight',
    kind: 'product',
    image: '/images/products/straight-full-frontal.webp',
    description: '20 inch straight full-frontal unit. Sleek, pulled-back ready.',
    length: '20"',
    specs: [
      { label: 'Length', value: '20"' },
      { label: 'Cap', value: 'Full frontal' },
      { label: 'Texture', value: 'Straight' },
    ],
  },
  {
    slug: 'straight-bundle',
    name: 'Straight Hair Bundle',
    price: 1200,
    category: 'Bundles',
    tag: 'Straight',
    kind: 'product',
    image: '/images/products/straight-bundle.webp',
    description: 'Single-donor straight bundle, 100g. Three make a full install.',
    length: '18"',
    lengths: ['14"', '16"', '18"', '20"', '22"'],
    specs: [
      { label: 'Weight', value: '100g' },
      { label: 'Texture', value: 'Straight' },
      { label: 'Weft', value: 'Double weft' },
    ],
  },
  {
    slug: 'body-wave-bundle',
    name: 'Body Wave Bundle',
    price: 1300,
    category: 'Bundles',
    tag: 'Body Wave',
    kind: 'product',
    image: '/images/products/body-wave-bundle.webp',
    description: 'Body wave bundle with natural bounce. Sold as a single weft.',
    length: '20"',
    lengths: ['16"', '18"', '20"', '22"'],
    specs: [
      { label: 'Weight', value: '100g' },
      { label: 'Texture', value: 'Body wave' },
      { label: 'Weft', value: 'Double weft' },
    ],
  },
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
  { name: 'Services', slug: 'services' },
  { name: 'Wigs', slug: 'wigs' },
  { name: 'Bundles', slug: 'bundles' },
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

export const hairProducts = products.filter((p) => p.kind === 'product')
export const serviceProducts = products.filter((p) => p.kind === 'service')

export type HairCollection = {
  slug: string
  name: string
  description: string
  image: string
}

export const hairCollections: HairCollection[] = [
  {
    slug: 'wigs',
    name: 'Wigs',
    description: 'Ready-to-wear units — glueless, frontal and full-frontal, finished for everyday wear.',
    image: '/images/products/ombre-glueless.webp',
  },
  {
    slug: 'bobs',
    name: 'Bobs',
    description: 'Short, sculpted bobs with dense ends — from wine red to a clean Vietnamese 5x5.',
    image: '/images/products/wine-red-bob.webp',
  },
  {
    slug: 'straight-hair',
    name: 'Straight Hair',
    description: 'Sleek single-donor straight — full-frontal units and wefts for a pulled-back finish.',
    image: '/images/products/straight-full-frontal.webp',
  },
  {
    slug: 'curly-hair',
    name: 'Curly Hair',
    description: 'Waterwave and body wave with a glass finish. Long length, natural bounce.',
    image: '/images/products/waterwave-unit.webp',
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
]

export function getHairCollection(slug: string) {
  return hairCollections.find((c) => c.slug === slug)
}

export function productMatchesCollection(product: Product, slug: string) {
  if (product.kind !== 'product') return false
  const hay = `${product.name} ${product.tag} ${product.description} ${product.category}`.toLowerCase()
  switch (slug) {
    case 'wigs':
      return product.category === 'Wigs'
    case 'bobs':
      return hay.includes('bob')
    case 'straight-hair':
      return hay.includes('straight')
    case 'curly-hair':
      return /wave|curl|kinky/.test(hay)
    case 'bundles':
      return product.category === 'Bundles'
    case 'closures-frontals':
      return /closure|frontal|pondo/.test(hay)
    default:
      return false
  }
}

export function getCollectionProducts(slug: string) {
  return hairProducts.filter((p) => productMatchesCollection(p, slug))
}

export function relatedHairProducts(product: Product, limit = 4) {
  const pool = (product.kind === 'service' ? serviceProducts : hairProducts).filter(
    (p) => p.slug !== product.slug
  )
  return [...pool]
    .sort((a, b) => {
      const score = (p: Product) =>
        (p.category === product.category ? 2 : 0) + (p.tag === product.tag ? 3 : 0)
      return score(b) - score(a)
    })
    .slice(0, limit)
}

export function primaryCollectionSlug(product: Product) {
  const order = ['bobs', 'closures-frontals', 'straight-hair', 'curly-hair', 'bundles', 'wigs']
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

export function toCartProduct(
  product: Product,
  extras?: { length?: string; quantity?: number }
) {
  return {
    id: extras?.length ? `${product.slug}::${extras.length}` : product.slug,
    slug: product.slug,
    name: product.name,
    price: product.price,
    category: product.category,
    image: product.image,
    description: product.description,
    length: extras?.length,
    type: product.tag,
  }
}
