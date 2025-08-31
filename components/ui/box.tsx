import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const boxVariants = cva("w-full", {
    variants: {
        variant: {
            default: "bg-background text-foreground",
            card: "bg-card p-4 rounded-lg shadow-sm",
            // Add more variants as needed
        },
    },
    defaultVariants: {
        variant: "default",
    },
})

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof boxVariants> { }

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(({ className, variant, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(boxVariants({ variant, className }))}
        {...props}
    />
))
Box.displayName = "Box"