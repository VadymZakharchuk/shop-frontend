const shopMenuBg = '#D1D5DB';
const shopMenuHoverBg = '#BFDBFE';
const menuText = '#e8b06e';
const radioNormalBg = '#d1d5db';
const radioSelectedBg = '#bfdbfe';
const choiceSelText = '#1E429F';
const choiceNormText = '#164e63';

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,html}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0px'
      }
    },
    screens: {
      'sm': '640px',
      'md': '712px',
      'lg': '968px',
      'xl': '1366px'
    },
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
        'radio-normal': radioNormalBg,
        'radio-selected': radioSelectedBg,
        'choice-selected': choiceSelText,
        'choice-normal': choiceNormText,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}