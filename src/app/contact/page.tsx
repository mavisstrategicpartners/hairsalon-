'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/site/PageHeader'
import { ActionButton } from '@/components/site/Button'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="bg-[#070707]">
      <PageHeader
        eyebrow="03 — Contact"
        title="Come by, or write to us."
        intro="Orders and visits — we reply as soon as we can."
      />

      <section className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="border-b border-border py-8 first:pt-0">
            <h2 className="font-display text-3xl italic tracking-tight">Johannesburg</h2>
            <p className="mt-1 text-[15px] text-muted-foreground">46 Plein Street</p>
            <p className="mt-1 text-[15px] text-muted-foreground">Opposite Universal Church</p>
            <p className="label-mono mt-4 text-faint">Mon – Fri · 09:00 – 18:00</p>
            <p className="label-mono mt-1 text-faint">Sat · 09:00 – 14:00</p>
          </div>
          <div className="py-8">
            <p className="label-mono text-faint">Direct</p>
            <p className="mt-3 text-[15px] text-muted-foreground">083 670 2112</p>
            <p className="text-[15px] text-muted-foreground">info@bianahairsalon.com</p>
            <a
              href="https://www.instagram.com/m.biana?igsi=dGI3NHNvZWJxNHhu"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="border border-[#c9a84c]/30 bg-[#111111] p-8">
            {submitted ? (
              <p className="text-[15px] text-muted-foreground">Message sent. We will reply shortly.</p>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  setSubmitted(true)
                }}
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="label-mono text-faint">Name</label>
                    <input
                      required
                      placeholder="Your name"
                      className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm placeholder:text-faint"
                    />
                  </div>
                  <div>
                    <label className="label-mono text-faint">Email</label>
                    <input
                      required
                      type="email"
                      placeholder="you@email.co.za"
                      className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm placeholder:text-faint"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="label-mono text-faint">Subject</label>
                  <select className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm">
                    <option>An order</option>
                    <option>A service</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div className="mt-6">
                  <label className="label-mono text-faint">Message</label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Tell us what you're after"
                    className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm placeholder:text-faint"
                  />
                </div>
                <ActionButton type="submit" className="mt-8">
                  Send message
                </ActionButton>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
