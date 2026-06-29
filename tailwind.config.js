/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        sans: ['"Kanit"', 'sans-serif'],
      },
      colors: {
        dark: "#0C0C0C",
        "dark-card": "#111111",
        "dark-elevated": "#1A1A1A",
        "text-primary": "#D7E2EA",
        "text-muted": "#8A95A0",
        accent: {
          purple: "#7621B0",
          magenta: "#B600A8",
          orange: "#BE4C00",
          cyan: "#06B6D4",
          blue: "#3B82F6",
        },
        glass: {
          white: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.08)",
        },
      },
      animation: {
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'float-slow': 'float-y 8s ease-in-out infinite',
        'float-medium': 'float-y 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'spin-slow': 'spin 12s linear infinite',
        'border-flow': 'border-flow 4s ease infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'border-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(118, 33, 176, 0.3)',
        'glow-magenta': '0 0 20px rgba(182, 0, 168, 0.3)',
        'glow-orange': '0 0 15px rgba(190, 76, 0, 0.3)',
        'card-hover': '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(118, 33, 176, 0.15)',
      },
    },
  },
  plugins: [],
}
