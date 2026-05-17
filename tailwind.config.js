export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-bg': 'var(--color-bg)',
        'theme-primary': 'var(--color-primary)',
        'theme-secondary': 'var(--color-secondary)',
        'theme-accent': 'var(--color-accent)',
        'theme-text': 'var(--color-text)',
        'theme-dot': 'var(--color-dot)',
        // Specific pokemon colors mapped if needed directly, though using variables is preferred
        pokeRed: '#E3350D',
        pokeYellow: '#FFCC00',
        pokeBlue: '#3164B0',
        martBlue: '#1A365D',
        gameDark: '#1E293B',
      },
      fontFamily: {
        sans: ['"Zen Maru Gothic"', 'sans-serif'],
      },
      boxShadow: {
        'game': '4px 4px 0px 0px rgba(30, 41, 59, 1)',
        'game-sm': '2px 2px 0px 0px rgba(30, 41, 59, 1)',
        'game-red': '4px 4px 0px 0px #991b1b',
      }
    },
  },
  plugins: [],
}
