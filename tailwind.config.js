/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: '#0D0D1A',
        surface: '#13131F',
        card: '#1A1A2E',
        border: '#2A2A45',
        accent: '#6C63FF',
        'accent-2': '#FF6584',
        'accent-3': '#43E97B',
        muted: '#8888AA',
      },
      backgroundImage: {
        'grad-main': 'linear-gradient(135deg, #0D0D1A 0%, #13131F 50%, #1A1A2E 100%)',
        'grad-card': 'linear-gradient(135deg, rgba(108,99,255,0.08) 0%, rgba(255,101,132,0.04) 100%)',
        'grad-accent': 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)',
        'grad-green': 'linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)',
        'grad-fire': 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
