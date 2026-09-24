/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#080B10',
        sidebar: '#0B1017',
        header: '#0B1017',
        theme: {
          background: '#080B10',
          canvas: '#080B10',
          sidebar: '#0B1017',
          header: '#0B1017',
          surface: '#111823',
          elevated: '#151E2B',
          hover: '#1A2536',
          border: '#263244',
          'border-strong': '#34445A',
          'border-bright': '#34445A',
          'border-subtle': '#1B2432',
          primary: '#F3F4F6',
          secondary: '#AAB4C3',
          muted: '#738095',
          tertiary: '#738095',
          inverse: '#080B10',
          accent: '#4D8DFF',
          'accent-bright': '#6EA8FF',
          'accent-cyan': '#45D4E8',
          'accent-muted': 'rgba(77, 141, 255, 0.12)',
          'accent-border': 'rgba(77, 141, 255, 0.35)',
          success: '#10B981',
          'success-bg': 'rgba(16, 185, 129, 0.12)',
          'success-border': 'rgba(16, 185, 129, 0.30)',
          warning: '#F59E0B',
          'warning-bg': 'rgba(245, 158, 11, 0.12)',
          'warning-border': 'rgba(245, 158, 11, 0.30)',
          danger: '#EF4444',
          'danger-bg': 'rgba(239, 68, 68, 0.12)',
          'danger-border': 'rgba(239, 68, 68, 0.30)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'intel-card': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px #263244',
        'intel-glow': '0 0 25px -5px rgba(77, 141, 255, 0.15)',
      }
    },
  },
  plugins: [],
}
