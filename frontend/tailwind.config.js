module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your file structure
  ],
  theme: {
    extend: {
      keyframes: {
        rotateY180: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
      },
      animation: {
        rotateY180: 'rotateY180 0.6s forwards', // Adjust duration as needed
      },
    },
  },
  plugins: [],
}
