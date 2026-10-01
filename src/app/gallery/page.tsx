import Image from 'next/image'
import Link from 'next/link'
import { listGalleryPhotos } from '@/lib/catalog/shop-catalogue'
import { PageHeader } from '@/components/site/PageHeader'
import { buttonClass } from '@/components/site/Button'

function enquireHref(name: string) {
  const params = new URLSearchParams()
  params.set('product', name)
  return `/contact?${params.toString()}`
}

export default function GalleryPage() {
  const photos = listGalleryPhotos()
  return (
    <div className="bg-white">
      <PageHeader
        eyebrow="Gallery"
        title="The hair."
        intro="Photographs of the pieces. Tap a photo to open it in Shop, or enquire about it."
      />
      <section className="mx-auto max-w-[1400px] px-6 py-14">
        <div className="grid grid-cols-2 items-start gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
          {photos.map(({ src, product }, index) => (
            <div key={src} className="flex flex-col">
              <Link
                href={`/product/${product.slug}`}
                className="group relative aspect-[3/4] overflow-hidden bg-white"
              >
                <Image
                  src={src}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  priority={index < 4}
                />
              </Link>
              <p className="mt-3 font-display text-[1.15rem] italic leading-snug tracking-tight text-[#1a1208]">
                {product.name}
              </p>
              <Link
                href={enquireHref(product.name)}
                className="mt-2 inline-block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e56e1a] underline-offset-4 hover:text-[#1a1208] hover:underline"
              >
                Enquire about this product
              </Link>
            </div>
          ))}
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
