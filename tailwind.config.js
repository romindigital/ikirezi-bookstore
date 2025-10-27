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
        // Primary Green - vibrant, light to medium teal green (similar to main banner color)
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#20b2aa', // Primary Green - vibrant teal
          600: '#1a9b94',
          700: '#15847e',
          800: '#106d68',
          900: '#0b5652',
        },
        // Accent Green - slightly darker, more muted green (for arrows and Umuganda section)
        accent: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#b9e5b9',
          300: '#96d896',
          400: '#73cb73',
          500: '#50be50', // Accent Green - muted green
          600: '#409840',
          700: '#307230',
          800: '#204c20',
          900: '#102610',
        },
        // Custom color palette as specified
        custom: {
          'primary-green': '#20b2aa',    // Primary Green - vibrant teal
          'accent-green': '#50be50',     // Accent Green - muted green
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
