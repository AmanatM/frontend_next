import type { Config } from "tailwindcss"

import svgToDataUri from "mini-svg-data-uri"

// @ts-expect-error This is how Tailwind CSS is imported
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette"
import { color } from "framer-motion"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/**/*.{md,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        border: {
          DEFAULT: "hsl(var(--border))",
          bright: "hsl(var(--border-bright))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    hljs: {
      theme: "atom-one-dark",
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("tailwind-highlightjs"),
    DotLineGenerator,
    addVariablesForColors,
  ],
  safelist: [
    {
      pattern: /hljs+/,
    },
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
} satisfies Config

function DotLineGenerator({ matchUtilities, theme }: any) {
  matchUtilities(
    {
      "bg-grid": (value: any, { modifier }: { modifier: string }) => {
        const size = parseInt(modifier || "32", 10)
        return {
          backgroundImage: `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" fill="none" stroke="${value}">
              <path d="M0 0H${size}V${size}H0z" fill="none" stroke-width="1"/>
              <path d="M0 .5H${size}.5V${size}"/>
              <path d="M.5 0V${size}.5H${size}"/>
            </svg>`,
          )}")`,
        }
      },
      "bg-grid-small": (value: any, { modifier }: { modifier: string }) => {
        const size = parseInt(modifier || "14", 10)
        return {
          backgroundImage: `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" fill="none" stroke="${value}">
              <path d="M0 0H${size}V${size}H0z" fill="none" stroke-width="1"/>
              <path d="M0 .5H${size}.5V${size}"/>
              <path d="M.5 0V${size}.5H${size}"/>
            </svg>`,
          )}")`,
        }
      },
      "bg-dot": (value: any, { modifier }: { modifier: string }) => {
        const size = parseInt(modifier || "16", 10)
        return {
          backgroundImage: `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" fill="none">
              <circle fill="${value}" cx="${size / 2}" cy="${size / 2}" r="${size / 10}"/>
            </svg>`,
          )}")`,
        }
      },
    },
    { values: flattenColorPalette(theme("backgroundColor")), type: "color" },
  )
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"))
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]))

  addBase({
    ":root": newVars,
  })
}

export default config
