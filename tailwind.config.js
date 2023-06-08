/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      fontFamily: {
        inter: ["Inter", "Lato", "Playfair", "sans-serif"],
        lato: ["Lato", "Inter", "sans-serif"],
        playfair: ["Playfair", "Lato", "Inter", "sans-serif"],
        heading: ["Playfair", "Lato", "Inter", "sans-serif"],
      },
    },
    backgroundPosition: {
      "top-64": "center top 4rem",
    },
    animation: {
      "pulse-slow": "pulse 3s linear 3",
    },
    fontFamily: {
      // sans: ["Sofia Pro", "Arial", "sans-s erif"],
    },
  },
  plugins: [
    require("tailwindcss-textshadow"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar"),
  ],
};
