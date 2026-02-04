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
        primary: {
          50: '#e8eaf6',
          100: '#c5cae9',
          200: '#9fa8da',
          300: '#7986cb',
          400: '#5c6bc0',
          500: '#3f51b5', // Material indigo primary
          600: '#3949ab',
          700: '#303f9f',
          800: '#283593',
          900: '#1a237e',
        },
        accent: {
          500: '#536dfe', // Material indigo accent
        },
        gold: '#AB8E00',
        'theme-color': '#FFD57C',
      },
      fontFamily: {
        sans: ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['Roboto Mono', 'SFMono-Regular', 'Consolas', 'Menlo', 'monospace'],
        caveat: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
} satisfies Config;
