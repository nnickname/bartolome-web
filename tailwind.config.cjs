/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta actualizada: primary verde neón océano, secundarios púrpura + navy
        background: "#EFF3FF", // hielo
        surface: "#FFFFFF",
        card: "#FFFFFF",
        foreground: "#121212",
        muted: "#F5F7FB",
        border: "#E6EAF5",
        primary: {
          DEFAULT: "#EE4266", // verde neón oceano
          foreground: "#001B16",
          variant: "#00BFA5",
        },
        secondary: {
          DEFAULT: "#7B6CF6", // púrpura suave
          foreground: "#FFFFFF",
          variant: "#5A4AE3",
        },
        navy: "#1B1742", // acento oscuro
        error: {
          DEFAULT: "#B00020",
          foreground: "#FFFFFF",
        }
      },
      borderRadius: {
        md: "10px",
        lg: "14px"
      }
    }
  },
  plugins: [],
}

