import Image from 'next/image'
import Link from 'next/link'
import { hairCollections, instagramUrl, products, testimonials, workGallery } from '@/data/catalog'
import { buttonClass } from '@/components/site/Button'
import { ProductCard } from '@/components/site/ProductCard'
import { ServiceCard } from '@/components/site/ServiceCard'

const featuredSlugs = [
  'pondo-bundles-closure',
  'straight-bundle',
  'body-wave-bundle',
  'straight-full-frontal-20',
  'waterwave-unit-30',
  'wine-red-bob-10',
  'ombre-glueless-18',
  'goldie-unit-14',
]

const featuredProducts = featuredSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p))

const shopCategories = hairCollections.map((c) => ({
  name: c.name,
  href: `/shop/${c.slug}`,
  image: c.image,
}))

const previewServices = products.filter((p) => p.kind === 'service').slice(0, 4)
const galleryPreview = workGallery.slice(0, 8)
const instagramPreview = workGallery.slice(4, 8)

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

export default function Home() {
  return (
    <div className="bg-white text-[#1a1208]">
      <section className="relative w-full overflow-hidden bg-[#b8a48c]">
        <div className="relative h-[min(78svh,36rem)] w-full min-h-[28rem] sm:h-auto sm:min-h-0 sm:aspect-[16/9]">
          <Image
            src="/images/hero-home.jpg"
            alt="Woman wearing long highlighted wavy hair"
            fill
            priority
            sizes="100vw"
            data-no-parallax
            className="object-cover object-[82%_12%] sm:object-[78%_center]"
          />
          <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-[#c4b09c]/90 via-[#c4b09c]/20 to-transparent sm:hidden" />
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
          <div className="relative min-h-[420px] lg:min-h-[560px]">
            <Image
              src="/images/gallery/straight-bundles-closure.jpg"
              alt="Straight bundles and closure"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-center bg-[#faf7f2] px-6 py-16 sm:px-12 lg:px-16">
            <p className="eyebrow">Collection</p>
            <h2 className="mt-3 max-w-[12ch] font-display text-[clamp(2.4rem,5vw,4.2rem)] italic leading-[0.94] tracking-tight">
              Bundles & closures
            </h2>
            <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-[#1a1208]/55">
              The core of the shop — wefts, pondo sets and melt-ready hairlines, chosen first, finished in
              Johannesburg.
            </p>
            <Link href="/shop/bundles" className={`${buttonClass('solid')} mt-8 w-fit`}>
              Shop Collection
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
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
            {previewServices.map((p) => (
              <ServiceCard key={p.slug} service={p} />
            ))}
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
            {galleryPreview.map((g) => (
              <Link key={g.src} href="/gallery" className="group relative aspect-[3/4] overflow-hidden bg-[#f4efe8]">
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </Link>
            ))}
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

      <section className="bg-[#faf7f2]">
        <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-8 lg:py-24">
          <SectionHead eyebrow="Clients" title="What they say" />
          <div className="grid gap-12 md:grid-cols-3 md:gap-10">
            {testimonials.map((t) => (
              <blockquote key={t.author}>
                <p className="font-display text-[1.65rem] italic leading-snug tracking-tight">
                  “ {t.quote} ”
                </p>
                <footer className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#1a1208]/45">
                  {t.author} · {t.city}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-8 lg:py-24">
          <SectionHead
            eyebrow="Instagram"
            title="@m.biana"
            action={{ href: instagramUrl, label: 'Follow →' }}
          />
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
            {instagramPreview.map((g) => (
              <a
                key={g.src}
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden bg-[#f4efe8]"
              >
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
