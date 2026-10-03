import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#dc2626',
          'red-hover': '#b91c1c',
          'red-light': '#ef4444',
          'red-soft': '#fef2f2',
          green: '#16a34a',
          'green-hover': '#15803d',
          'green-light': '#22c55e',
          'green-soft': '#f0fdf4',
          white: '#ffffff',
        },
        git: {
          bg: '#090d13',
          canvas: '#0d1117',
          card: '#161b22',
          subtle: '#21262d',
          border: '#30363d',
          muted: '#8b949e',
          text: '#c9d1d9',
          bright: '#f0f6fc',
        },
        light: {
          bg: '#ffffff',
          canvas: '#ffffff',
          card: '#ffffff',
          subtle: '#f8fafc',
          border: '#e2e8f0',
          muted: '#64748b',
          text: '#334155',
          bright: '#0f172a',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-red': '0 0 20px -5px rgba(220, 38, 38, 0.25)',
        'glow-green': '0 0 20px -5px rgba(22, 163, 74, 0.25)',
        'card-white': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
