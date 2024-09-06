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
      },
      colors: {
        blue: {
          regular: '#3358FF',
          light: '#A1B1FF',
          dark: '#2946CC',
        },
        lead: {
          regular: '#2A2A2A',
          light: '#4C4C4C',
          dark: '#222222',
        },
        gray: {
          regular: '#E4E4E7',
          light: '#F7F7F8',
          dark: '#B6B6B9',
          bg: '#F3F3F3'
        },
        green: '#88EF8D',
        white: '#FFFFFF',
        yellow: '#EFE090',
        red: '#F29494',
      },
    },
  },
  plugins: [],
}

