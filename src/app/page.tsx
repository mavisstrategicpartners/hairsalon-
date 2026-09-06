import Image from 'next/image'
import Link from 'next/link'
import { hairCollections, instagramUrl, products, testimonials, workGallery } from '@/data/catalog'
import { buttonClass } from '@/components/site/Button'
import { ProductCard } from '@/components/site/ProductCard'
import { ServiceCard } from '@/components/site/ServiceCard'
import { SectionHeading } from '@/components/site/SectionHeading'

const featuredSlugs = [
  'wine-red-bob-10',
  'ombre-glueless-18',
  'goldie-unit-14',
  'double-drawn-bob-12',
  'waterwave-unit-30',
  'straight-full-frontal-20',
  'straight-bundle',
  'body-wave-bundle',
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
const galleryPreview = workGallery.slice(0, 4)
const instagramPreview = workGallery.slice(4, 8)

export default function Home() {
  return (
    <div className="bg-white text-[#1a1208]">
      <section className="relative min-h-[calc(100svh-4.75rem)] bg-white">
        <div className="grid min-h-[calc(100svh-4.75rem)] lg:grid-cols-2">
          <div className="relative z-10 flex flex-col justify-center bg-white px-6 py-16 sm:px-12 lg:px-16 xl:px-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/40">
              The art of beautiful hair · South Africa
            </p>
            <h1 className="mt-6 max-w-[11ch] font-display text-[clamp(3.2rem,7vw,5.6rem)] font-semibold leading-[0.92] tracking-tight">
              Hair worth remembering.
            </h1>
            <p className="mt-6 max-w-[40ch] text-[15px] leading-relaxed text-[#1a1208]/80">
              Premium wigs, bobs, bundles and closures, selected for women who know the difference.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="inline-flex border-2 border-[#1a1208] bg-[#1a1208] px-6 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white hover:border-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#1a1208]"
              >
                Shop Hair
              </Link>
              <Link
                href="/contact"
                className="inline-flex border-2 border-[#1a1208] px-6 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#1a1208] hover:bg-[#1a1208] hover:text-white"
              >
                Book a Service
              </Link>
            </div>
          </div>

          <div className="relative min-h-[48vh] lg:min-h-full">
            <Image
              src="/images/landing-hair.png"
              alt="Glossy dark wavy hair"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="pointer-events-none absolute left-1/2 top-[58%] z-20 w-[42vw] max-w-[220px] -translate-x-1/2 -translate-y-1/2 sm:top-1/2 sm:w-[min(36vw,260px)]">
          <div className="rotate-[-4deg] border-[10px] border-white bg-white shadow-[0_18px_50px_rgba(26,18,8,0.22)]">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/landing-polaroid.png"
                alt="Scissors, comb and a tress of hair"
                fill
                sizes="260px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#c9a84c]/30 bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <SectionHeading eyebrow="Shop" title="Shop by category" />
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
            {shopCategories.map((c) => (
              <Link key={c.name} href={c.href} className="group block">
                <span className="relative block aspect-[4/5] overflow-hidden bg-[#f7f4ee]">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(min-width: 768px) 30vw, 50vw"
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </span>
                <h3 className="mt-3 font-display text-2xl italic tracking-tight">{c.name}</h3>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a6820]">
                  Shop now →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="shop" className="scroll-mt-24 border-b border-[#c9a84c]/30 bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <SectionHeading
            eyebrow="Featured"
            title="Selected pieces"
            action={
              <Link href="/shop" className={buttonClass('ghost')}>
                View All Products →
              </Link>
            }
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <Link href="/shop" className={`${buttonClass('outline')} mt-12 sm:hidden`}>
            View All Products
          </Link>
        </div>
      </section>

      <section className="border-b border-[#c9a84c]/30 bg-white">
        <div className="mx-auto grid max-w-[1400px] lg:grid-cols-2">
          <div className="relative min-h-[380px]">
            <Image
              src="/images/products/waterwave-unit.webp"
              alt="30 inch waterwave frontal unit"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16">
            <p className="eyebrow">Collection</p>
            <h2 className="mt-3 font-display text-4xl italic tracking-tight sm:text-5xl">The waterwave edit</h2>
            <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-muted-foreground">
              Long, glass-finish wave — from a 30" frontal unit to body-wave bundles. One texture, worn as if
              it grew from you.
            </p>
            <Link href="/shop/curly-hair" className={`${buttonClass('solid')} mt-8 w-fit`}>
              Shop Collection
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-[#c9a84c]/30 bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <SectionHeading
            eyebrow="Studio"
            title="Services"
            action={
              <Link href="/services" className={buttonClass('ghost')}>
                View all services →
              </Link>
            }
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {previewServices.map((p) => (
              <ServiceCard key={p.slug} service={p} />
            ))}
          </div>
          <Link href="/contact" className={`${buttonClass('outline')} mt-12`}>
            Book a Service
          </Link>
        </div>
      </section>

      <section className="border-b border-[#c9a84c]/30 bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <SectionHeading
            eyebrow="Work"
            title="In the studio"
            action={
              <Link href="/gallery" className={buttonClass('ghost')}>
                View All Work →
              </Link>
            }
          />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {galleryPreview.map((g) => (
              <Link key={g.src} href="/gallery" className="relative aspect-[3/4] overflow-hidden">
                <Image src={g.src} alt={g.alt} fill sizes="25vw" className="object-cover" />
              </Link>
            ))}
          </div>
          <Link href="/gallery" className={`${buttonClass('outline')} mt-12 sm:hidden`}>
            View All Work
          </Link>
        </div>
      </section>

      <section className="border-b border-[#c9a84c]/30 bg-white">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 sm:grid-cols-3">
          {[
            { t: 'Premium quality hair', d: 'Single-donor units and bundles, finished in Johannesburg.' },
            { t: 'Professional service', d: 'Installs, cuts and revamps in studio — or ship nationwide.' },
            { t: 'Delivery you can trust', d: 'EFT checkout. Free courier over R2 500, in 2–4 working days.' },
          ].map((item) => (
            <div key={item.t} className="border-t border-[#c9a84c]/40 pt-6">
              <h3 className="font-display text-2xl italic tracking-tight">{item.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-[#c9a84c]/30 bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <SectionHeading eyebrow="Clients" title="What they say" />
          <div className="grid gap-px bg-border sm:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote key={t.author} className="bg-white px-8 py-12">
                <p className="font-display text-2xl italic leading-snug tracking-tight">“{t.quote}”</p>
                <footer className="label-mono mt-8 text-[#c9a84c]">
                  {t.author} · {t.city}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Instagram</p>
              <h2 className="mt-3 font-display text-4xl italic tracking-tight">@m.biana</h2>
            </div>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass('ghost')}
            >
              Follow →
            </a>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {instagramPreview.map((g) => (
              <a
                key={g.src}
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden"
              >
                <Image src={g.src} alt={g.alt} fill sizes="25vw" className="object-cover" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
