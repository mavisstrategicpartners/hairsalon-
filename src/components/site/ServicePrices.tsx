import type { StudioServicePrice } from '@/data/studio-services'
import { cn } from '@/lib/utils'

export function ServicePrices({ prices, className }: { prices: StudioServicePrice[]; className?: string }) {
  if (prices.length === 0) return null
  return (
    <dl className={cn('space-y-1.5 border-t border-[#c9a84c]/30 pt-4', className)}>
      {prices.map((price) => (
        <div key={`${price.label ?? 'price'}-${price.amount}`} className="flex items-baseline justify-between gap-4">
          <dt className="label-mono text-[#1a1208]/45">{price.label ?? 'Price'}</dt>
          <dd className="font-display text-[1.35rem] italic tracking-tight text-[#1a1208]">{price.amount}</dd>
        </div>
      ))}
    </dl>
  )
}
