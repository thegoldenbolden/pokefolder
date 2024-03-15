const { screens } = require('tailwindcss/defaultConfig');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [require('tailwindcss-animate')],
  theme: {
    extend: {
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
        '6xl': 'var(--font-size-6xl)',
        '7xl': 'var(--font-size-7xl)',
        '8xl': 'var(--font-size-8xl)',
        '9xl': 'var(--font-size-9xl)',
      },
      aspectRatio: {
        card: '3 / 4',
      },
      screens: {
        xs: '480px',
        ...screens,
      },
      fontFamily: {
        bungee: 'var(--font-bungee)',
        rubik: 'var(--font-rubik)',
      },
      gridTemplateColumns: {
        ['fluid-sm']: 'repeat(auto-fit, minmax(min(9rem, 100%), 1fr))',
        fluid: 'repeat(auto-fit, minmax(min(13rem, 100%), 1fr))',
      },
      colors: {
        border: {
          DEFAULT: 'hsl(var(--border))',
        },
        ring: {
          DEFAULT: 'hsl(var(--ring))',
        },
        spotlight: {
          DEFAULT: 'hsl(var(--spotlight))',
        },
        background: {
          DEFAULT: 'hsl(var(--background))',
          light: 'hsl(var(--background-light))',
          lighter: 'hsl(var(--background-lighter))',
        },
        foreground: {
          DEFAULT: 'hsl(var(--foreground))',
          light: 'hsl(var(--foreground-light))',
          lighter: 'hsl(var(--foreground-lighter))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
};
