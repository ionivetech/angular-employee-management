/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false
  },
  prefix: 'tw-'
}

