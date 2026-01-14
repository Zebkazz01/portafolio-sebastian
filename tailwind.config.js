/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#0a0a0f',
          deeper: '#050508',
          purple: '#1a0a2e',
          blue: '#0d1b2a',
        },
        nebula: {
          pink: '#ff6b9d',
          purple: '#c44dff',
          blue: '#4d7fff',
        },
        star: {
          white: '#ffffff',
          yellow: '#fff4d6',
          blue: '#d6e5ff',
        }
      },
      fontFamily: {
        space: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-space': 'linear-gradient(to bottom, #0a0a0f, #1a0a2e, #0d1b2a)',
      },
    },
  },
  plugins: [],
}
