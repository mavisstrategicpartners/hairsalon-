'use client'

import { useState } from 'react'
import { ActionButton } from '@/components/site/Button'

export function HomeContactForm() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return <p className="text-[15px] text-muted-foreground">Message sent. We will reply shortly.</p>
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
          rows={5}
          placeholder="Tell us what you're after"
          className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm placeholder:text-faint"
        />
      </div>
      <ActionButton type="submit" className="mt-8">
        Send message
      </ActionButton>
    </form>
  )
}
