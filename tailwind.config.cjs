module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFF7EE',
        'pastel-pink': '#FFD6E0',
        'pastel-blue': '#D8EEFF',
        'pastel-yellow': '#FFF3C4',
        'soft-purple': '#E9D8FF',
        teal: '#8ED1C6'
      },
      fontFamily: {
        hand: ['Patrick Hand', 'Amatic SC', 'cursive'],
        mono: ['Space Mono', 'ui-monospace', 'SFMono-Regular']
      }
    }
  },
  plugins: []
}
