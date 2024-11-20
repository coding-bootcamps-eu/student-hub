/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsxtsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        layout: "auto 1fr auto",
        "2-layout": "1fr auto",
      },
      gridTemplateColumns: {
        layout: "auto 1fr",
      },
    },
  },
  plugins: [],
};
