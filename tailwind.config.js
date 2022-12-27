const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT(
  {
    content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
    theme: {
      extend: {},
      colors: {
        yellow: {
          300: "#fff176",
        },
      },
    },
    plugins: [
      require('tw-elements/dist/plugin')
    ],
  }
)
