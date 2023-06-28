/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const comonConfig = require('@biblical/configs/tailwind/tailwind.config');

module.exports = {
  ...comonConfig,
  theme: {
    extend: {},
  },
  plugins: [],
};
