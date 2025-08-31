import type { Config } from "tailwindcss";

export default {
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                secondary: "var(--secondary)",
            },
            boxShadow: {
                xl: "0 10px 25px -5px rgba(0,0,0,0.1)",
            },
            borderRadius: {
                xl: "1rem",
                "2xl": "1.25rem",
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-in-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: 0, transform: "translateY(10px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
