const { screens } = require("tailwindcss/defaultConfig");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [require("tailwindcss-animate")],
  theme: {
    extend: {
      fontSize: {
        xs: "var(--font-size-xs)",
        sm: "var(--font-size-sm)",
        base: "var(--font-size-base)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
        "2xl": "var(--font-size-2xl)",
        "3xl": "var(--font-size-3xl)",
        "4xl": "var(--font-size-4xl)",
        "5xl": "var(--font-size-5xl)",
        "6xl": "var(--font-size-6xl)",
        "7xl": "var(--font-size-7xl)",
        "8xl": "var(--font-size-8xl)",
        "9xl": "var(--font-size-9xl)",
      },
      aspectRatio: {
        card: "3 / 4",
      },
      screens: {
        xs: "480px",
        ...screens,
      },
      fontFamily: {
        bungee: "var(--font-bungee)",
        rubik: "var(--font-rubik)",
      },
      gridTemplateColumns: {
        ["fluid-sm"]: "repeat(auto-fit, minmax(min(9rem, 100%), 1fr))",
        fluid: "repeat(auto-fit, minmax(min(13rem, 100%), 1fr))",
      },
      colors: {
        border: "hsl(var(--color-border))",
        spotlight: "hsl(var(--color-spotlight))",
        input: "hsl(var(--color-input))",
        ring: "hsl(var(--color-ring))",
        canvas: "hsl(var(--color-canvas))",
        typing: {
          DEFAULT: "hsl(var(--color-typing))",
          start: "hsl(var(--color-typing-start))",
          end: "hsl(var(--color-typing-end))",
        },
        prices: {
          low: "hsl(var(--color-low-price))",
          mid: "hsl(var(--color-mid-price))",
          high: "hsl(var(--color-high-price))",
          market: "hsl(var(--color-market-price))",
          euro: "hsl(var(--color-euro-price))",
        },
        fg: {
          DEFAULT: "hsl(var(--color-fg))",
          contrast: "hsl(var(--color-fg-contrast))",
          soft: "hsl(var(--color-fg-soft))",
        },
        primary: {
          DEFAULT: "hsl(var(--color-primary))",
          fg: "hsl(var(--color-primary-fg))",
        },
        accent: {
          DEFAULT: "hsl(var(--color-accent))",
          fg: "hsl(var(--color-accent-fg))",
        },
        muted: {
          DEFAULT: "hsl(var(--color-muted))",
          fg: "hsl(var(--color-muted-fg))",
        },
        popover: {
          DEFAULT: "hsl(var(--color-popover))",
          fg: "hsl(var(--color-popover-fg))",
        },
      },
    },
  },
};
