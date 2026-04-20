/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05050A", // Deep fallback
        white: "#FFFFFF",
        cream: "#FDFBF7",
        indigo: {
          DEFAULT: "#5A6B9C",
          light: "#7B8ABX",
          dark: "#3B4A7A",
        },
        highlight: "#F4C47C",
        // Premium Cinematic Palette
        "midnight-navy": "#060813",
        "moonlight-gray": "#8A90AB",
        "muted-amber": "#D4A35B",
        "soft-charcoal": "#131622",
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}

