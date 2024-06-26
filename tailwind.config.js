/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1025px',
      'xl': '1280px',
      '2xl': '1536px',
      'ipp': '1024px', // Ejemplo de breakpoint personalizado para iPad Pro
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-spinner::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          'margin': '0',
        },
        '.no-spinner::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          'margin': '0',
        },
        '.no-spinner': {
          '-moz-appearance': 'textfield',
        },
      };
      addUtilities(newUtilities);
    },
  ],
}