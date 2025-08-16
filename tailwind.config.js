/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,jsx}',
      './components/**/*.{js,jsx}',
      './app/**/*.{js,jsx}',
      './src/**/*.{js,jsx}',
    ],
    theme: {
      extend: {
        colors: {
          // Primary colors
          primary: {
            50: '#f9fafb',   // Very light gray
            100: '#f3f4f6',  // Light gray
            200: '#e5e7eb',  // Light gray
            300: '#d1d5db',  // Medium light gray
            400: '#9ca3af',  // Medium gray
            500: '#6b7280',  // Medium gray
            600: '#4b5563',  // Medium dark gray
            700: '#374151',  // Dark gray
            800: '#1f2937',  // Very dark gray
            900: '#111827',  // Almost black
            950: '#030712',  // Nearly black
          },
          // Accent colors (black and white variations)
          accent: {
            black: '#000000',
            white: '#ffffff',
            'off-white': '#fafafa',
            'soft-black': '#0a0a0a',
          }
        },
        spacing: {
          // Custom spacing values
          '18': '4.5rem',   // 72px
          '22': '5.5rem',   // 88px
          '26': '6.5rem',   // 104px
          '30': '7.5rem',   // 120px
          '34': '8.5rem',   // 136px
          '38': '9.5rem',   // 152px
          '42': '10.5rem',  // 168px
          '46': '11.5rem',  // 184px
          '50': '12.5rem',  // 200px
          '54': '13.5rem',  // 216px
          '58': '14.5rem',  // 232px
          '62': '15.5rem',  // 248px
          '66': '16.5rem',  // 264px
          '70': '17.5rem',  // 280px
          '74': '18.5rem',  // 296px
          '78': '19.5rem',  // 312px
          '82': '20.5rem',  // 328px
          '86': '21.5rem',  // 344px
          '90': '22.5rem',  // 360px
          '94': '23.5rem',  // 376px
          '98': '24.5rem',  // 392px
        },
        fontSize: {
          // Custom font sizes
          'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
          'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
          'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
          'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
          'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
          '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
          '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
          '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
          '5xl': ['3rem', { lineHeight: '1' }],           // 48px
          '6xl': ['3.75rem', { lineHeight: '1' }],        // 60px
          '7xl': ['4.5rem', { lineHeight: '1' }],         // 72px
          '8xl': ['6rem', { lineHeight: '1' }],           // 96px
          '9xl': ['8rem', { lineHeight: '1' }],           // 128px
        },
        borderRadius: {
          'none': '0px',
          'sm': '0.125rem',   // 2px
          'DEFAULT': '0.25rem', // 4px
          'md': '0.375rem',   // 6px
          'lg': '0.5rem',     // 8px
          'xl': '0.75rem',    // 12px
          '2xl': '1rem',      // 16px
          '3xl': '1.5rem',    // 24px
          '4xl': '2rem',      // 32px
          'full': '9999px',
        },
        boxShadow: {
          'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
          '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
          'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
          'none': 'none',
        },
        screens: {
          // Mobile first breakpoints
          'xs': '375px',    // Small mobile devices
          'sm': '640px',    // Mobile devices (default Tailwind)
          'md': '768px',    // Tablets (default Tailwind)
          'lg': '1024px',   // Small laptops (default Tailwind)
          'xl': '1280px',   // Desktops (default Tailwind)
          '2xl': '1536px',  // Large desktops (default Tailwind)
          
          // Custom breakpoints for specific use cases
          'mobile': '480px',     // Larger mobile phones
          'tablet': '768px',     // Standard tablet size
          'laptop': '1024px',    // Standard laptop size
          'desktop': '1280px',   // Standard desktop size
          'wide': '1440px',      // Wide screens
          'ultrawide': '1920px', // Ultra-wide screens
          
          // Max-width breakpoints (for desktop-first approach)
          'max-2xl': {'max': '1535px'},
          'max-xl': {'max': '1279px'},
          'max-lg': {'max': '1023px'},
          'max-md': {'max': '767px'},
          'max-sm': {'max': '639px'},
          'max-xs': {'max': '374px'},
          
          // Height-based breakpoints for better mobile UX
          'h-sm': {'raw': '(min-height: 640px)'},
          'h-md': {'raw': '(min-height: 768px)'},
          'h-lg': {'raw': '(min-height: 1024px)'},
          
          // Orientation breakpoints
          'portrait': {'raw': '(orientation: portrait)'},
          'landscape': {'raw': '(orientation: landscape)'},
          
          // Touch device detection
          'touch': {'raw': '(hover: none) and (pointer: coarse)'},
          'no-touch': {'raw': '(hover: hover) and (pointer: fine)'},
          
          // Print styles
          'print': {'raw': 'print'},
        }
      },
    },
    plugins: [
    require('@tailwindcss/typography'),
  ],
  }