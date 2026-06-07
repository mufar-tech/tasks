import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-mufar-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-mufar-primary text-white shadow hover:bg-mufar-primary/80",
        secondary:
          "border-transparent bg-mufar-text-secondary text-white shadow hover:bg-mufar-text-secondary/80",
        destructive:
          "border-transparent bg-mufar-danger text-white shadow hover:bg-mufar-danger/80",
        outline: "text-mufar-text border-mufar-border",
        backlog: "border-transparent bg-mufar-badge-low text-mufar-dark",
        "to-do": "border-transparent bg-mufar-badge-medium text-blue-700",
        "in-progress": "border-transparent bg-mufar-badge-high text-amber-700",
        review: "border-transparent bg-mufar-accent text-mufar-secondary",
        completed: "border-transparent bg-emerald-100 text-emerald-700",
        low: "border-transparent bg-mufar-badge-low text-mufar-dark",
        medium: "border-transparent bg-mufar-badge-medium text-blue-700",
        high: "border-transparent bg-mufar-badge-high text-amber-700",
        critical:
          "border-transparent bg-mufar-badge-critical text-red-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
