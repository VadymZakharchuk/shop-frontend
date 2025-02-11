const shopMenuBg = '#D1D5DB';
const shopMenuText = '#451A03'
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
      },
    },
  },
  plugins: [],
}