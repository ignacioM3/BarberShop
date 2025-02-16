/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{tsx, ts, js, jsx}"],
  theme: {
    extend: {
      fontFamily: {
        india: ["Indie Flower", "serif"],
      },
      keyframes: {
        shine: {
          "0%": { "background-position": "100%" },
          "100%": { "background-position": "-100%" },
        },
      },
      animation: {
        shine: "shine 5s linear infinite",
      },
    },
  },
  plugins: [],
};
