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
      backgroundColor: {
        // ✅ Fondos toast personalizados
        'toast-success': '#ecfdf5',             // green-50
        'toast-success-action': '#d1fae5',      // green-100
        'toast-success-action-hover': '#bbf7d0',// green-200

        'toast-error': '#fef2f2',               // red-50
        'toast-error-action': '#fee2e2',        // red-100
        'toast-error-action-hover': '#fecaca',  // red-200

        'toast-warning': '#fefce8',             // yellow-50
        'toast-warning-action': '#fef9c3',      // yellow-100
        'toast-warning-action-hover': '#fef08a',// yellow-200

        'toast-info': '#eff6ff',                // blue-50
        'toast-info-action': '#dbeafe',         // blue-100
        'toast-info-action-hover': '#bfdbfe',   // blue-200
      },
      borderColor: {
        // ✅ Bordes toast personalizados
        'toast-success-border': '#a7f3d0',       // green-200
        'toast-error-border': '#fecaca',         // red-200
        'toast-warning-border': '#fde68a',       // yellow-200
        'toast-info-border': '#bfdbfe',          // blue-200
      },
      textColor: {
        // 🎨 Colores personalizados de texto
        'success-strong': '#047857',          // Texto fuerte verde (green-700)
        'alert-strong': '#b91c1c',            // red-700
        'active-strong': '#b45309',           // amber-700
        'accent-strong': '#2563eb',           // Azul fuerte (blue-600)
        'danger-strong': '#b91c1c',           // Rojo fuerte (red-700)
        'purple-strong': '#6d28d9',           // violet-700
        // 🌓 Turnos
        'shift-morning': '#facc15',
        'shift-afternoon': '#f59e0b',
        'shift-night': '#6366f1',
        // 🌓 Turnos-dark
        'shift-morning-dark': '#fde68a',    // Amarillo pastel oscuro
        'shift-afternoon-dark': '#fcd34d',  // Naranja pastel oscuro
        'shift-night-dark': '#a5b4fc',      // Azul pastel más suave
        // ✅ Textos toast personalizados
        'toast-success-text': '#15803d',              // green-700
        'toast-success-action-text': '#16a34a',       // green-600
        'toast-success-close': '#22c55e',             // green-400
        'toast-success-close-hover': '#166534',       // green-600

        'toast-error-text': '#b91c1c',                // red-700
        'toast-error-action-text': '#dc2626',         // red-600
        'toast-error-close': '#f87171',               // red-400
        'toast-error-close-hover': '#991b1b',         // red-600

        'toast-warning-text': '#a16207',              // yellow-700
        'toast-warning-action-text': '#ca8a04',       // yellow-600
        'toast-warning-close': '#eab308',             // yellow-400
        'toast-warning-close-hover': '#92400e',       // yellow-600

        'toast-info-text': '#1d4ed8',                 // blue-700
        'toast-info-action-text': '#2563eb',          // blue-600
        'toast-info-close': '#60a5fa',                // blue-400
        'toast-info-close-hover': '#1e40af',          // blue-600
      },
    },
  },
  plugins: [],
}
