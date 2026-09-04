export type GalleryCategory = 'all' | 'clients' | 'products' | 'salon'
export type GalleryMediaType = 'photo' | 'video'

export interface GalleryItem {
  id: string
  src: string
  alt: string
  title: string
  description: string
  category: Exclude<GalleryCategory, 'all'>
  type: GalleryMediaType
  featured?: boolean
}

export const galleryItems: GalleryItem[] = [
  {
    id: '1',
    src: '/images/gallery/curly-install-client.jpg',
    alt: 'Client wearing long defined kinky-curly hair',
    title: 'Defined Curly Install',
    description: 'Long, voluminous kinky-curly hair with tight curl definition.',
    category: 'clients',
    type: 'photo',
    featured: true,
  },
  {
    id: '2',
    src: '/images/gallery/stylist-portrait.jpg',
    alt: 'Biana in a sleek straight style and white jumpsuit',
    title: 'Sleek Straight Finish',
    description: 'Polished middle-part straight hair with a natural hairline.',
    category: 'salon',
    type: 'photo',
    featured: true,
  },
  {
    id: '3',
    src: '/images/gallery/straight-bundles-closure.jpg',
    alt: 'Straight black hair bundles with a matching lace closure',
    title: 'Straight Bundles & Closure',
    description: 'Jet-black straight bundles paired with a matching lace closure.',
    category: 'products',
    type: 'photo',
  },
  {
    id: '4',
    src: '/images/gallery/body-wave-display.jpg',
    alt: 'Body wave hair bundles hanging in the salon',
    title: 'Body Wave Collection',
    description: 'Glossy body-wave bundles displayed in-salon.',
    category: 'products',
    type: 'photo',
  },
  {
    id: '5',
    src: '/images/gallery/straight-gold-weft-set.jpg',
    alt: 'Three straight hair bundles with gold wefts and a lace closure',
    title: 'Premium Straight Set',
    description: 'Three straight bundles with gold wefts and a middle-part closure.',
    category: 'products',
    type: 'photo',
  },
  {
    id: '6',
    src: '/images/gallery/kinky-curly-bundle.jpg',
    alt: 'Single kinky curly hair bundle',
    title: 'Kinky Curly Bundle',
    description: 'Tight spiral curls with natural volume and shine.',
    category: 'products',
    type: 'photo',
  },
  {
    id: '7',
    src: '/images/gallery/kinky-curly-branded.jpg',
    alt: 'Kinky curly hair bundle branded @M.BIANA',
    title: 'Kinky Curly Texture',
    description: 'Deep, defined curls ready for custom installs.',
    category: 'products',
    type: 'photo',
  },
  {
    id: '8',
    src: '/images/gallery/straight-lace-front-unit.jpg',
    alt: 'Mannequin wearing a long straight lace-front wig',
    title: 'Long Straight Lace Front',
    description: 'Full-length straight unit with a visible lace front.',
    category: 'salon',
    type: 'photo',
  },
  {
    id: '9',
    src: '/images/gallery/blonde-balayage-unit.jpg',
    alt: 'Long straight blonde balayage wig on a mannequin',
    title: 'Blonde Balayage Unit',
    description: 'Waist-length straight hair with dark roots and honey blonde tones.',
    category: 'salon',
    type: 'photo',
    featured: true,
  },
  {
    id: '10',
    src: '/images/gallery/curly-length-reel-still.jpg',
    alt: 'Client looking over her shoulder to show long curly hair',
    title: 'Waist-Length Curls',
    description: 'Long tight curls captured from her latest client reel.',
    category: 'clients',
    type: 'photo',
  },
  {
    id: '12',
    src: '/images/gallery/salon-studio-display.jpg',
    alt: 'Biana in the salon with mannequin units on display',
    title: 'In-Salon Units',
    description: 'Ready-to-wear units on display at Biana Hair Salon.',
    category: 'salon',
    type: 'photo',
    featured: true,
  },
  {
    id: '13',
    src: '/images/gallery/deep-wave-frontal-set.jpg',
    alt: 'Three 30 inch deep wave bundles with a 20 inch full frontal',
    title: '30" Bundles + 20" Frontal',
    description: 'Deep-wave set with a 20-inch full frontal.',
    category: 'products',
    type: 'photo',
    featured: true,
  },
  {
    id: '14',
    src: '/images/gallery/ombre-bundles-closures.jpg',
    alt: 'Ombre straight hair bundles and matching closures',
    title: 'Ombre Bundles & Closures',
    description: 'Straight ombre sets in honey, brown, and auburn tones.',
    category: 'products',
    type: 'photo',
  },
]

export const galleryFilters: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'clients', label: 'Clients' },
  { id: 'products', label: 'Products' },
  { id: 'salon', label: 'Salon' },
]
