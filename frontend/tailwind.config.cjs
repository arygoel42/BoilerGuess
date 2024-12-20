/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"], // Keeps dark mode functionality
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Content paths
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#1d4ed8", // Blue
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#22c55e", // Green
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#e5e7eb", // Light gray
          foreground: "#6b7280",
        },
        accent: {
          DEFAULT: "#22c55e", // Green
          foreground: "#ffffff",
        },
        destructive: "#ef4444", // Red
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        gold: {
          DEFAULT: "hsl(var(--gold, 50 100% 50%))",
          light: "hsl(var(--gold-light, 50 100% 60%))",
          dark: "hsl(var(--gold-dark, 50 100% 40%))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Keep existing plugin
};
