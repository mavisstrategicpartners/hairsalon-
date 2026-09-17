import Image from 'next/image'
import Link from 'next/link'
import { salonGallery } from '@/data/catalog'
import { PageHeader } from '@/components/site/PageHeader'
import { buttonClass } from '@/components/site/Button'

export default function GalleryPage() {
  return (
    <div className="bg-white">
      <PageHeader
        eyebrow="Gallery"
        title="The hair."
        intro="Photographs of the pieces currently in Shop. Tap a listed product photo to open it."
      />
      <section className="mx-auto max-w-[1400px] px-6 py-14">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
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
            const className = 'group relative aspect-[3/4] overflow-hidden bg-[#f4efe8]'
            return g.href ? (
              <Link key={g.src} href={g.href} className={className}>
                {image}
              </Link>
            ) : (
              <div key={g.src} className={className}>
                {image}
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
