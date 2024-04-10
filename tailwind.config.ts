export default {
  theme: {
    colors: {
      "white-cream": "#F2F1EB",
      white: "#FFFFFF",
      black: "#000000",
      "teal-dark": "#007F73",
      "teal-light": "#36B481",
      orange: "#FFC700",
      yellow: "#EDD960",
    },
    extend: {
      fontFamily: {
        raleway: "Raleway",
      },
    },
  },
  plugins: [],
  content: [
    `~/components/**/*.{vue,js,ts}`,
    `~/layouts/**/*.vue`,
    `~/pages/**/*.vue`,
    `~/composables/**/*.{js,ts}`,
    `~/plugins/**/*.{js,ts}`,
    `~/utils/**/*.{js,ts}`,
    `~/App.{js,ts,vue}`,
    `~/app.{js,ts,vue}`,
    `~/Error.{js,ts,vue}`,
    `~/error.{js,ts,vue}`,
    `~/app.config.{js,ts}`,
  ],
};
