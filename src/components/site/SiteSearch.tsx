'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatZar, hairProducts } from '@/data/catalog'

export function SiteSearch({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [q, setQ] = useState('')

  useEffect(() => {
    if (open) {
      setQ('')
      const t = window.setTimeout(() => inputRef.current?.focus(), 20)
      return () => window.clearTimeout(t)
    }
  }, [open])

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (term.length < 2) return []
    return hairProducts.filter((p) => `${p.name} ${p.tag} ${p.description}`.toLowerCase().includes(term)).slice(0, 8)
  }, [q])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div
        className="mx-auto mt-16 w-[min(92vw,560px)] border border-[#c9a84c]/40 bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const term = q.trim()
            if (!term) return
            router.push(`/shop?q=${encodeURIComponent(term)}`)
            onClose()
          }}
        >
          <label className="label-mono text-faint">Search hair</label>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Bundles, closures, wigs…"
            className="mt-2 w-full border border-[#c9a84c]/40 px-4 py-3 text-sm"
          />
        </form>
        <ul className="mt-4 divide-y divide-border">
          {results.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/product/${p.slug}`}
                onClick={onClose}
                className="flex items-center justify-between gap-4 py-3 text-sm hover:text-[#8a6820]"
              >
                <span>{p.name}</span>
                <span className="shrink-0 font-mono text-[12px] text-[#c9a84c]">{formatZar(p.price)}</span>
              </Link>
            </li>
          ))}
        </ul>
        {q.trim().length >= 2 && results.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No matching hair. Try Shop instead.</p>
        ) : null}
        <button type="button" onClick={onClose} className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a6820]">
          Close
        </button>
      </div>
    </div>
  )
}
