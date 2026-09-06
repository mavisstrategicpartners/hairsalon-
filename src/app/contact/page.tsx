'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { PageHeader } from '@/components/site/PageHeader'
import { ActionButton } from '@/components/site/Button'
import { instagramUrl, serviceProducts } from '@/data/catalog'

function ContactForm() {
  const searchParams = useSearchParams()
  const serviceSlug = searchParams.get('service')
  const service = serviceProducts.find((p) => p.slug === serviceSlug)
  const [submitted, setSubmitted] = useState(false)
  const defaultSubject = service ? 'A service' : 'An order'

  return (
    <div className="border border-[#c9a84c]/40 bg-white p-8 text-[#070707]">
      {submitted ? (
        <p className="text-[15px] text-muted-foreground">Message sent. We will reply shortly.</p>
      ) : (
        <form
          key={service?.slug ?? 'general'}
          onSubmit={(event) => {
            event.preventDefault()
            setSubmitted(true)
          }}
        >
          {service ? (
            <p className="mb-6 text-sm text-muted-foreground">
              Booking enquiry for <span className="text-[#1a1208]">{service.name}</span>.
            </p>
          ) : null}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="label-mono text-[#c9a84c]">Name</label>
              <input
                required
                placeholder="Your name"
                className="mt-2 w-full border border-[#c9a84c]/40 bg-white px-4 py-3 text-sm text-[#070707] placeholder:text-black/40"
              />
            </div>
            <div>
              <label className="label-mono text-[#c9a84c]">Email</label>
              <input
                required
                type="email"
                placeholder="you@email.co.za"
                className="mt-2 w-full border border-[#c9a84c]/40 bg-white px-4 py-3 text-sm text-[#070707] placeholder:text-black/40"
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="label-mono text-[#c9a84c]">Subject</label>
            <select
              defaultValue={defaultSubject}
              className="mt-2 w-full border border-[#c9a84c]/40 bg-white px-4 py-3 text-sm text-[#070707]"
            >
              <option>An order</option>
              <option>A service</option>
              <option>Something else</option>
            </select>
          </div>
          <div className="mt-6">
            <label className="label-mono text-[#c9a84c]">Message</label>
            <textarea
              required
              rows={6}
              defaultValue={service ? `I would like to book ${service.name}.` : ''}
              placeholder="Tell us what you're after"
              className="mt-2 w-full border border-[#c9a84c]/40 bg-white px-4 py-3 text-sm text-[#070707] placeholder:text-black/40"
            />
          </div>
          <ActionButton type="submit" className="mt-8">
            Send message
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
            <p className="label-mono mt-4 text-faint">Mon – Fri · 09:00 – 18:00</p>
            <p className="label-mono mt-1 text-faint">Sat · 09:00 – 14:00</p>
            <p className="label-mono mt-1 text-faint">Sunday · Closed</p>
          </div>
          <div className="border-b border-border py-8">
            <p className="label-mono text-faint">Direct</p>
            <a href="tel:0836702112" className="mt-3 block text-[15px] text-muted-foreground hover:text-foreground">
              083 670 2112
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
            <p className="mt-2 text-[15px] text-muted-foreground">Pay by EFT. Free courier over R2 500.</p>
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
