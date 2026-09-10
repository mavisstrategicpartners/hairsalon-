import Image from 'next/image'
import Link from 'next/link'
import { hairCollections } from '@/data/catalog'
import { PageHeader } from '@/components/site/PageHeader'
import { buttonClass } from '@/components/site/Button'

export default function CollectionsPage() {
  return (
    <div className="bg-white">
      <PageHeader
        eyebrow="Collections"
        title="Shop by collection."
        intro="Bundles and closures first, then textures and units."
      />
      <section className="mx-auto max-w-[1400px] px-6 py-14">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
          {hairCollections.map((c) => (
            <Link key={c.slug} href={`/shop/${c.slug}`} className="group block">
              <span className="relative block aspect-[4/5] overflow-hidden bg-[#f7f4ee]">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(min-width: 768px) 30vw, 50vw"
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </span>
              <h2 className="mt-3 font-display text-2xl italic tracking-tight">{c.name}</h2>
              <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-muted-foreground">{c.description}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a6820]">Shop now →</p>
            </Link>
          ))}
        </div>
        <Link href="/shop" className={`${buttonClass('outline')} mt-12`}>
          View all products
        </Link>
      </section>
    </div>
  )
}
