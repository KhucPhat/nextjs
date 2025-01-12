import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors');

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'hsl(var(--primary-foreground))',
        },
        background: {
          DEFAULT: 'hsl(var(--background))',
        },

        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: {
          DEFAULT: 'hsl(var(--border))',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        text: {
          DEFAULT: 'hsl(var(--text-default))',
        },
        'lavender-mist': 'hsl(var(--lavender-mist))',
        'semi-transparent-black': 'hsl(var(--semi-transparent-black))',
        'semi-transparent-white': 'hsl(var(--semi-transparent-white))',
        'neutral-gray': 'hsl(var(--neutral-gray))',
        'light-yellow': 'hsl(var(--light-yellow))',
        'ocean-blue': 'hsl(var(--ocean-blue))',
        'gray-24': 'hsl(var(--gray-24))',
        'gray-60': 'hsl(var(--gray-60))',
        'gray-69': 'hsl(var(--gray-69))',
        black: 'hsl(var(--text-default))',
        'black-60': 'hsl(var(--black-60))',
        'black-51': 'hsl(var(--black-51))',
        'transparent-black-38': 'hsl(var(--transparent-black-38))',
        link: 'hsl(var(--text-link))',
        'light-gray-btn': 'hsl(var(--light-gray-btn))',
        'content-blur': 'hsl(var(--text--blur))',
        comic: 'hsl(var(--text-comic))',
        'comic-tag': 'hsl(var(--text-comic-tag))',
        'comic-close': 'hsl(var(--text-comic-close))',
        'crimson-red': 'hsl(var(--crimson-red))',
        'dark-gray': 'hsl(var(--drak-gray))',
        'hight-light-red': 'var(--primary)',
        trial: 'hsla(var(--background-trial))',
        'light-grayish-blue': 'hsl(var(--light-grayish-blue))',
        'comic-modal-blur': 'hsl(var(--background-comic-blur))',
        'golden-yellow': 'hsl(var(--golden-yellow))',
        'very-light-gray': 'hsl(var(--very-light-gray))',
        'snow-white': 'hsl(var(--snow-white))',
        'dark-gray-modal-40': 'hsl(var(--modal-blur-40))',
        'dark-gray-modal-50': 'hsl(var(--modal-blur-50))',
        'dark-aqua': 'hsl(var(--dark-aqua))',
        amber: 'hsl(var(--amber))',
        'mint-green': 'hsl(var(--mint-green))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      borderColor: {
        'transparent-black': 'hsl(var(--transparent-black))',
        'transparent-black-102': 'hsl(var(--transparent-black-102))',
        'comic-btn': 'hsl(var(--border-comic))',
        trial: 'hsl(var(--border-trial))',
        'dark-red': 'hsl(var(--dark-red))',
        amber: 'hsl(var(--amber))',
        'light-gray': 'hsl(var(--light-gray))',
        link: 'hsl(var(--text-link))',
        'very-light-black': 'hsl(var(--very-light-black))',
      },
    },
  },
  // prefix: 'boilerplate-',
  plugins: [require('tailwindcss-animate')],
};
export default config;
