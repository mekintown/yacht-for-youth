import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFF5B4",
        foreground: "var(--foreground)",
        primary: "#FF6949",
        secondary: "#FFF5B4",
        accent: "#374F59",
      },
      fontFamily: {
        sans: ["var(--font-ibm-plex-thai)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
