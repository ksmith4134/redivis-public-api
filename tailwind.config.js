/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
            redivisLightPurple: "#C1549E",
            redivisPurple: "#98449A",
            redivisDarkPurple: "#7F3B97",
            redivisLightBlue: "#6090CC",
            redivisDarkBlue: "#4588C8",
        }
      },
    },
    plugins: [],
  }