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
        dev: {
          bg: '#0F172A',         // Deep Slate
          card: '#1E293B',       // Dark Navy
          subtle: '#334155',     // Slate hover/subtle
          border: '#334155',     // Cool Gray border
          'border-active': '#06B6D4',
          muted: '#94A3B8',      // Cool Gray
          text: '#CBD5E1',
          bright: '#F8FAFC',     // Ghost White
          accent: '#06B6D4',     // Electric Teal
          'accent-hover': '#0891B2',
          green: '#10B981',      // Vibrant Green for status
        },
        light: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          subtle: '#F1F5F9',
          border: '#E2E8F0',
          muted: '#64748B',
          text: '#334155',
          bright: '#0F172A',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-teal': '0 0 20px -5px rgba(6, 182, 212, 0.35)',
        'glow-green': '0 0 20px -5px rgba(16, 185, 129, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
