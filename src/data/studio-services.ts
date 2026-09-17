/**
 * Studio services offered at Biana Hair Salon.
 * Names, copy and images come only from existing site content — nothing invented.
 */
export type StudioService = {
  slug: 'installations' | 'sew-in' | 'micro-bonding'
  name: string
  /** Existing catalogue copy only. Omitted when the site has no service description. */
  description?: string
  image?: { src: string; alt: string }
  /** Home Studio/Services preview. When set, Home must not reuse `image`. */
  homeImage?: { src: string; alt: string }
}

export const studioServices: StudioService[] = [
  {
    slug: 'installations',
    name: 'Installations',
    description: 'Professional wig installation in studio. Includes consultation and install.',
    image: {
      src: '/images/gallery/sep11/223.jpg',
      alt: 'Installations',
    },
  },
  {
    slug: 'sew-in',
    name: 'Sew-in',
    description: 'Sew-in with closure or frontal melt. About 3 hours in studio.',
    image: {
      src: '/images/gallery/sep11/126.jpg',
      alt: 'Sew-in',
    },
  },
  {
    slug: 'micro-bonding',
    name: 'Micro-bonding',
    image: {
      src: '/images/products/brazilian-body-wave-micro-22.jpg',
      alt: 'Micro-bonding',
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
