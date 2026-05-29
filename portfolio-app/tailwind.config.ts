import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-0': '#050608',
        'bg-1': '#0a0c10',
        'bg-2': '#11141a',
        graphite: '#1a1d24',
        titanium: '#2a2e37',
        'silver-1': '#c9ced8',
        'silver-2': '#8a8f9a',
        'silver-3': '#5b6068',
        'silver-4': '#3a3e46',
        snow: '#f6f7f9',
        accent: '#4d8bff',
      },
      fontFamily: {
        display: ['var(--font-display)', '-apple-system', 'sans-serif'],
        body: ['var(--font-body)', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        portfolio: '1320px',
      },
      transitionTimingFunction: {
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
