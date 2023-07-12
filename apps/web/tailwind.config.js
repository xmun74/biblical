/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const comonConfig = require('@biblical/configs/tailwind/tailwind.config');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  ...comonConfig,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        monda: ['Monda', 'sans-serif'],
      },
      colors: {
        accent: {
          100: 'rgba(184, 255, 217)',
          200: 'rgba(104, 255, 174)',
          300: 'rgba(3, 254, 118)',
          350: 'rgba(20, 247, 117)',
          400: 'rgba(46, 230, 131)',
          500: 'rgba(29, 193, 104)',
          600: 'rgba(14, 132, 68)',
        },
      },
      backgroundImage: {
        'kakao-login': "url('../public/assets/images/kakao_login_medium_narrow.png')",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
