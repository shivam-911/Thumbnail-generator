// components/ui/theme-provider.tsx
"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { FC, PropsWithChildren } from "react"

interface ThemeProviderProps {
    attribute?: "class" | "data-theme"
    defaultTheme?: string
    enableSystem?: boolean
}

export const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
    children,
    attribute = "class",
    defaultTheme = "system",
    enableSystem = true,
}) => {
    return (
        <NextThemesProvider
            attribute={attribute}
            defaultTheme={defaultTheme}
            enableSystem={enableSystem}
            storageKey="theme"
        >
            {children}
        </NextThemesProvider>
    )
}
