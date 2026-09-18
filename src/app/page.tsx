import Image from 'next/image'
import Link from 'next/link'
import {
  hairProducts,
  instagramUrl,
  shopNavCollections,
  testimonials,
  studioGallery,
} from '@/data/catalog'
import { listFeaturedStoreProducts } from '@/lib/catalog/products'
import { buttonClass } from '@/components/site/Button'
import { ProductCard } from '@/components/site/ProductCard'
import { SilentVideo } from '@/components/site/SilentVideo'
import { TestimonialsCarousel } from '@/components/site/TestimonialsCarousel'
import { studioServiceEnquireHref, studioServices } from '@/data/studio-services'

const featuredSlugs = [
  'brazilian-body-wave',
  'brazilian-straight-micro-26',
  'malaysian-loose-curl-water-wig-30',
  'malaysian-deep-curl',
  'italian-curls',
  'bouncy-body-wave-30',
  'raw-kinky-straight-14',
  'brazilian-body-wave-2tone',
]

/** Featured products come from Supabase; refresh them within a minute. */
export const revalidate = 60

const shopCategories = shopNavCollections(hairProducts).map((c) => ({
  name: c.name,
  href: `/shop/${c.slug}`,
  image: c.image,
}))

const galleryPreview = studioGallery

/** Real catalogue photos only — distinct looks, no filenames shown to visitors. */
const instagramPreview = [
  {
    src: '/images/gallery/blonde-balayage-unit.jpg',
    alt: 'Blonde balayage unit',
    crop: 'object-cover object-[center_18%]',
  },
  {
    src: '/images/gallery/sep11/218.jpg',
    alt: 'Wavy unit',
    crop: 'object-cover object-[center_22%]',
  },
  {
    src: '/images/gallery/straight-lace-front-unit.jpg',
    alt: 'Straight lace front unit',
    crop: 'object-cover object-[center_20%]',
  },
  {
    src: '/images/gallery/sep11/222.jpg',
    alt: 'Curled unit, back view',
    crop: 'object-cover object-[32%_30%]',
  },
  {
    src: '/images/gallery/sep11/090.jpg',
    alt: 'Loose curl wefts',
    crop: 'object-cover object-[center_70%]',
  },
  {
    src: '/images/gallery/straight-gold-weft-set.jpg',
    alt: 'Straight bundles and closure',
    crop: 'object-cover object-center',
  },
] as const

const homeServiceImageClass = {
  installations: 'object-cover object-[center_22%] transition-transform duration-700 group-hover:scale-[1.04]',
  'sew-in': 'object-cover object-[center_42%] transition-transform duration-700 group-hover:scale-[1.04]',
  'micro-bonding':
    'object-cover object-[center_32%] transition-transform duration-700 group-hover:scale-[1.04]',
} as const

const benefits = [
  {
    title: 'Premium quality hair',
    body: 'Single-donor units and bundles, finished in Johannesburg.',
  },
  {
    title: 'Professional service',
    body: 'Installs, cuts and revamps in studio — or ship nationwide.',
  },
  {
    title: 'Delivery you can trust',
    body: 'EFT checkout. Free courier over R2 500, in 2–4 working days.',
  },
]

function SectionHead({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string
  title: string
  action?: { href: string; label: string }
}) {
  return (
    <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 font-display text-[clamp(2rem,4.2vw,3.4rem)] italic leading-[0.95] tracking-tight">
          {title}
        </h2>
      </div>
      {action ? (
        action.href.startsWith('http') ? (
          <a
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1a1208]/45 hover:text-[#1a1208]"
          >
            {action.label}
          </a>
        ) : (
          <Link
            href={action.href}
            className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1a1208]/45 hover:text-[#1a1208]"
          >
            {action.label}
          </Link>
        )
      ) : null}
    </div>
  )
}

export default async function Home() {
  const featuredProducts = await listFeaturedStoreProducts(featuredSlugs)

  return (
    <div className="bg-white text-[#1a1208]">
      <section className="relative w-full overflow-hidden bg-[#b8a48c]">
        <div className="relative h-[calc(100svh-5.5rem)] w-full min-h-[22rem] max-h-[38rem] sm:h-auto sm:min-h-0 sm:aspect-[16/9] sm:max-h-[calc(100svh-6.5rem)]">
          <Image
            src="/images/hero-home.jpg"
            alt="Woman wearing long highlighted wavy hair"
            fill
            priority
            sizes="100vw"
            data-no-parallax
            className="object-cover object-[80%_10%] sm:object-[78%_center]"
          />
          <div className="pointer-events-none absolute inset-0 z-[5] bg-[linear-gradient(to_top,rgba(196,176,156,0.97)_0%,rgba(196,176,156,0.92)_26%,rgba(196,176,156,0.45)_44%,rgba(196,176,156,0)_62%)] sm:hidden" />
          <div className="absolute inset-0 z-10 flex items-end sm:items-center">
            <div className="w-full max-w-[1400px] px-5 pb-8 pt-6 sm:px-10 sm:py-0 lg:px-16">
              <h1 className="max-w-[10ch] font-display text-[clamp(2.1rem,10vw,4.75rem)] font-normal italic leading-[0.96] tracking-tight text-[#2a1f16]">
                Luxury hair,
                <br />
                made to be
                <br />
                yours.
              </h1>
              <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
                <Link href="/shop" className={buttonClass('solid', 'min-w-[8.5rem]')}>
                  Shop Hair
                </Link>
                <Link href="/contact" className={buttonClass('outline', 'min-w-[10.5rem]')}>
                  Book a Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-8 lg:py-24">
          <SectionHead
            eyebrow="Shop"
            title="Shop by category"
            action={{ href: '/shop', label: 'View All Products →' }}
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {shopCategories.map((c) => (
              <Link key={c.name} href={c.href} className="group block">
                <span className="relative block aspect-[4/5] overflow-hidden bg-[#f4efe8]">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(min-width: 768px) 30vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </span>
                <h3 className="mt-4 font-display text-xl italic tracking-tight sm:text-[1.65rem]">{c.name}</h3>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#b8923a] transition-colors group-hover:text-[#9a7428]">
                  Shop now →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="shop" className="scroll-mt-24 bg-[#faf7f2]">
        <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-8 lg:py-24">
          <SectionHead
            eyebrow="Featured"
            title="Selected pieces"
            action={{ href: '/shop', label: 'View all →' }}
          />
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[420px] overflow-hidden lg:min-h-[560px]">
            <Image
              src="/images/products/malaysian-deep-curl-32.jpg"
              alt="Malaysian Deep Curl"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[center_62%]"
            />
          </div>
          <div className="flex flex-col justify-center bg-[#faf7f2] px-6 py-16 sm:px-12 lg:px-16">
            <p className="eyebrow">Shop</p>
            <h2 className="mt-3 max-w-[12ch] font-display text-[clamp(2.4rem,5vw,4.2rem)] italic leading-[0.94] tracking-tight">
              Bundles & closures
            </h2>
            <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-[#1a1208]/55">
              The core of the shop — wefts, pondo sets and melt-ready hairlines, chosen first, finished in
              Johannesburg.
            </p>
            <Link href="/shop/bundles" className={`${buttonClass('solid')} mt-8 w-fit`}>
              Shop Bundles
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-8 lg:py-24">
          <SectionHead
            eyebrow="Studio"
            title="Services"
            action={{ href: '/services', label: 'View all services →' }}
          />
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
            {studioServices.map((service) => {
              const photo = service.homeImage ?? service.image
              return (
              <article key={service.slug} className="group flex h-full flex-col">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f4efe8]">
                  {photo ? (
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1280px) 28vw, (min-width: 640px) 50vw, 100vw"
                      className={homeServiceImageClass[service.slug]}
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col pt-5">
                  <h3 className="font-display text-[1.45rem] italic tracking-tight">{service.name}</h3>
                  {service.description ? (
                    <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[#1a1208]/55">
                      {service.description}
                    </p>
                  ) : (
                    <div className="flex-1" />
                  )}
                  <Link
                    href={studioServiceEnquireHref(service)}
                    className={`${buttonClass('solid')} mt-6 w-full`}
                  >
                    Enquire Now
                  </Link>
                </div>
              </article>
              )
            })}
          </div>
          <div className="mt-14">
            <Link href="/contact" className={buttonClass('outline')}>
              Book a Service
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#faf7f2]">
        <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-8 lg:py-24">
          <SectionHead
            eyebrow="Work"
            title="In the studio"
            action={{ href: '/gallery', label: 'View All Work →' }}
          />
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
            {galleryPreview.map((g) =>
              g.kind === 'video' ? (
                <div key={g.src} className="relative aspect-[3/4] min-w-0 overflow-hidden bg-[#1a1208]">
                  <SilentVideo
                    src={g.src}
                    className="h-full w-full object-cover"
                    aria-label={g.alt}
                  />
                </div>
              ) : (
                <Link key={g.src} href="/gallery" className="group relative aspect-[3/4] overflow-hidden bg-[#f4efe8]">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-8 lg:py-24">
          <div className="grid gap-12 sm:grid-cols-3 sm:gap-10">
            {benefits.map((b) => (
              <div key={b.title} className="border-t border-[#1a1208]/12 pt-6">
                <h3 className="font-display text-2xl italic tracking-tight">{b.title}</h3>
                <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-[#1a1208]/55">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="clients" className="scroll-mt-28 bg-[#faf7f2]">
        <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-8 lg:py-24">
          <div className="mb-10 max-w-[40rem] sm:mb-12">
            <p className="eyebrow">Clients</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.2vw,3.4rem)] italic leading-[0.95] tracking-tight">
              What Our Clients Say
            </h2>
            <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-[#1a1208]/55">
              From the Johannesburg studio, in their words.
            </p>
          </div>
          <TestimonialsCarousel items={testimonials} />
        </div>
      </section>

      <section id="instagram" className="scroll-mt-28 border-t border-[#1a1208]/8 bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-[42rem] text-center">
            <p className="eyebrow">Instagram</p>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.8rem)] italic leading-[0.94] tracking-tight">
              Follow Biana Hair Salon
            </h2>
            <p className="mx-auto mt-5 max-w-[40ch] text-[15px] leading-relaxed text-[#1a1208]/55">
              Follow us on Instagram for the latest looks, hair inspiration and salon updates.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 md:grid-cols-3">
            {instagramPreview.map((g) => (
              <a
                key={g.src}
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${g.alt} on Instagram`}
                className="group relative aspect-[4/5] min-w-0 overflow-hidden bg-[#f4efe8]"
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(min-width: 1024px) 28vw, 50vw"
                  className={`${g.crop} transition-transform duration-700 group-hover:scale-[1.04]`}
                />
                <span className="pointer-events-none absolute inset-0 bg-[#1a1208]/0 transition-colors duration-500 group-hover:bg-[#1a1208]/20" aria-hidden="true" />
                <span
                  className="pointer-events-none absolute inset-x-0 bottom-0 px-4 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  @m.biana
                </span>
              </a>
            ))}
          </div>
          <div className="mt-10 flex justify-center sm:mt-12">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonClass('solid')} min-h-11 px-8`}
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
