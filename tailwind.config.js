export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sc2: {
          dark: '#0a0e1a',
          darker: '#050812',
          blue: '#1e90ff',
          brightBlue: '#00d4ff',
          teal: '#00ffcc',
          gold: '#ffd700',
          red: '#ff3333',
          purple: '#b026ff',
          gray: {
            900: '#0f1419',
            800: '#1a1f2e',
            700: '#252d3d',
            600: '#3a4558',
            500: '#4f5d73',
          }
        }
      },
      fontFamily: {
        'sc2': ['"Orbitron"', 'sans-serif'],
        'mono': ['"Roboto Mono"', 'monospace']
      },
      boxShadow: {
        'sc2-glow': '0 0 20px rgba(30, 144, 255, 0.5)',
        'sc2-glow-intense': '0 0 30px rgba(0, 212, 255, 0.8)',
        'sc2-target': '0 0 15px rgba(255, 215, 0, 0.6)'
      },
      animation: {
        'target-spawn': 'targetSpawn 0.2s ease-out',
        'target-hit': 'targetHit 0.15s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-down': 'slideDown 0.3s ease-out'
      },
      keyframes: {
        targetSpawn: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '0.8' },
          '100%': { transform: 'scale(1) rotate(360deg)', opacity: '1' }
        },
        targetHit: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.8)', opacity: '0.5' },
          '100%': { transform: 'scale(0)', opacity: '0' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(30, 144, 255, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 212, 255, 0.8)' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
