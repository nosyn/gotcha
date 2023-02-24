const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    // app content
    'index.html',
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    // "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandblue: colors.blue[500],
        brandred: colors.red[500],
      },
      spacing: {
        128: '32rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
