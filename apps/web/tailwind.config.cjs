/** @type {import('tailwindcss').Config} */

const sharedConfig = require('tailwind-config/tailwind.config.js');

module.exports = {
  ...sharedConfig,
  plugins: [...sharedConfig.plugins, require('daisyui')],
};
