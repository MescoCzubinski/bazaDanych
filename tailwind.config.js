/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      //docs pod tym linkeim: https://tailwindcss.com/docs/configuration np.:
      colors: {
        "top-agrar-green": "rgb(0, 132, 55)",
      },
    },
  },
  plugins: [],
};
