/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rt: {
          dark: '#0F172A',
          accent: '#F97316',
          accentHover: '#EA580C',
          secondary: '#0EA5E9',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          text: '#1E293B',
          muted: '#64748B',
          success: '#22C55E',
          warning: '#EAB308',
          danger: '#EF4444',
          info: '#3B82F6',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
