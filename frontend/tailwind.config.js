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
          DEFAULT: "#2563eb", // Blue 600
          light: "#3b82f6", // Blue 500
          dark: "#1d4ed8", // Blue 700
        },
        secondary: {
          DEFAULT: "#6366f1", // Indigo 500
          light: "#818cf8", // Indigo 400
          dark: "#4f46e5", // Indigo 600
        },
        accent: {
          DEFAULT: "#06b6d4", // Cyan 500
          light: "#22d3ee", // Cyan 400
          dark: "#0891b2", // Cyan 600
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
          DEFAULT: "#f8fafc", // Gray 50
          dark: "#f1f5f9", // Gray 100
        },
        surface: "#fff",
        border: "#e2e8f0", // Gray 200
        text: {
          primary: "#1e293b", // Gray 800
          secondary: "#64748b", // Gray 500
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
