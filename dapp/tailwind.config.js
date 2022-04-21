module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '950px',
      // => @media (min-width: 576px) { ... }

      // 'md': 'px',
      // => @media (min-width: 960px) { ... }

      'lg': '950px',
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [],
}