/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'inner': 'inset 0 6px 10px 0 rgba(0, 0, 0, 0.22)', 
        'xl': '0 10px 25px -5px rgb(0 0 0 / 0.25), 0 4px 10px -6px rgb(0 0 0 / 0.3)',
      },
      colors: {
        lightgrey: "#f5f5f5",
        darkgrey: "#333333",
        primaryblue: "#007BFF",
        paleblue: "#ADD8E6",
      }
    },
    screens: {
      xxs: "320px",
      xs: "480px",
      ssm: "540px",
      sm: "640px",
      md: "768px",
      sl: "900px",
      lg: "1280px",
      xl: "1366px",
      xxl: "1536px",
    },
  },

  plugins: [],
};
