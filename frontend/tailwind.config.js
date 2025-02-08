/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{tsx, ts, js, jsx}"],
  theme: {
    extend: {
      fontFamily: {
        india: ["Indie Flower", "serif"]
      }
    },
  },
  plugins: [
  ],
}

