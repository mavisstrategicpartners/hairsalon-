import Image from 'next/image'
import Link from 'next/link'
import { products, testimonials } from '@/data/catalog'
import { buttonClass } from '@/components/site/Button'
import { ProductCard } from '@/components/site/ProductCard'
import { SectionHeading } from '@/components/site/SectionHeading'
import { HomeContactForm } from '@/components/site/HomeContactForm'

export default function Home() {
  return (
    <>
      <section className="relative min-h-[calc(100svh-4.75rem)] bg-[#faf7f2]">
        <div className="grid min-h-[calc(100svh-4.75rem)] lg:grid-cols-12">
          <div className="relative z-10 flex flex-col justify-between px-6 py-14 sm:px-10 lg:col-span-5 lg:px-14 lg:py-16 xl:px-20">
            <div>
              <p className="eyebrow">Plein Street · Johannesburg</p>
              <h1 className="mt-8 max-w-[11ch] text-balance font-display text-[clamp(3.4rem,6.4vw,6.2rem)] italic leading-[0.88] tracking-tight text-[#1a1208]">
                Hair that feels like yours.
              </h1>
              <p className="mt-7 max-w-[38ch] text-pretty text-[16px] leading-relaxed text-muted-foreground">
                A private house for single-donor wigs, bundles and closures — finished in studio, then worn
                as if they grew from you.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link href="#shop" className={buttonClass('solid')}>
                  Shop the collection
                </Link>
                <Link href="#about" className={buttonClass('outline')}>
                  Our story
                </Link>
              </div>
            </div>

            <dl className="mt-16 grid grid-cols-3 gap-4 border-t border-[#c9a84c]/35 pt-8">
              <div>
                <dt className="font-display text-3xl italic text-[#8a6820]">2019</dt>
                <dd className="label-mono mt-1 text-faint">Founded</dd>
              </div>
              <div>
                <dt className="font-display text-3xl italic text-[#8a6820]">2</dt>
                <dd className="label-mono mt-1 text-faint">Studios</dd>
              </div>
              <div>
                <dt className="font-display text-3xl italic text-[#8a6820]">100%</dt>
                <dd className="label-mono mt-1 text-faint">Single donor</dd>
              </div>
            </dl>
          </div>

          <div className="relative min-h-[58vh] lg:col-span-7 lg:min-h-full">
            <Image
              src="/images/hero-salon.png"
              alt="Biana HAIR studio interior"
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#faf7f2]/40 lg:to-[#faf7f2]/25" />

            <div className="absolute bottom-8 right-6 hidden lg:block">
              <div className="flex h-36 w-36 items-center justify-center rounded-full border-[3px] border-[#c9a84c] bg-white/95 shadow-[0_12px_40px_rgba(26,18,8,0.18)]">
                <span className="font-script text-6xl leading-none text-[#8a6820]">B</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-y border-[#c9a84c]/25 bg-white">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#8a6820]">
          <span>46 Plein Street</span>
          <span className="hidden sm:inline">Opposite Universal Church</span>
          <span>083 670 2112</span>
          <span className="hidden md:inline">By appointment</span>
        </div>
      </div>

      <section id="shop" className="scroll-mt-24 border-y border-[#c9a84c]/25 bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-24">
        <SectionHeading index="01" eyebrow="Shop" title="The collection" />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 border-y border-[#c9a84c]/25 bg-white">
        <div className="mx-auto grid max-w-[1400px] items-stretch gap-10 px-6 py-24 lg:grid-cols-12 lg:gap-14">
          <div className="relative w-full lg:col-span-5">
            <div className="pointer-events-none absolute -left-3 -top-3 z-10 h-14 w-14 border-l border-t border-[#c9a84c]" />
            <div className="relative min-h-[420px] h-full overflow-hidden rounded-md">
              <Image
                src="/biana/hero.jpg"
                alt="Portrait with long, voluminous waves"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-[center_18%]"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow">02 — About</p>
            <h2 className="mt-4 text-balance font-display text-5xl italic leading-[0.95] tracking-tight sm:text-6xl">
              Fewer pieces, made properly.
            </h2>
            <p className="mt-8 max-w-[46ch] text-pretty text-[16px] leading-relaxed text-muted-foreground">
              Biana HAIR began in 2019 with a refusal to sell hair we had not touched ourselves. Every
              bundle is single-donor. Every unit is plucked, tinted and cut in Johannesburg — never
              drop-shipped.
            </p>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
              <div>
                <dt className="font-display text-4xl italic">2019</dt>
                <dd className="label-mono mt-1 text-faint">Founded</dd>
              </div>
              <div>
                <dt className="font-display text-4xl italic">2</dt>
                <dd className="label-mono mt-1 text-faint">Studios</dd>
              </div>
              <div>
                <dt className="font-display text-4xl italic">4.9</dt>
                <dd className="label-mono mt-1 text-faint">Client rating</dd>
              </div>
            </dl>
            <Link href="/about" className={`${buttonClass('outline')} mt-10`}>
              Our standard
            </Link>
          </div>
        </div>

        <div className="border-t border-border">
          <div className="mx-auto grid max-w-[1400px] gap-px bg-border px-0 sm:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote key={t.author} className="bg-white px-8 py-12">
                <p className="font-display text-2xl italic leading-snug tracking-tight">“{t.quote}”</p>
                <footer className="label-mono mt-8 text-faint">
                  {t.author} · {t.city}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-white">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">03 — Contact</p>
          <h2 className="mt-4 text-balance font-display text-5xl italic tracking-tight">
            Come by, or write.
          </h2>
          <div className="mt-10 border-t border-border pt-8">
            <h3 className="font-display text-3xl italic tracking-tight">Johannesburg</h3>
            <p className="mt-2 text-[15px] text-muted-foreground">46 Plein Street</p>
            <p className="text-[15px] text-muted-foreground">Opposite Universal Church</p>
            <p className="label-mono mt-5 text-faint">Mon – Fri · 09:00 – 18:00</p>
            <p className="label-mono mt-1 text-faint">Sat · 09:00 – 14:00</p>
          </div>
          <div className="mt-8">
            <p className="label-mono text-faint">Direct</p>
            <p className="mt-3 text-[15px] text-muted-foreground">083 670 2112</p>
            <p className="text-[15px] text-muted-foreground">info@bianahairsalon.com</p>
            <a
              href="https://www.instagram.com/m.biana?igsi=dGI3NHNvZWJxNHhu"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="border border-border bg-white p-8 lg:col-span-7">
          <HomeContactForm />
        </div>
        </div>
      </section>
    </>
  )
}
