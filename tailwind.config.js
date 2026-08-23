/** @type {import('tailwindcss').Config} */

// Bethesda Apostolic Church palette (see /colors).
// Blue #0033A0 · Red #EE2737 · White #FFFFFF · Gold #C8AE73 · Khaki #B2A480
//
// ponytail: `blue` and `red` deliberately override Tailwind's defaults so every
// existing `blue-600`/`red-600` in the markup becomes a church colour without a
// 30-file find-and-replace. Brand hues are anchored at the 600 step.
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#EEF3FC',
          100: '#D9E4F8',
          200: '#B3C8F0',
          300: '#7FA0E2',
          400: '#3E6BCB',
          500: '#1449B4',
          600: '#0033A0', // Bethesda Blue
          700: '#002B85',
          800: '#00226A',
          900: '#001B54',
          950: '#000F30',
        },
        red: {
          50: '#FEF2F3',
          100: '#FCDFE2',
          200: '#FAC0C6',
          300: '#F5959F',
          400: '#F25F6E',
          500: '#F03C4C',
          600: '#EE2737', // Bethesda Red
          700: '#C71A28',
          800: '#A4151F',
          900: '#86141C',
          950: '#4A060B',
        },
        gold: {
          50: '#FBF8F1',
          100: '#F5EEDE',
          200: '#EBDCBC',
          300: '#DFCDA5',
          400: '#D2BC8E',
          500: '#C8AE73', // Bethesda Gold (logo chain)
          600: '#B2954F',
          700: '#927840',
          800: '#725D33',
          900: '#544529',
          950: '#2E2515',
        },
        khaki: {
          50: '#F9F8F4',
          100: '#F2EFE6',
          200: '#E3DECC',
          300: '#CFC7AA',
          400: '#C0B595',
          500: '#B2A480', // Bethesda Khaki
          600: '#998A63',
          700: '#7C6F51',
          800: '#615741',
          900: '#484133',
          950: '#26221B',
        },
        primary: {
          DEFAULT: '#0033A0',
          hover: '#002B85',
        },
        secondary: {
          DEFAULT: '#EE2737',
          hover: '#C71A28',
        },
        accent: {
          DEFAULT: '#C8AE73',
          hover: '#B2954F',
        },
        background: {
          DEFAULT: '#ffffff',
          dark: '#f9fafb',
        },
        foreground: {
          DEFAULT: '#1f2937',
          light: '#6b7280',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      spacing: {
        'section': '4rem',
        'section-lg': '6rem',
      },
      borderRadius: {
        'xl': '0.75rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
