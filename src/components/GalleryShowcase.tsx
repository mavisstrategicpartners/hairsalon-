'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react'
import {
  galleryFilters,
  galleryItems,
  type GalleryCategory,
  type GalleryItem,
} from '@/data/gallery'

export default function GalleryShowcase({ preview = false }: { preview?: boolean }) {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('all')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const items = useMemo(() => {
    if (preview) {
      return galleryItems.filter((item) => item.featured).slice(0, 6)
    }

    return galleryItems.filter(
      (item) => activeFilter === 'all' || item.category === activeFilter
    )
  }, [activeFilter, preview])

  const activeItem = activeIndex === null ? null : items[activeIndex]

  const closeLightbox = () => setActiveIndex(null)

  const showPrevious = () => {
    setActiveIndex((current) => {
      if (current === null || items.length === 0) return current
      return (current - 1 + items.length) % items.length
    })
  }

  const showNext = () => {
    setActiveIndex((current) => {
      if (current === null || items.length === 0) return current
      return (current + 1) % items.length
    })
  }

  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, items.length])

  return (
    <>
      {!preview && (
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {galleryFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => {
                setActiveFilter(filter.id)
                setActiveIndex(null)
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeFilter === filter.id
                  ? 'bg-[#d4653f] text-white shadow-sm'
                  : 'border border-[#d4653f]/30 bg-white text-[#d4653f] hover:bg-[#d4653f]/10'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}

      <div
        className={
          preview
            ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
            : 'columns-1 gap-5 sm:columns-2 lg:columns-3'
        }
      >
        {items.map((item, index) => (
          <GalleryCard
            key={item.id}
            item={item}
            preview={preview}
            onOpen={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {preview && (
        <div className="mt-12 text-center">
          <Link href="/gallery">
            <span className="inline-flex items-center justify-center rounded-full border-2 border-[#d4653f] px-8 py-3 text-lg font-medium text-[#d4653f] transition hover:bg-[#d4653f] hover:text-white">
              See All Work
            </span>
          </Link>
        </div>
      )}

      {activeItem && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Close gallery viewer"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              showPrevious()
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 md:left-6"
            aria-label="Previous item"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <figure
            className="relative max-h-[88vh] w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            {activeItem.type === 'video' ? (
              <video
                src={activeItem.src}
                controls
                autoPlay
                className="max-h-[76vh] w-full rounded-2xl bg-black object-contain"
              />
            ) : (
              <div className="relative mx-auto max-h-[76vh]">
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  width={1200}
                  height={1600}
                  className="mx-auto max-h-[76vh] w-auto rounded-2xl object-contain"
                />
              </div>
            )}
            <figcaption className="mt-4 text-center text-white">
              <p className="text-lg font-semibold">{activeItem.title}</p>
              <p className="mt-1 text-sm text-white/75">{activeItem.description}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#f3c7b2]">
                {activeIndex + 1} / {items.length}
              </p>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              showNext()
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 md:right-6"
            aria-label="Next item"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
      )}
    </>
  )
}

function GalleryCard({
  item,
  onOpen,
  preview = false,
}: {
  item: GalleryItem
  onOpen: () => void
  preview?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`block w-full overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-gray-200/80 transition hover:-translate-y-0.5 hover:shadow-md ${
        preview ? '' : 'mb-5 break-inside-avoid'
      }`}
    >
      <div className="relative">
        {item.type === 'video' ? (
          <video
            src={item.src}
            muted
            playsInline
            preload="metadata"
            className="h-auto w-full object-cover"
          />
        ) : (
          <Image
            src={item.src}
            alt={item.alt}
            width={720}
            height={960}
            className="h-auto w-full object-cover"
          />
        )}
        {item.type === 'video' && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="rounded-full bg-[#d4653f] p-3 text-white shadow-lg">
              <Play className="h-5 w-5 fill-white" />
            </span>
          </span>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-black/75 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-white">
          {item.type === 'video' ? 'Video' : item.category}
        </span>
      </div>
      <div className="p-4">
        <h2 className="text-[15px] font-bold text-gray-900">{item.title}</h2>
        <p className="mt-1 text-sm text-gray-500">{item.description}</p>
      </div>
    </button>
  )
}
