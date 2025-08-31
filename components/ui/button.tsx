// components/ui/button.tsx
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "dark"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", ...props }, ref) => {
        const base =
            "inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold shadow transition focus:outline-none focus:ring-2"

        const variants = {
            primary: "btn-primary",
            secondary: "btn-secondary",
            dark: "btn-dark",
        }

        return (
            <button
                ref={ref}
                className={cn(base, variants[variant], className)}
                {...props}
            />
        )
    }
)

Button.displayName = "Button"
