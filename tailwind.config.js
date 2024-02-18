/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif']
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false
  },
  prefix: 'tw-'
}

