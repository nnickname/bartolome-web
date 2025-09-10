/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta suave: gris cálido + lavanda, acento violeta
        background: "#F0F3FF", // crema muy claro para fondos
        foreground: "#171717", // texto principal oscuro
        card: "#FFFFFF", // tarjetas blancas
        muted: "#F2EFFE", // lavanda muy suave para secciones
        primary: {
          DEFAULT: "#7C3AED", // violeta moderado (acento)
          foreground: "#FFFFFF"
        },
        border: "#E7E2D3" // borde suave
      },
      borderRadius: {
        md: "10px",
        lg: "14px"
      }
    }
  },
  plugins: [],
}

