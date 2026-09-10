import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'solid' | 'outline' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 min-h-11 px-6 py-2.5 font-sans text-[0.62rem] font-bold uppercase tracking-[0.18em] transition-colors duration-200 disabled:opacity-50'

const variants: Record<Variant, string> = {
  solid:
    'border border-[#1a1208] bg-[#1a1208] text-white hover:border-[#e56e1a] hover:bg-[#e56e1a]',
  outline:
    'border border-[#1a1208] bg-transparent text-[#1a1208] hover:bg-[#1a1208] hover:text-white',
  ghost: 'px-0 py-0 min-h-0 text-[#e56e1a] underline-offset-4 hover:text-[#1a1208] hover:underline',
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
