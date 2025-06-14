/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: "#36353a",
      },
      fontFamily: {
        serif: ['"Source Serif Pro"', 'serif'], // custom serif font
      },
    },
  },
  plugins: [require("daisyui"),require('@tailwindcss/line-clamp')],
  daisyui: {
    themes: ['light', 'dark'], 
  },
  
}