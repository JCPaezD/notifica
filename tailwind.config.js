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
        'app-bg': '#f5f7fa',
        'surface-1': '#ffffff',
        'surface-hover': '#e2e8f0',
        'surface-pressed': '#e5e7eb',
        'surface-thumb': '#ffffff',

        // 📚 Texto y etiquetas
        'text-main': '#334155',
        'text-on-pastel': '#1e293b',
        'text-subtle': '#64748b',
        'text-placeholder': '#94a3b8',
        'text-text-muted': '#94a3b8',

        // 🌈 Estados visuales (semánticos)
        'status-success': '#d1fae5',
        'status-success-hover': '#a7f3d0',
        'status-success-dark': '#a7f3d0',           // antes: #34d399
        'status-success-dark-hover': '#6ee7b7',     // antes: #10b981
        'status-alert': '#fecaca',
        'status-active': '#fef08a',
        'status-inprogress': '#cbd5e1',

        // 🟦 Azul pastel (botones de importar/exportar)
        'status-accent': '#bfdbfe',
        'status-accent-hover': '#93c5fd',

        // 🔴 Rojo pastel (borrar todo)
        'status-danger': '#fecaca',
        'status-danger-hover': '#fca5a5',

        // 🟡 Acentos y botones principales
        'accent-main': '#93c5fd',

        // 🎛️ Controles interactivos
        'toggle-inactive': '#cbd5e1',

        // 🧱 Separadores y bordes
        'divider': '#cbd5e1',

        // 🎨 Opciones (morado/indigo)
        'status-purple': '#ddd6fe',
        'status-purple-hover': '#c4b5fd',
        'status-purple-dark': '#c4b5fd',           // antes: #a78bfa
        'status-purple-dark-hover': '#a78bfa',     // antes: #8b5cf6
        'text-purple-strong': '#5b21b6',
      },
      backgroundColor: {
        // ✅ Fondos toast personalizados
        'toast-success': '#ecfdf5',
        'toast-success-action': '#d1fae5',
        'toast-success-action-hover': '#bbf7d0',

        'toast-error': '#fef2f2',
        'toast-error-action': '#fee2e2',
        'toast-error-action-hover': '#fecaca',

        'toast-warning': '#fefce8',
        'toast-warning-action': '#fef9c3',
        'toast-warning-action-hover': '#fef08a',

        'toast-info': '#eff6ff',
        'toast-info-action': '#dbeafe',
        'toast-info-action-hover': '#bfdbfe',
      },
      borderColor: {
        // ✅ Bordes toast personalizados
        'toast-success-border': '#a7f3d0',
        'toast-error-border': '#fecaca',
        'toast-warning-border': '#fde68a',
        'toast-info-border': '#bfdbfe',
      },
      textColor: {
        // 🎨 Colores personalizados de texto
        'muted-80': 'rgba(148, 163, 184, 0.8)',
        'success-strong': '#047857',
        'alert-strong': '#b91c1c',
        'active-strong': '#b45309',
        'accent-strong': '#2563eb',
        'danger-strong': '#b91c1c',
        'purple-strong': '#6d28d9',

        // 🌓 Turnos
        'shift-morning': '#facc15',
        'shift-afternoon': '#f59e0b',
        'shift-night': '#6366f1',
        // 🌓 Turnos-dark
        'shift-morning-dark': '#fde68a',
        'shift-afternoon-dark': '#fcd34d',
        'shift-night-dark': '#a5b4fc',

        // ✅ Textos toast personalizados
        'toast-success-text': '#15803d',
        'toast-success-action-text': '#16a34a',
        'toast-success-close': '#22c55e',
        'toast-success-close-hover': '#166534',

        'toast-error-text': '#b91c1c',
        'toast-error-action-text': '#dc2626',
        'toast-error-close': '#f87171',
        'toast-error-close-hover': '#991b1b',

        'toast-warning-text': '#a16207',
        'toast-warning-action-text': '#ca8a04',
        'toast-warning-close': '#eab308',
        'toast-warning-close-hover': '#92400e',

        'toast-info-text': '#1d4ed8',
        'toast-info-action-text': '#2563eb',
        'toast-info-close': '#60a5fa',
        'toast-info-close-hover': '#1e40af',
      },
    },
  },
  plugins: [],
}
