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
        transparent: 'transparent',
        current: 'currentColor',
        'primary': '#9FD8CB',
        'secondary': '#CACFD6',
        'tertiary': '#517664',
        'dark': '#2D3319',
        'light': '#D6E5E3'
      }
    }
  },
  plugins: [],
}