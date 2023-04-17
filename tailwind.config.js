/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'tw-black': '#14110F',
        'tw-jet': '#34312D',
        'tw-gray': '#525356',
        'tw-primary': '#FF3864',
        'tw-secondary': '#F7DBA7'
      },
      fontFamily: {
        passion: 'var(--font-passion)',
        montserrat: 'var(--font-montserrat)'
      },
      gridTemplateColumns: {
        ['fluid-sm']: 'repeat(auto-fit, minmax(min(9rem, 100%), 1fr))',
        fluid: 'repeat(auto-fit, minmax(min(13rem, 100%), 1fr))'
      }
    }
  },
  plugins: [require('@headlessui/tailwindcss')]
};
