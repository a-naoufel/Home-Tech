/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      boxShadow: {
        'blue-xl': '0 5px 10px -3px rgba(0, 172, 255, 0.7), 0 4px 3px -2px rgba(0, 172, 255, 0.5)'
      },
      container: { center: true, padding: "2rem" },
      fontFamily: {
        sans : ['Roboto','sans-serif'],
      },
      gridTemplateColumns: {
        '70/30' : '70% 28%',
      },
      colors: {
        mainColor: "#00acff",
        bgColorWhite : "#ECEBEC",
        bgColorBlack : "#201F20",
        bgColorDanger : "#EA4B48",
        bgColorCartFooter : "#F6F6F6",
        
        // #8A33FD
        // #00acff

      },
    },
  },
  plugins: [],
}