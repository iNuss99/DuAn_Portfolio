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
          purple: "#FF0055", // Neon Red/Pink
          magenta: "#EE0F0F", // Vivid Red
          orange: "#FF4D00", // Coral Red
          cyan: "#FF3366", // Rose Red
          blue: "#E11D48", // Crimson Rose
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
        'glow-purple': '0 0 20px rgba(255, 0, 85, 0.4)',
        'glow-magenta': '0 0 20px rgba(238, 15, 15, 0.4)',
        'glow-orange': '0 0 15px rgba(255, 77, 0, 0.4)',
        'card-hover': '0 25px 50px rgba(0, 0, 0, 0.55), 0 0 30px rgba(238, 15, 15, 0.25)',
      },
    },
  },
  plugins: [],
}
