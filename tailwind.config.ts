import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        darkBlue: "hls(217, 28%, 15%)",
        darkBlue1: "hls(218, 28%, 13%)",
        darkBlue2: "hls(216, 53%, 9%)",
        darkBlue3: "hls(219, 30%, 18%)",
        accentCyan: "hls(176, 68%, 64%)",
        accentBlue: "hls(198, 60%, 50%)",
        lightRed: "hsl(0, 100%, 63%)",
        primary: "#3D277D",
        secondary: "#5D4B93"
      },
      fontFamily: {
        sans: ["Raleway", "sans-serif"],
        opensans: ["Open Sans", "sans-serif"],
        poppins: "Poppins",
        charm: "Charm",
        inter: "Inter",
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1200",
      },
    },
  },

  backgroundImage: () => ({
    "logo-dark-mode": "url('/public/assets/imgs/logo/logo-dark-mode.svg')",
    "logo-light-mode": "url('assets/imgs/logo/logo-light-mode.svg')",
    "curvy-dark-mode": "url('/public/assets/imgs/home/bg-curvy-dark-mode.svg')",
    "curvy-light-mode":
      "url('/public/assets/imgs/home/bg-curvy-light-mode.svg')",
  }),
  variants: {
    extends: {
      backgroundImage: ["dark"],
    },
  },
  plugins: [],
};
export default config;
