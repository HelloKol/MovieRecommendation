module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { "my-red": "#cf2323", "my-orange": "#D84B22" },
      width: { 100: "30rem" },
      screens: {
        'xs': '539px', 
      },
    },
  },
  plugins: [],
};
