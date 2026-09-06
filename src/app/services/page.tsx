import Link from 'next/link'
import { serviceProducts } from '@/data/catalog'
import { ServiceCard } from '@/components/site/ServiceCard'
import { buttonClass } from '@/components/site/Button'

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-[#c9a84c]/30 bg-white">
        <div className="mx-auto max-w-[1400px] px-6 pb-10 pt-16">
          <p className="eyebrow">Studio</p>
          <h1 className="mt-4 max-w-[12ch] text-balance font-display text-[clamp(3rem,7vw,5.8rem)] italic leading-[0.9] tracking-tight">
            Services
          </h1>
          <p className="mt-5 max-w-[48ch] text-pretty text-[15px] leading-relaxed text-muted-foreground">
            Installs, cuts, colour and revamps in Johannesburg. Hair to wear is in Shop — this page is the chair
            only.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-[1400px] px-6 py-14">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {serviceProducts.map((p) => (
            <ServiceCard key={p.slug} service={p} />
          ))}
        </div>
        <Link href="/shop" className={`${buttonClass('ghost')} mt-12`}>
          Shop hair instead →
        </Link>
      </section>
    </div>
  )
}
