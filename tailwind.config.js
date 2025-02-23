const shopMenuBg = '#D1D5DB';
const shopMenuHoverBg = '#BFDBFE';
const menuText = '#e8b06e';

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,html}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'caveat': ['Caveat', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif']
      },
      colors: {
        'menu-text': menuText,
        'menu-bg': shopMenuBg,
        'menu-hover-bg': shopMenuHoverBg,
        'user-logged': 'text-green-500',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}