import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { buttonClass } from '@/components/site/Button'
import {
  studioServiceEnquireHref,
  studioServices,
  type StudioService,
} from '@/data/studio-services'

export const metadata: Metadata = {
  title: 'Our Services — Biana HAIR',
  description: 'Installations, sew-in and micro-bonding at Biana Hair Salon in Johannesburg.',
}

const serviceImageClass = {
  installations:
    'object-cover object-[center_22%] transition-transform duration-700 group-hover:scale-[1.04]',
  'sew-in': 'object-cover object-[center_42%] transition-transform duration-700 group-hover:scale-[1.04]',
  'micro-bonding':
    'object-cover object-[center_32%] transition-transform duration-700 group-hover:scale-[1.04]',
} as const

function ServiceVisual({ service, priority }: { service: StudioService; priority?: boolean }) {
  if (service.image) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#f4efe8]">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 80vw, 100vw"
          className={serviceImageClass[service.slug]}
        />
      </div>
    )
  }

  return (
    <div className="relative flex aspect-[4/5] items-end overflow-hidden bg-[#f4efe8] px-8 pb-10">
      <p className="max-w-[8ch] font-display text-[clamp(2.6rem,6vw,3.6rem)] italic leading-[0.9] tracking-tight text-[#1a1208]">
        {service.name}
      </p>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-[#c9a84c]/30 bg-white">
        <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-16 sm:px-8 lg:pb-16 lg:pt-20">
          <p className="eyebrow animate-fade-up">Studio</p>
          <h1 className="mt-4 max-w-[12ch] animate-fade-up text-balance font-display text-[clamp(3rem,7vw,5.8rem)] italic leading-[0.9] tracking-tight">
            Our Services
          </h1>
          <p className="mt-6 max-w-[46ch] animate-fade-up text-pretty text-[15px] leading-relaxed text-muted-foreground">
            Installations, sew-in and micro-bonding at the Johannesburg studio. Enquire about the service
            you need — hair to wear is in Shop.
          </p>
          <ul className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
            {studioServices.map((service, index) => (
              <li key={service.slug}>
                <a
                  href={`#${service.slug}`}
                  className="label-mono text-[#1a1208]/45 transition-colors hover:text-[#1a1208]"
                >
                  {String(index + 1).padStart(2, '0')} {service.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#faf7f2]">
        <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8 lg:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-7 xl:gap-10">
            {studioServices.map((service, index) => (
              <article
                key={service.slug}
                id={service.slug}
                className="group flex scroll-mt-28 flex-col overflow-hidden rounded-md border border-[#c9a84c]/35 bg-white"
              >
                <div className="p-3 pb-0">
                  <ServiceVisual service={service} priority={index === 0} />
                </div>
                <div className="flex flex-1 flex-col px-6 pb-7 pt-5 sm:px-7">
                  <p className="label-mono text-[#c9a84c]">{String(index + 1).padStart(2, '0')}</p>
                  <h2 className="mt-3 font-display text-[clamp(1.85rem,3vw,2.35rem)] italic leading-[0.95] tracking-tight">
                    {service.name}
                  </h2>
                  {service.description ? (
                    <p className="mt-4 flex-1 text-[14px] leading-relaxed text-[#1a1208]/55">
                      {service.description}
                    </p>
                  ) : (
                    <div className="flex-1" />
                  )}
                  <Link
                    href={studioServiceEnquireHref(service)}
                    className={`${buttonClass('solid')} mt-8 w-full`}
                  >
                    Enquire Now
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#c9a84c]/30 bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8 lg:py-20">
          <p className="eyebrow">Enquire</p>
          <h2 className="mt-4 max-w-[14ch] text-balance font-display text-[clamp(2.2rem,5vw,4rem)] italic leading-[0.94] tracking-tight">
            Write to us about a service
          </h2>
          <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-muted-foreground">
            Tell us whether you need installations, sew-in or micro-bonding. We reply as soon as we can.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className={buttonClass('solid')}>
              Enquire Now
            </Link>
            <Link href="/shop" className={buttonClass('ghost')}>
              Shop hair instead →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
