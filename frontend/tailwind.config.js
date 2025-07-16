/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./public/index.html",
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        // Modern Dark Theme Colors
        primary: {
          50: "#1e1b4b",
          100: "#312e81", 
          200: "#3730a3",
          300: "#4338ca",
          400: "#4f46e5",
          500: "#6366f1", // Main primary color
          600: "#7c3aed",
          700: "#8b5cf6",
          800: "#a78bfa",
          900: "#c4b5fd",
          950: "#ddd6fe",
        },
        
        // Dark Background Colors
        dark: {
          primary: "#0f172a",    // Main background
          secondary: "#1e293b",  // Card background
          tertiary: "#334155",   // Hover/active states
          quaternary: "#475569", // Borders
          surface: "#1e293b",    // Surface color
          hover: "#334155",      // Hover color
        },
        
        // Dark Text Colors
        text: {
          primary: "#f8fafc",    // Main text
          secondary: "#cbd5e1",  // Secondary text
          muted: "#94a3b8",      // Muted text
          inverse: "#1e293b",    // Inverse text
        },
        
        // Dark Border Colors
        border: {
          primary: "#334155",
          secondary: "#475569",
          muted: "#64748b",
        },
        
        // Accent Colors (unchanged for consistency)
        accent: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        
        // Status colors for dark theme
        success: {
          DEFAULT: "#10b981",
          light: "#34d399",
          dark: "#059669",
        },
        warning: {
          DEFAULT: "#f59e42",
          light: "#fbbf24",
          dark: "#d97706",
        },
        error: {
          DEFAULT: "#ef4444",
          light: "#f87171",
          dark: "#dc2626",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Cal Sans", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        "soft": "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "medium": "0 4px 25px -2px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        "large": "0 10px 60px -12px rgba(0, 0, 0, 0.25)",
        "glow": "0 0 20px rgba(59, 130, 246, 0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out", 
        "scale-in": "scaleIn 0.2s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
