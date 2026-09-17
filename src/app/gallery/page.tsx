import Image from 'next/image'
import Link from 'next/link'
import {
  galleryEnquireHref,
  galleryItemHasPrice,
  galleryItemName,
  salonGallery,
} from '@/data/catalog'
import { PageHeader } from '@/components/site/PageHeader'
import { buttonClass } from '@/components/site/Button'

export default function GalleryPage() {
  return (
    <div className="bg-white">
      <PageHeader
        eyebrow="Gallery"
        title="The hair."
        intro="Photographs of the pieces. Enquire about any of them, or tap a priced product to open it in Shop."
      />
      <section className="mx-auto max-w-[1400px] px-6 py-14">
        <div className="grid grid-cols-2 items-start gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
          {salonGallery.map((g, index) => {
            const image = (
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                priority={index < 4}
              />
            )
            const frameClass = 'group relative aspect-[3/4] overflow-hidden bg-[#f4efe8]'
            const name = galleryItemName(g)
            const photo =
              galleryItemHasPrice(g) && g.href ? (
                <Link href={g.href} className={frameClass}>
                  {image}
                </Link>
              ) : (
                <div className={frameClass}>{image}</div>
              )
            return (
              <div key={g.src} className="flex flex-col">
                {photo}
                {name ? (
                  <p className="mt-3 font-display text-[1.15rem] italic leading-snug tracking-tight text-[#1a1208]">
                    {name}
                  </p>
                ) : null}
                <Link
                  href={galleryEnquireHref(g)}
                  className="mt-2 inline-block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e56e1a] underline-offset-4 hover:text-[#1a1208] hover:underline"
                >
                  Enquire about this product
                </Link>
              </div>
            )
          })}
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/shop" className={buttonClass('outline')}>
            Shop Hair
          </Link>
          <Link href="/contact" className={buttonClass('ghost')}>
            Book a Service →
          </Link>
        </div>
      </section>
    </div>
  )
}
