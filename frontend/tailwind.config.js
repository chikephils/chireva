/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      screens: {
        "1000px": "1050px",
        "2500px": "2560px",
        "1100px": "1110px",
        "800px": "800px",
        "600px": "600px",
        "1300px": "1300px",
        "400px": "400px",
        "375px": "375px",
        "320px": "320px",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
