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
        git: {
          bg: '#090d13',
          canvas: '#0d1117',
          card: '#161b22',
          subtle: '#21262d',
          border: '#30363d',
          'border-active': '#58a6ff',
          muted: '#8b949e',
          text: '#c9d1d9',
          bright: '#f0f6fc',
          accent: '#58a6ff',
          green: '#3fb950',
          purple: '#bc8cff',
          cyan: '#39c5cf',
          pink: '#f778ba',
          amber: '#d29922',
        },
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 20px -5px rgba(88, 166, 255, 0.25)',
        'glow-green': '0 0 20px -5px rgba(63, 185, 80, 0.25)',
        'glow-purple': '0 0 20px -5px rgba(188, 140, 255, 0.25)',
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

export default config;
