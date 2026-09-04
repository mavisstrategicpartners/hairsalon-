import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'solid' | 'outline' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-3 px-[22px] py-[9px] font-sans text-[0.72rem] font-bold uppercase tracking-[0.18em] transition-all duration-300 disabled:opacity-50'

const variants: Record<Variant, string> = {
  solid:
    'border-2 border-[#c9a84c] bg-[#c9a84c] text-[#070707] hover:bg-[#e8c97a] hover:border-[#e8c97a]',
  outline:
    'border-2 border-[#c9a84c] bg-transparent text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#070707]',
  ghost: 'px-0 py-0 text-[#c9a84c] underline-offset-4 hover:text-[#e8c97a] hover:underline',
}

export function ActionButton({
  children,
  variant = 'solid',
  className,
  type = 'button',
  onClick,
  disabled,
}: {
  children: ReactNode
  variant?: Variant
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </button>
  )
}

export const buttonClass = (variant: Variant = 'solid', className?: string) =>
  cn(base, variants[variant], className)
