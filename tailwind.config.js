/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '1.25rem',
    },
    colors: {
      primary: '#ff7d00',
      secondary: '#9CA3AF',
      dark: '#1F2937',
      white: '#FFFFFF',
      'white-100': '#F8F8FA',
      body: '#FEEAD5',
      error: "#e6514c"
    },
    screens: {
      '2xl': '1100px',
      'lg': '800px',
      'md': '425px',
      'sm': '360px'
    }
  },
  plugins: [],
}

