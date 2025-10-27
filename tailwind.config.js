/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'desktop': '1024px',
        'desktop-lg': '1280px',
        'desktop-xl': '1600px',
      },
      colors: {
        // Emerald Green Palette - professional and modern
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Primary Emerald
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // Dark Green for accents and text
        darkgreen: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d', // Dark Green
        },
        // Custom color palette as specified
        custom: {
          'primary-emerald': '#10b981',  // Primary Emerald
          'accent-darkgreen': '#14532d', // Dark Green accent
          'white': '#ffffff',            // White for contrast
          'dark-grey': '#1f2937',        // Dark Grey/Black for main text
          'light-grey': '#6b7280',       // Light Grey for subtle elements
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'desktop-5xl': ['3.5rem', { lineHeight: '1.1' }],
        'desktop-4xl': ['2.5rem', { lineHeight: '1.2' }],
        'desktop-2xl': ['1.75rem', { lineHeight: '1.3' }],
        'desktop-xl': ['1.25rem', { lineHeight: '1.4' }],
        'desktop-lg': ['1.125rem', { lineHeight: '1.5' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}
