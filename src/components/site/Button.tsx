import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'solid' | 'outline' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-3 px-[22px] py-[9px] font-sans text-[0.72rem] font-bold uppercase tracking-[0.18em] transition-all duration-300 disabled:opacity-50'

const variants: Record<Variant, string> = {
  solid: 'border-2 border-[#8a6820] bg-[#8a6820] text-white hover:bg-[#c9a84c] hover:border-[#c9a84c]',
  outline: 'border-2 border-[#8a6820] bg-transparent text-[#2c2010] hover:bg-[#8a6820] hover:text-white',
  ghost: 'px-0 py-0 text-[#8a6820] underline-offset-4 hover:text-[#1a1208] hover:underline',
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
