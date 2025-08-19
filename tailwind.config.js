/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#063b82',
          foreground: '#ECECEC',
          hover: '#1269DB',
        },
        secondary: {
          main: '#cc614d',
          foreground: '#ECECEC',
          hover: '#F6745A',
        },
      }
    },
  },
  plugins: [],
}