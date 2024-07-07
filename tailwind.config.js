/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)', 
      },
      colors: {
        lightgrey: "#f5f5f5",
        darkgrey: "#333333",
        primaryblue: "#007BFF",
        paleblue: "#ADD8E6",
      }
    },
    // colors: {
    //   green: "#63A57B",
    //   cyan: "#55C0A0",
    //   gray: "#D9D9D9",
    //   darkgray: "#646464",
    //   hgray: "#646464",
    //   lgray: "#534141",
    //   pgray: "#545454",
    //   white: "#FFFFFFFF",
    //   black: "#000",
    //   gradientgreen: "#0EC4BC",
    //   gradientcyan: "#0E9F76",
    //   buttonfrom: "#6BB385",
    //   buttonto: "#3C7D53",
    //   buttonborder: "#ffffff5a",
    //   deepgray: "#333333",
    //   councilborder: "#63A57B",
    //   navbutton: "#97BFA8",
    //   navmobile: "#62C0AF",
    //   footerbg: "#444B46",
    // },
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
