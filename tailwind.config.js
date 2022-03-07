module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    fontFamily: {
      sans: ['Rubik', 'sans-serif'],
    },
    container: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1100px',
        xl: '1200px',
      },
    },
    extend: {
      colors: {
        primaryBlue: 'hsl(238, 40%, 52%)',
        primaryBlueHover: 'hsl(239, 38%, 72%)',
        primaryRed: 'hsl(358, 79%, 66%)',
        primaryGrayBlue: 'hsl(239, 57%, 85%)',
        primaryPaleRed: 'hsl(357, 100%, 86%)',
        secondaryDarkBlue: 'hsl(212, 24%, 26%)',
        secondaryGrayBlue: 'hsl(211, 10%, 45%)',
        secondaryLightGray: 'hsl(223, 19%, 93%)',
        secondaryLighterGray: 'hsl(228, 33%, 97%)',
      },
    },
  },
  plugins: [],
}
