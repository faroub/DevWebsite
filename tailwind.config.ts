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
        // Semantic tokens: values are defined as RGB channels in globals.css
        // (:root = dark default, .light = light mode) so opacity modifiers
        // like bg-accent-primary/10 work in both themes.
        canvas: 'rgb(var(--color-canvas) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        divider: 'rgb(var(--color-divider) / <alpha-value>)',
        'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        'accent-primary': 'rgb(var(--color-accent-primary) / <alpha-value>)',
        'accent-success': 'rgb(var(--color-accent-success) / <alpha-value>)',
        'accent-error': 'rgb(var(--color-accent-error) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-teal': '0 0 20px -5px rgba(6, 182, 212, 0.35)',
        'git-glow': '0 0 20px -5px rgba(16, 185, 129, 0.35)',
        'glow-green': '0 0 20px -5px rgba(16, 185, 129, 0.35)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
};

export default config;
