/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/public/assets/img/teenage-girl.png')",
      },

      backgroundSize: {
        "26rem": "26rem",
        "20rem": "20rem",
        "16rem": "16rem",
      },

      backgroundPosition: {
        "right-bottom-61": "61% 100%",
        "right-bottom-55": "55% 100%",
      },

      width: {
        225: "225%",
      },

      height: {
        225: "225%",
      },
    },
  },
  plugins: [],
};
