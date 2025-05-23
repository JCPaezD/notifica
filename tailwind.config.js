/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'app-bg': '#f5f7fa',        // Fondo: gris azulado claro
        'text-main': '#334155',     // Texto principal: slate-700
        'text-on-pastel': '#1e293b', // Texto sobre pasteles: slate-800 (más oscuro para contraste)
        'accent-main': '#93c5fd',   // Acento principal: azul pastel (Tailwind blue-300)
        'status-success': '#a7f3d0', // Éxito: verde menta claro (Tailwind emerald-200)
        'status-alert': '#fecaca',   // Alerta: rojo salmón pastel (Tailwind red-300)
        'status-active': '#fef08a',  // Activo: amarillo mantequilla (Tailwind yellow-200)
      }
    },
  },
  plugins: [],
}
