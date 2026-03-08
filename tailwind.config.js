/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        script: ['Dancing Script', 'cursive'],
      },
      colors: {
        midnight: '#0F172A',
        rose: '#F43F5E',
        gold: '#FDE047',
      },
    },
  },
  plugins: [],
}