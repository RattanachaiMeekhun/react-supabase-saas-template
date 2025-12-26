/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}", // ปรับ path ตามโครงสร้างโปรเจกต์
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#DDE6ED", // Alice Blue - Highlights/Primary Text
          light: "#ffffff",
          dark: "#9DB2BF",
        },
        secondary: {
          DEFAULT: "#9DB2BF", // Light Steel Blue - Secondary Text/Icons/Borders
          light: "#b8c9d4",
          dark: "#526D82",
        },
        accent: {
          DEFAULT: "#526D82", // Slate Blue - Surface/Cards
          light: "#6a8498",
          dark: "#27374D",
        },
        success: {
          DEFAULT: "#22c55e", // Green 500
          light: "#4ade80", // Green 400
          dark: "#16a34a", // Green 600
        },
        warning: {
          DEFAULT: "#f59e42", // Amber 400
          light: "#fde68a", // Amber 200
          dark: "#d97706", // Amber 600
        },
        error: {
          DEFAULT: "#ef4444", // Red 500
          light: "#f87171", // Red 400
          dark: "#dc2626", // Red 600
        },
        background: {
          DEFAULT: "#27374D", // Vintage Navy - Main Background
          dark: "#1e2b3c",
          light: "#526D82",
        },
        surface: {
          DEFAULT: "#526D82", // Slate Blue - Surface/Cards
          light: "#6a8498",
          dark: "#27374D",
        },
        border: "#9DB2BF", // Light Steel Blue - Borders
        text: {
          primary: "#DDE6ED", // Alice Blue - Primary Text
          secondary: "#9DB2BF", // Light Steel Blue - Secondary Text
          inverse: "#27374D",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
