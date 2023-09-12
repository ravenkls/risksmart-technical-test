/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Inter, sans-serif",
      },
      colors: {
        primary: {
          50: "#f0fdfb",
          100: "#ccfbf3",
          200: "#99f6e8",
          300: "#5debda",
          400: "#41d9cc",
          500: "#13b9ae",
          600: "#0c958f",
          700: "#0e7772",
          800: "#115e5c",
          900: "#134e4c",
          950: "#042e2f",
        },
      },
    },
  },
  plugins: [],
};
