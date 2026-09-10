import Image from 'next/image'
import Link from 'next/link'
import { formatZar, serviceDuration, type Product } from '@/data/catalog'
import { buttonClass } from '@/components/site/Button'

export function ServiceCard({ service }: { service: Product }) {
  return (
    <article className="flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f4efe8]">
        <Image
          src={service.image}
          alt={service.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <h3 className="font-display text-[1.45rem] italic tracking-tight">{service.name}</h3>
        <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[#1a1208]/55">{service.description}</p>
        <div className="mt-5 flex items-end justify-between gap-4">
          <p className="text-[15px] tracking-wide">{formatZar(service.price)}</p>
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#1a1208]/40">
            {serviceDuration(service)}
          </p>
        </div>
        <Link href={`/contact?service=${service.slug}`} className={`${buttonClass('solid')} mt-6 w-full`}>
          Book Now
        </Link>
        <Link
          href={`/product/${service.slug}`}
          className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e56e1a] hover:text-[#1a1208]"
        >
          Buy voucher →
        </Link>
      </div>
    </article>
  )
}
