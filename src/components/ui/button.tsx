import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold tracking-[0.16em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#c9a84c] text-[#070707] hover:bg-[#e8c97a]",
        destructive:
          "border border-[#c9a84c]/40 bg-transparent text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#070707]",
        outline:
          "border border-[#c9a84c] bg-transparent text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#070707]",
        secondary:
          "bg-[#111111] text-[#f4ead8] border border-[#c9a84c]/25 hover:border-[#c9a84c]",
        ghost: "text-[#f4ead8] hover:text-[#c9a84c]",
        link: "text-[#c9a84c] underline-offset-4 hover:underline tracking-normal normal-case font-medium",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
