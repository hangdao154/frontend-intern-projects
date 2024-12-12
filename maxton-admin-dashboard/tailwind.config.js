/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "xs": "320px",
        "sm": "425px",
        "lg": "1024px"
      },
      colors: {
        "primary": {
          "blue": "#0D6EFD",
          "red": "#FF2559",
          "green": "#00E69B",
          "darkblue": "#070C29"
        }
      }
    }
  },
  plugins: [],
} 