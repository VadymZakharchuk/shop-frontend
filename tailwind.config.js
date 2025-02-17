const shopMenuBg = '#D1D5DB';
const shopMenuText = '#c2a89a'
const shopMenuHoverBg = '#BFDBFE';

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,html}",
  ],
  theme: {
    extend: {
      colors: {
        'menu-text': shopMenuText,
        'menu-bg': shopMenuBg,
        'menu-hover-bg': shopMenuHoverBg,
        'user-logged': 'text-green-500',
      },
    },
  },
  plugins: [],
}