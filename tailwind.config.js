/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from "tailwindcss/colors.js";
module.exports = {
  content: [
      "./src/**/*.{html,js,vue}",
      "./index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        ...colors
      }
    }
  },
  plugins: [],
}