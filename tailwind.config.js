import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: ["class"],
    content: ["./src/**/*.{html,js,svelte,ts}"],
    safelist: ["dark"],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px"
            }
        },
        extend: {
            colors: {
                black: '#131e1d',
                dark: '#062525',
                third: '#F2FDFD',
                fourth: '#ecffff',
                btn_primary: '#044F4E',
                btn_secondary: '#2bb0b0',
                btn_cancel: '#2d2d2d',
                'third-hover': '#cefaf7',
                'body-color': '#637381',
                warning: '#FBBF24',
                "sdm-cg-50": "#F5F7FA",
                "sdm-cg-100": "#E4E7EB",
                "sdm-cg-200": "#CBD2D9",
                "sdm-cg-300": "#9AA5B1",
                "sdm-cg-400": "#7B8794",
                "sdm-cg-500": "#616E7C",
                "sdm-cg-600": "#52606D",
                "sdm-cg-700": "#3E4759",
                "sdm-cg-800": "#323F4B",
                "sdm-cg-900": "#1F2933",
                "sdm-bronze-900": "#DA852F",
                "sdm-bronze-700": "#E0964D",
                "sdm-bronze-500": "#E5A86A",
                "sdm-bronze-300": "#EAB988",
                "sdm-bronze-100": "#EFCB6A",
                "sdm-scarlet-900": "#ED3907",
                "sdm-scarlet-700": "#F85123",
                "sdm-scarlet-500": "#F96E47",
                "sdm-scarlet-300": "#FA8B6C",
                "sdm-scarlet-100": "#FCA891",
                "sdm-persian-green-900": "#17A99B",
                "sdm-persian-green-700": "#1DD2C0",
                "sdm-persian-green-500": "#38E4D3",
                "sdm-persian-green-300": "#60E9DC",
                "sdm-persian-green-100": "#88EFE4",
                "sdm-steel-blue-900": "#327DC3",
                "sdm-steel-blue-700": "#4A90D0",
                "sdm-steel-blue-500": "#68A2D8",
                "sdm-steel-blue-300": "#87B5E0",
                "sdm-steel-blue-100": "#A5C7E8", //after that old ones
                border: "hsl(var(--border) / <alpha-value>)",
                input: "hsl(var(--input) / <alpha-value>)",
                ring: "hsl(var(--ring) / <alpha-value>)",
                background: "hsl(var(--background) / <alpha-value>)",
                foreground: "hsl(var(--foreground) / <alpha-value>)",
                primary: {
                    DEFAULT: "hsl(var(--primary) / <alpha-value>)",
                    foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
                    foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
                    foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
                },
                muted: {
                    DEFAULT: "hsl(var(--muted) / <alpha-value>)",
                    foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
                },
                accent: {
                    DEFAULT: "hsl(var(--accent) / <alpha-value>)",
                    foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
                },
                popover: {
                    DEFAULT: "hsl(var(--popover) / <alpha-value>)",
                    foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
                },
                card: {
                    DEFAULT: "hsl(var(--card) / <alpha-value>)",
                    foreground: "hsl(var(--card-foreground) / <alpha-value>)"
                }
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)"
            },
            fontFamily: {
                sans: [...fontFamily.sans]
            }
        }
    },
    variants: {
        extend: {}
    },

    plugins: [require('@tailwindcss/typography'), require("tailwindcss-animate")],
    'css.validate': false,
    'editor.quickSuggestions': {
        strings: true
    }
};

export default config;
