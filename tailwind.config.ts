import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'gray-100': '#62626C',
        'gray-200': '#4D4D56',
        'gray-300': '#2F2F33',        
        'blue-primary': '#1267FC',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
} satisfies Config;
