import GalleryShowcase from '@/components/GalleryShowcase'

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.28em] text-[#d4653f]">
          Portfolio
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          Our Work
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-gray-500">
          Photos and clips from recent installs, units, and bundles at Biana Hair Salon.
          Tap any item to view it larger.
        </p>
      </div>

      <GalleryShowcase />
    </div>
  )
}
