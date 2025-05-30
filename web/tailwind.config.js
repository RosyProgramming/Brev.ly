import { theme } from 'tailwindcss/defaultConfig'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-base': '#2C46B1',
        'blue-dark':'#2C4091',
        'danger':'#B12C4D',
      },
      fontFamily: {
        sans: ['Open Sans', theme.fontFamily.sans]
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}