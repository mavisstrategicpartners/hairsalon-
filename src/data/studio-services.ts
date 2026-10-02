/**
 * Studio services offered at Biana Hair Salon.
 * Names, prices and images come from the client's catalogue and existing site content.
 */
export type StudioServicePrice = { label?: string; amount: string }

export type StudioService = {
  slug: 'installations' | 'sew-in' | 'micro-bonding' | 'micro-linking'
  name: string
  description?: string
  /** From the client's "Biana Website Add-ons" price list. */
  prices: StudioServicePrice[]
  image?: { src: string; alt: string }
  /** Home Studio/Services preview. When set, Home must not reuse `image`. */
  homeImage?: { src: string; alt: string }
}

export const studioServices: StudioService[] = [
  {
    slug: 'installations',
    name: 'Installations',
    description: 'Professional wig installation in studio. Includes consultation and install.',
    prices: [
      { label: 'Basic', amount: 'R350' },
      { label: 'Styling', amount: 'R350 – R750' },
    ],
    image: {
      src: '/images/gallery/sep11/223.jpg',
      alt: 'Installations',
    },
  },
  {
    slug: 'sew-in',
    name: 'Sew-in',
    description: 'Sew-in with closure or frontal melt. About 3 hours in studio.',
    prices: [{ amount: 'R500' }],
    image: {
      src: '/images/gallery/sep11/126.jpg',
      alt: 'Sew-in',
    },
  },
  {
    slug: 'micro-bonding',
    name: 'Micro-bonding',
    description:
      'Fine strands bonded to your own hair with small keratin tips. Seamless length and volume that moves naturally.',
    prices: [{ amount: 'R1,500' }],
    image: {
      src: '/images/products/brazilian-body-wave-micro-22.jpg',
      alt: 'Micro-bonding',
    },
  },
  {
    slug: 'micro-linking',
    name: 'Micro-linking',
    description:
      'Extensions fitted with tiny micro-link beads — no glue, no heat. Lightweight, natural and easy to adjust.',
    prices: [{ amount: 'R2,800' }],
    image: {
      src: '/images/products/brazilian-straight-micro-26.jpg',
      alt: 'Micro-linking',
    },
  },
]

export function studioServiceEnquireHref(service: Pick<StudioService, 'name'>) {
  const params = new URLSearchParams()
  params.set('service', service.name)
  return `/contact?${params.toString()}`
}

export function studioServiceByQuery(value: string | null | undefined) {
  const query = value?.trim().toLowerCase()
  if (!query) return undefined
  return studioServices.find((service) => service.slug === query || service.name.toLowerCase() === query)
}
