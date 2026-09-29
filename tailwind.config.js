/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        manoir: {
          DEFAULT: '#07060a',
          950: '#040305',
          900: '#07060a',
          800: '#100e16',
          700: '#191522',
        },
        abysse: {
          DEFAULT: '#1b1030',
          dark: '#120b20',
          light: '#2a1a4a',
        },
        fantome: {
          DEFAULT: '#e9e4d0',
          pure: '#f5f2e6',
          dim: '#c8c2ab',
          dark: '#938d77',
        },
        citrouille: {
          DEFAULT: '#ff6a1a',
          light: '#ff843d',
          dark: '#d94f06',
          glow: '#ff924d',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
