module.exports = {
  content: ['./src/*.{html,js}'],
  theme: {
    extend: {
      fontSize: {
        mainsize: ['4rem', { lineHeight: '5rem' }],
        mobile: ['2.8rem', { lineHeight: '4rem' }],
        cursor: ['2.8rem', { lineHeight: '4.5rem' }],
      },

      fontFamily: {
        righteous: ['"Righteous"'],
        poppins: ['"Poppins"'],
      },
    },
  },
  plugins: [],
}
