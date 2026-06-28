/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Kanit", "sans-serif"],
      },
      colors: {
        dark: "#0C0C0C",
        "text-primary": "#D7E2EA",
        accent: {
          purple: "#7621B0",
          magenta: "#B600A8",
          orange: "#BE4C00",
        },
      },
    },
  },
  plugins: [],
}
