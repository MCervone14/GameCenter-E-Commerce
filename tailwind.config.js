/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#fcf9ab",
          secondary: "#3c97c1",
          accent: "#26aa1d",
          neutral: "#152028",
          "base-100": "#364854",
          info: "#81DFF8",
          success: "#22966D",
          warning: "#F8AE25",
          error: "#F06360",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
