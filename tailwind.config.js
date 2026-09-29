/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nuit: {
          DEFAULT: '#0b090a',
          900: '#0b090a',
          800: '#161a1d',
          700: '#22252a',
        },
        citrouille: {
          DEFAULT: '#ea580c',
          light: '#f97316',
          dark: '#c2410c',
        },
      },
    },
  },
  plugins: [],
}
