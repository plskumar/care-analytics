/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Adding custom clinical colors for your dashboard
        clinical: {
          primary: '#0f172a', // Slate 900
          success: '#10b981', // Emerald 500
          warning: '#f59e0b', // Amber 500
          danger: '#ef4444',  // Red 500
        }
      }
    },
  },
  plugins: [],
}