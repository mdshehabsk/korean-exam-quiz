/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        korean : ["Noto Serif KR", "serif"]
      }
    },
  },
  darkMode: 'class',
  plugins: []
}