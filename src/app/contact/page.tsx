'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { PageHeader } from '@/components/site/PageHeader'
import { ActionButton } from '@/components/site/Button'
import { instagramUrl, serviceProducts } from '@/data/catalog'
import { studioServiceByQuery } from '@/data/studio-services'

/** International format (27…) without the leading 0, as wa.me requires. */
const studioWhatsApp = {
  Johannesburg: '27836702112',
  Pretoria: '27792228318',
} as const

type Studio = keyof typeof studioWhatsApp

function isStudio(value: unknown): value is Studio {
  return typeof value === 'string' && value in studioWhatsApp
}

function whatsAppHref(form: HTMLFormElement): { studio: Studio; href: string } {
  const data = new FormData(form)
  const field = (name: string) => String(data.get(name) ?? '').trim()
  const chosen = data.get('studio')
  const studio: Studio = isStudio(chosen) ? chosen : 'Johannesburg'
  const text = [
    'Hi Biana HAIR,',
    '',
    field('message'),
    '',
    `Name: ${field('name')}`,
    `Email: ${field('email')}`,
    `Studio: ${studio}`,
    `Subject: ${field('subject')}`,
  ].join('\n')
  return { studio, href: `https://wa.me/${studioWhatsApp[studio]}?text=${encodeURIComponent(text)}` }
}

function ContactForm() {
  const searchParams = useSearchParams()
  const serviceParam = searchParams.get('service')
  const studioService = studioServiceByQuery(serviceParam)
  const catalogService = studioService
    ? undefined
    : serviceProducts.find((p) => p.slug === serviceParam)
  const serviceName = studioService?.name ?? catalogService?.name
  const productName = searchParams.get('product')?.trim() || ''
  const galleryEnquire = searchParams.get('enquire') === '1'
  const [sent, setSent] = useState<{ studio: Studio; href: string } | null>(null)
  const defaultSubject = serviceName ? 'A service' : productName || galleryEnquire ? 'Something else' : 'An order'
  const defaultMessage = studioService
    ? `I would like to enquire about ${studioService.name}.`
    : catalogService
      ? `I would like to book ${catalogService.name}.`
      : productName
        ? `I would like to enquire about the ${productName}.`
        : galleryEnquire
          ? 'I would like to enquire about this product.'
          : ''

  return (
    <div className="border border-[#c9a84c]/40 bg-white p-8 text-[#070707]">
      {sent ? (
        <div>
          <p className="text-[15px] text-muted-foreground">
            WhatsApp has opened with your message to our {sent.studio} studio. Press send in WhatsApp and we
            will reply shortly.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <a
              href={sent.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1a1208] underline underline-offset-4"
            >
              WhatsApp didn&apos;t open? Tap here
            </a>
            <button
              type="button"
              onClick={() => setSent(null)}
              className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1a1208]/45 hover:text-[#1a1208]"
            >
              Write another message
            </button>
          </div>
        </div>
      ) : (
        <form
          key={studioService?.slug ?? catalogService?.slug ?? productName ?? (galleryEnquire ? 'gallery-enquire' : 'general')}
          onSubmit={(event) => {
            event.preventDefault()
            const message = whatsAppHref(event.currentTarget)
            window.open(message.href, '_blank', 'noopener,noreferrer')
            setSent(message)
          }}
        >
          {studioService ? (
            <p className="mb-6 text-sm text-muted-foreground">
              Service enquiry for <span className="text-[#1a1208]">{studioService.name}</span>.
            </p>
          ) : catalogService ? (
            <p className="mb-6 text-sm text-muted-foreground">
              Booking enquiry for <span className="text-[#1a1208]">{catalogService.name}</span>.
            </p>
          ) : productName ? (
            <p className="mb-6 text-sm text-muted-foreground">
              Product enquiry for <span className="text-[#1a1208]">{productName}</span>.
            </p>
          ) : galleryEnquire ? (
            <p className="mb-6 text-sm text-muted-foreground">
              Product enquiry from the Gallery.
            </p>
          ) : null}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="label-mono text-[#c9a84c]">Name</label>
              <input
                required
                name="name"
                placeholder="Your name"
                className="mt-2 w-full border border-[#c9a84c]/40 bg-white px-4 py-3 text-sm text-[#070707] placeholder:text-black/40"
              />
            </div>
            <div>
              <label className="label-mono text-[#c9a84c]">Email</label>
              <input
                required
                name="email"
                type="email"
                placeholder="you@email.co.za"
                className="mt-2 w-full border border-[#c9a84c]/40 bg-white px-4 py-3 text-sm text-[#070707] placeholder:text-black/40"
              />
            </div>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <label className="label-mono text-[#c9a84c]">Studio</label>
              <select
                name="studio"
                defaultValue="Johannesburg"
                className="mt-2 w-full border border-[#c9a84c]/40 bg-white px-4 py-3 text-sm text-[#070707]"
              >
                <option>Johannesburg</option>
                <option>Pretoria</option>
              </select>
            </div>
            <div>
              <label className="label-mono text-[#c9a84c]">Subject</label>
              <select
                name="subject"
                defaultValue={defaultSubject}
                className="mt-2 w-full border border-[#c9a84c]/40 bg-white px-4 py-3 text-sm text-[#070707]"
              >
                <option>An order</option>
                <option>A service</option>
                <option>Something else</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <label className="label-mono text-[#c9a84c]">Message</label>
            <textarea
              required
              name="message"
              rows={6}
              defaultValue={defaultMessage}
              placeholder="Tell us what you're after"
              className="mt-2 w-full border border-[#c9a84c]/40 bg-white px-4 py-3 text-sm text-[#070707] placeholder:text-black/40"
            />
          </div>
          <ActionButton type="submit" className="mt-8">
            Send on WhatsApp
          </ActionButton>
        </form>
      )}
    </div>
  )
}

export default function ContactPage() {
  return (
    <div className="bg-white">
      <PageHeader
        eyebrow="Contact"
        title="Come by, or write to us."
        intro="Orders, bookings and visits — we reply as soon as we can."
      />

      <section className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="border-b border-border py-8 first:pt-0">
            <h2 className="font-display text-3xl italic tracking-tight">Johannesburg</h2>
            <p className="mt-1 text-[15px] text-muted-foreground">46 Plein Street</p>
            <p className="mt-1 text-[15px] text-muted-foreground">Opposite Universal Church</p>
            <p className="label-mono mt-4 text-faint">Mon – Sat · 08:30 – 19:00</p>
            <p className="label-mono mt-1 text-faint">Sunday · 09:00 – 16:00</p>
          </div>
          <div className="border-b border-border py-8">
            <h2 className="font-display text-3xl italic tracking-tight">Pretoria</h2>
            <p className="mt-1 text-[15px] text-muted-foreground">223 Central Street, Central House</p>
            <p className="mt-1 text-[15px] text-muted-foreground">3rd Floor, Salon 318</p>
            <p className="mt-1 text-[15px] text-muted-foreground">Pretoria Central</p>
            <p className="label-mono mt-4 text-faint">Mon – Sat · 08:30 – 19:00</p>
            <p className="label-mono mt-1 text-faint">Sunday · 09:00 – 16:00</p>
          </div>
          <div className="border-b border-border py-8">
            <p className="label-mono text-faint">Direct</p>
            <a href="tel:0836702112" className="mt-3 block text-[15px] text-muted-foreground hover:text-foreground">
              083 670 2112
            </a>
            <a href="tel:0792228318" className="block text-[15px] text-muted-foreground hover:text-foreground">
              079 222 8318
            </a>
            <a href="tel:0765329843" className="block text-[15px] text-muted-foreground hover:text-foreground">
              076 532 9843
            </a>
            <a
              href="mailto:info@bianahairsalon.com"
              className="block text-[15px] text-muted-foreground hover:text-foreground"
            >
              info@bianahairsalon.com
            </a>
          </div>
          <div className="border-b border-border py-8">
            <p className="label-mono text-faint">Social</p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
            >
              Instagram · @m.biana
            </a>
          </div>
          <div className="py-8">
            <p className="label-mono text-faint">Business</p>
            <p className="mt-3 text-[15px] text-muted-foreground">Biana HAIR (Pty) Ltd</p>
            <p className="text-[15px] text-muted-foreground">Prices in ZAR, VAT included</p>
            <p className="mt-2 text-[15px] text-muted-foreground">Pay by EFT. All orders are delivered via PostNet.</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Suspense fallback={<p className="text-muted-foreground">Loading form…</p>}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
