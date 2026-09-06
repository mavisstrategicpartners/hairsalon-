import Image from 'next/image'
import Link from 'next/link'
import { workGallery } from '@/data/catalog'
import { PageHeader } from '@/components/site/PageHeader'
import { buttonClass } from '@/components/site/Button'

export default function GalleryPage() {
  return (
    <div className="bg-white">
      <PageHeader
        eyebrow="Gallery"
        title="Work from the studio."
        intro="Installs, units and bundles from Johannesburg. A short preview lives on the homepage — this is the full set."
      />
      <section className="mx-auto max-w-[1400px] px-6 py-14">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {workGallery.map((g) => (
            <div key={g.src} className="relative aspect-[3/4] overflow-hidden">
              <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
        <Link href="/shop" className={`${buttonClass('outline')} mt-12`}>
          Shop Hair
        </Link>
      </section>
    </div>
  )
}
