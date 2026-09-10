import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold tracking-[0.16em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#1a1208] text-white hover:bg-[#e56e1a]",
        destructive:
          "border border-[#1a1208]/40 bg-transparent text-[#1a1208] hover:bg-[#1a1208] hover:text-white",
        outline:
          "border border-[#1a1208] bg-transparent text-[#1a1208] hover:bg-[#1a1208] hover:text-white",
        secondary:
          "bg-white text-[#1a1208] border border-[#1a1208] hover:bg-[#1a1208] hover:text-white",
        ghost: "text-[#e56e1a] hover:text-[#1a1208]",
        link: "text-[#e56e1a] underline-offset-4 hover:underline tracking-normal normal-case font-medium",
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
