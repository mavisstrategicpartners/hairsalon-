import Image from 'next/image'
import Link from 'next/link'
import { PageHeader } from '@/components/site/PageHeader'
import { buttonClass } from '@/components/site/Button'

export default function AboutPage() {
  return (
    <div className="bg-[#070707]">
      <PageHeader
        eyebrow="02 — About"
        title="Fewer pieces, made properly."
        intro="Biana HAIR began in 2019 with a refusal to sell hair we had not touched ourselves."
      />

      <section className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 lg:grid-cols-12">
        <div className="relative mx-auto h-[220px] w-[170px] overflow-hidden sm:h-[250px] sm:w-[190px] lg:col-span-3 lg:mx-0">
          <Image
            src="/images/about-portrait.png"
            alt="Portrait of a woman wearing a sleek straight unit"
            fill
            sizes="190px"
            className="object-cover object-[center_15%]"
          />
        </div>
        <div className="lg:col-span-9 lg:pt-2">
          <p className="eyebrow">Our standard</p>
          <h2 className="mt-3 text-balance font-display text-4xl italic tracking-tight">
            Single donor, or not at all
          </h2>
          <p className="mt-6 text-pretty text-[15px] leading-relaxed text-muted-foreground">
            Mixed-donor hair looks identical in a photograph and falls apart in month three. Every bundle we
            sell comes from one head of hair, with cuticles aligned in one direction, so it behaves the same
            way from the weft to the tip.
          </p>
          <p className="mt-4 text-pretty text-[15px] leading-relaxed text-muted-foreground">
            Units are plucked, tinted and cut in our Johannesburg studio, not drop-shipped. That is why the
            collection stays small and why a piece sells out rather than being restocked overnight.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
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
        </div>
      </section>

      <section className="border-y border-[#c9a84c]/30 bg-[#070707]">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 lg:grid-cols-12">
          <div className="relative aspect-[4/5] overflow-hidden lg:col-span-5">
            <Image
              src="/images/about-work.png"
              alt="Stylist with finished units in the Johannesburg studio"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[center_20%]"
            />
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow">How we work</p>
            <ol className="mt-6">
              {[
                {
                  n: '01',
                  t: 'Sourced',
                  d: 'Direct from a small group of donors, tested for shedding before it enters the studio.',
                },
                {
                  n: '02',
                  t: 'Finished',
                  d: 'Plucked, tinted, ventilated and cut by hand — never machine-finished in bulk.',
                },
                {
                  n: '03',
                  t: 'Fitted',
                  d: 'Installed in studio, or shipped sealed with aftercare written for your texture.',
                },
              ].map((s) => (
                <li key={s.n} className="flex gap-8 border-b border-border py-6 last:border-0">
                  <span className="font-mono text-[11px] text-primary">{s.n}</span>
                  <div>
                    <h3 className="font-display text-2xl italic tracking-tight">{s.t}</h3>
                    <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
                      {s.d}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <Link href="/shop" className={buttonClass('outline', 'mt-8')}>
              Shop the collection <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
