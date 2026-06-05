/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#1f6fe5',
          strong: '#4d91f5',
        },
        'brand-green': {
          DEFAULT: '#2f9e44',
          strong: '#4ab85e',
        },
        ink: {
          DEFAULT: '#f0f5fb',
          2: '#c4d4e6',
        },
        muted: '#7d95b0',
        faint: '#4a5f75',
        'site-bg': '#070c18',
        'site-bg-2': '#0c1322',
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        wrap: '1440px',
      },
    },
  },
};
