import { cn } from "@/lib/utils"

export function Card({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 transition hover:shadow-xl",
                className
            )}
            {...props}
        />
    )
}
