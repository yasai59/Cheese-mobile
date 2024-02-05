const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: "#FFD100",
        primaryDark: "#FFA000",
        secondary: "#C06E52",
        terciary: "#1A936F",
        light: "#D6D6D6",
        base: "#333533",
        "base-dark": "#202020",
        "base-light": "#515451",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ":root": {
          "--primary": "#FFD100",
          "--secondary": "#C06E52",
          "--terciary": "#1A936F",
          "--light": "#D6D6D6",
          "--base": "#333533",
          "--base-dark": "#202020",
          "--base-light": "#515451",
        },
        ".input": "text-white",
      });
    }),
  ],
};
