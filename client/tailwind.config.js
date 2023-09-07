/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        suit: ['SUIT', 'sans-serif'],
        CrimsonPro: ['Crimson Pro', 'serif'],
      },
      colors: {
        bgColor: {
          light: '#fafafa',
          dark: '#151515',
        },
        textColor: {
          light: '#151515',
          dark: '#eeeeee',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
