/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          global: '#d9d8d8'
        },
        primary: '#2c2d5e',
        accent: '#e36b29',
        surface: 'rgba(255,255,255,0.55)',
        border: {
          subtle: 'rgba(44,45,94,0.12)',
          hover: 'rgba(227,107,41,0.6)'
        }
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
