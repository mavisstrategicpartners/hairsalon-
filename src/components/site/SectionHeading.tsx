import type { ReactNode } from 'react'

export function SectionHeading({
  index,
  eyebrow,
  title,
  action,
}: {
  index?: string
  eyebrow: string
  title: string
  action?: ReactNode
}) {
  return (
    <div className="mb-12 flex items-end justify-between gap-6">
      <div>
        <p className="eyebrow">
          {index ? `${index} — ` : ''}
          {eyebrow}
        </p>
        <h2 className="mt-3 text-balance font-display text-4xl italic tracking-tight sm:text-5xl">
          {title}
        </h2>
      </div>
      {action ? <div className="hidden sm:block">{action}</div> : null}
    </div>
  )
}
