'use client'

import { useState } from 'react'
import { ActionButton } from '@/components/site/Button'

const fieldClass =
  'mt-2 w-full border border-[#c9a84c]/40 bg-white px-4 py-3 text-sm text-[#070707] placeholder:text-black/40'

export function HomeContactForm() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return <p className="text-[15px] text-black/60">Message sent. We will reply shortly.</p>
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
      }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="label-mono text-[#c9a84c]">Name</label>
          <input required placeholder="Your name" className={fieldClass} />
        </div>
        <div>
          <label className="label-mono text-[#c9a84c]">Email</label>
          <input required type="email" placeholder="you@email.co.za" className={fieldClass} />
        </div>
      </div>
      <div className="mt-6">
        <label className="label-mono text-[#c9a84c]">Subject</label>
        <select className={fieldClass}>
          <option>An order</option>
          <option>A service</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="mt-6">
        <label className="label-mono text-[#c9a84c]">Message</label>
        <textarea required rows={5} placeholder="Tell us what you're after" className={fieldClass} />
      </div>
      <ActionButton type="submit" className="mt-8">
        Send message
      </ActionButton>
    </form>
  )
}
