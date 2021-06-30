module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  presets: [require("./tailwind.config.argeta.js")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Ubuntu", "ui-sans-serif", "system-ui"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
