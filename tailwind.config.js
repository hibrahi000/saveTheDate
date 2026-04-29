/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Forest greens
        forest: {
          50:  '#EAF3E8',
          100: '#CFE3CB',
          200: '#A6CB9F',
          300: '#7BB272',
          400: '#54944A',
          500: '#357A30',
          600: '#246224',
          700: '#1E4F1E',
          800: '#163C16',
          900: '#0C2A10',
          DEFAULT: '#1E4020',
        },
        sage: {
          DEFAULT: '#6B9E6B',
          light:   '#A6CB9F',
          dark:    '#3F6E40',
        },
        // Champagne / gold
        champagne: {
          50:  '#FBF6E7',
          100: '#F5EBC9',
          200: '#EDDB9B',
          300: '#E2C667',
          400: '#D4AF37',
          500: '#C49923',
          600: '#A07A18',
          700: '#7A5C12',
          800: '#564108',
          900: '#382B05',
          DEFAULT: '#C8A24C',
        },
        gold: {
          rich:  '#D4AF37',
          warm:  '#C49923',
          pale:  '#F2DFA0',
          deep:  '#8B6914',
        },
        // Creamy ivory
        ivory: {
          50:  '#FFFCF3',
          100: '#FAF6E9',
          200: '#F5EFD9',
          300: '#EFE7C8',
          400: '#E6DAB1',
          500: '#D9C792',
          DEFAULT: '#FAF6E9',
        },
        cream: '#F7F1E0',
        // Rich blacks
        ink: {
          DEFAULT: '#1A1A1A',
          soft:    '#2A2620',
          muted:   '#4A453E',
        },
      },
      fontFamily: {
        serif:    ['"Playfair Display"', 'Georgia', 'serif'],
        elegant:  ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script:   ['"Great Vibes"', 'cursive'],
        sans:     ['Montserrat', 'system-ui', 'sans-serif'],
        mono:     ['"DM Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'spin-slow':       'spin 14s linear infinite',
        'spin-slower':     'spin 22s linear infinite',
        'shimmer':         'shimmer 4s ease-in-out infinite',
        'gold-shine':      'goldShine 6s linear infinite',
        'soft-float':      'softFloat 6s ease-in-out infinite',
        'fade-up':         'fadeUp 1.1s cubic-bezier(0.4,0,0.2,1) both',
        'fade-in':         'fadeIn 1.2s ease-out both',
        'sparkle':         'sparkle 3s ease-in-out infinite',
        'ring-shine':      'ringShine 5s ease-in-out infinite',
        'bounce-slow':     'bounceSlow 2.4s ease-in-out infinite',
        'hint-bob':        'hintBob 1.8s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.8', filter: 'brightness(1)' },
          '50%':      { opacity: '1',   filter: 'brightness(1.15)' },
        },
        goldShine: {
          '0%':   { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        softFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%':      { opacity: '1',   transform: 'scale(1.2)' },
        },
        ringShine: {
          '0%, 100%': { filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.3)) brightness(1)' },
          '50%':      { filter: 'drop-shadow(0 0 28px rgba(255,255,255,0.7)) brightness(1.18)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translate(-50%, 0)', opacity: '0.3' },
          '50%':      { transform: 'translate(-50%, 6px)', opacity: '0.7' },
        },
        hintBob: {
          '0%, 100%': { transform: 'translateX(0)',   opacity: '0.92' },
          '50%':      { transform: 'translateX(4px)', opacity: '1' },
        },
      },
      boxShadow: {
        'tile':       '0 6px 28px -8px rgba(20,30,18,0.18), 0 2px 8px -2px rgba(20,30,18,0.08)',
        'tile-deep':  '0 18px 52px -16px rgba(20,30,18,0.28), 0 4px 14px -4px rgba(20,30,18,0.12)',
        'gold-glow':  '0 0 30px rgba(212,175,55,0.35)',
        'inner-soft': 'inset 0 1px 2px rgba(255,255,255,0.4)',
      },
      backgroundImage: {
        'gold-gradient':  'linear-gradient(110deg, #8B6914 0%, #D4AF37 25%, #F2DFA0 50%, #D4AF37 75%, #8B6914 100%)',
        'green-gold':     'linear-gradient(110deg, #1E4020 0%, #54944A 30%, #D4AF37 50%, #54944A 70%, #1E4020 100%)',
      },
    },
  },
  plugins: [],
};
