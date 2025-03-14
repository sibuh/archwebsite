import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}", // Required for Hero UI
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Keep your custom colors
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class", // Enable dark mode support
  plugins: [heroui()], // Add Hero UI plugin
};

export default config;
