/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta suave: gris cálido + lavanda, acento violeta
        background: "#EEEEEE", // crema muy claro para fondos
        foreground: "#171717", // texto principal oscuro
        card: "#FFFFFF", // tarjetas blancas
        muted: "#F8EDED", // lavanda muy suave para secciones
        primary: {
          DEFAULT: "#8E1616", // violeta moderado (acento)
          foreground: "#FFFFFF"
        },
        border: "#FFDEDE" // borde suave
      },
      borderRadius: {
        md: "10px",
        lg: "14px"
      }
    }
  },
  plugins: [],
}

