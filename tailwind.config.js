/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  darkMode: 'class', // Activar soporte para modo oscuro con clase .dark en <html> o <body>
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
        // 🎨 Fondo general y superficies
        'app-bg': '#f5f7fa',           // Fondo principal (gris azulado claro)
        'surface-1': '#ffffff',        // Paneles, tarjetas
        'surface-hover': '#e2e8f0',    // Hover sobre superficies claras
        'surface-pressed': '#e5e7eb',  // Activo / pulsado en superficies claras
        'surface-thumb': '#ffffff',    // Thumb de toggles

        // 📚 Texto y etiquetas
        'text-main': '#334155',        // Texto principal (slate-700)
        'text-on-pastel': '#1e293b',   // Texto sobre botones/acento pastel (slate-800)
        'text-subtle': '#64748b',      // Texto secundario (slate-500)
        'text-placeholder': '#94a3b8', // Placeholder y elementos inactivos
        'text-text-muted': '#94a3b8',  // Pie de página, info secundaria (alias de placeholder)

        // 🌈 Estados visuales (semánticos)
        'status-success': '#d1fae5',         // Verde claro real (green-100)
        'status-success-hover': '#a7f3d0',   // Hover (green-200)
        'status-success-dark': '#34d399',      // Verde medio (emerald-400)
        'status-success-dark-hover': '#10b981',// Hover en oscuro (emerald-500)
        'status-alert': '#fecaca',           // Rojo pastel (tarea eliminada)
        'status-active': '#fef08a',          // Amarillo pastel (tarea finalizada)
        'status-inprogress': '#cbd5e1',      // Gris pastel (tarea en curso)

        // 🟦 Azul pastel (botones de importar/exportar)
        'status-accent': '#bfdbfe',          // Fondo claro (blue-200)
        'status-accent-hover': '#93c5fd',    // Hover (blue-300)

        // 🔴 Rojo pastel (borrar todo)
        'status-danger': '#fecaca',          // Fondo claro (red-200)
        'status-danger-hover': '#fca5a5',    // Hover rojo medio (red-300)

        // 🟡 Acentos y botones principales
        'accent-main': '#93c5fd',            // Azul pastel principal

        // 🌓 Turnos (texto icónico)
        'text-shift-morning': '#facc15',     // Amarillo claro
        'text-shift-afternoon': '#f59e0b',   // Naranja ámbar
        'text-shift-night': '#6366f1',       // Azul índigo

        // 🎛️ Controles interactivos
        'toggle-inactive': '#cbd5e1',        // Fondo del switch inactivo

        // 🧱 Separadores y bordes
        'divider': '#cbd5e1',                // Bordes y líneas divisorias (slate-300)

        // 🎨 Opciones (morado/indigo)
        'status-purple': '#ddd6fe',           // Fondo claro (violet-200)
        'status-purple-hover': '#c4b5fd',     // Hover (violet-300)
        'status-purple-dark': '#a78bfa',      // Modo oscuro (violet-400)
        'status-purple-dark-hover': '#8b5cf6',// Hover en oscuro (violet-500)
        'text-purple-strong': '#5b21b6',      // Texto fuerte morado (violet-800)
      },
      textColor: {
        // 🎨 Colores personalizados de texto
        'success-strong': '#047857',          // Texto fuerte verde (green-700)
        'alert-strong': '#b91c1c',            // red-700
        'active-strong': '#b45309',           // amber-700
        'accent-strong': '#2563eb',           // Azul fuerte (blue-600)
        'danger-strong': '#b91c1c',           // Rojo fuerte (red-700)
        'purple-strong': '#6d28d9',           // violet-700
      },
    },
  },
  plugins: [],
}
