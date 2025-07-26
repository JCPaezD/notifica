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
        // 🎨 Superficies y contornos
        'app-bg': '#f5f7fa',
        'surface-1': '#ffffff',
        'surface-hover': '#e2e8f0',
        'surface-pressed': '#e5e7eb',
        'surface-thumb': '#ffffff',
        
        'divider': '#cbd5e1',

        // 🌑 Superficies en modo oscuro
        'app-bg-dark': '#0f172a',
        'surface-1-dark': '#1e293b',
        'surface-hover-dark': '#334155',
        'surface-pressed-dark': '#475569',
        'surface-thumb-dark': '#0f172a',

        'divider-dark': '#475569',

        // 🎛️ Controles e interactividad
        'accent-main': '#93c5fd',
        'toggle-inactive': '#cbd5e1',

        // 🎛️ Acento y controles modo oscuro
        'accent-main-dark': '#4f8ce8',
        'toggle-inactive-dark': '#64748b',

        // 🌈 Estados visuales
        'status-success': '#d1fae5',
        'status-success-hover': '#a7f3d0',

        'status-alert': '#fecaca',
        'status-active': '#fef08a',
        'status-inprogress': '#cbd5e1',

        'status-accent': '#bfdbfe',
        'status-accent-hover': '#93c5fd',

        'status-danger': '#fecaca',
        'status-danger-hover': '#fca5a5',

        'status-purple': '#ddd6fe',
        'status-purple-hover': '#c4b5fd',

        // 🌈 Estados visuales oscuros
        'status-success-dark': '#166534',
        'status-success-dark-hover': '#047857',

        'status-alert-dark': '#7f1d1d',
        'status-danger-dark': '#b91c1c',
        'status-danger-dark-hover': '#dc2626',

        'status-active-dark': '#78350f',
        'status-inprogress-dark': '#475569',

        'status-accent-dark': '#1d4ed8',
        'status-accent-hover-dark': '#3b82f6',

        'status-purple-dark': '#6b21a8',
        'status-purple-dark-hover': '#8b5cf6',
      },

      backgroundColor: {
        // ✅ Toast – fondo
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

        // 🌑 Toasts – modo oscuro
        'toast-success-dark': '#0c3a24',
        'toast-success-action-dark': '#19834f',
        'toast-success-action-hover-dark': '#22a36c',

        'toast-error-dark': '#5a1b11',
        'toast-error-action-dark': '#b91c1c',
        'toast-error-action-hover-dark': '#dc2626',

        'toast-warning-dark': '#9a580d',
        'toast-warning-action-dark': '#b1730d',
        'toast-warning-action-hover-dark': '#facc15',

        'toast-info-dark': '#223d75',
        'toast-info-action-dark': '#3262b8',
        'toast-info-action-hover-dark': '#60a5fa',
      },

      borderColor: {
        // ✅ Toast – borde
        'toast-success-border': '#a7f3d0',
        'toast-error-border': '#fecaca',
        'toast-warning-border': '#fde68a',
        'toast-info-border': '#bfdbfe',

        // ✅ Toast – bordes en modo oscuro
        'toast-success-border-dark': '#22c55e',
        'toast-error-border-dark': '#f87171',
        'toast-warning-border-dark': '#facc15',
        'toast-info-border-dark': '#60a5fa',
      },

      textColor: {
        // 📚 Texto base y etiquetas
        'main': '#334155',
        'on-pastel': '#1e293b',
        'subtle': '#64748b',
        'placeholder': '#94a3b8',
        'muted-80': 'rgba(148, 163, 184, 0.8)',

        // 📚 Texto base y etiquetas (modo oscuro)
        'main-dark': '#f1f5f9',
        'on-pastel-dark': '#e2e8f0',
        'subtle-dark': '#cbd5e1',
        'placeholder-dark': '#94a3b8',
        'muted-80-dark': 'rgba(203, 213, 225, 0.8)',

        // ✅ Texto – semántico fuerte
        'success-strong': '#047857',
        'alert-strong': '#b91c1c',
        'danger-strong': '#b91c1c',
        'active-strong': '#b45309',
        'accent-strong': '#2563eb',
        'purple-strong': '#6d28d9',

        // ✅ Texto – semántico fuerte (modo oscuro)
        'success-strong-dark': '#22c55e',
        'alert-strong-dark': '#f87171',
        'danger-strong-dark': '#f87171',
        'active-strong-dark': '#fbbf24',
        'accent-strong-dark': '#60a5fa',
        'purple-strong-dark': '#a78bfa',

        // 🌓 Turnos
        'shift-morning': '#facc15',
        'shift-afternoon': '#f59e0b',
        'shift-night': '#6366f1',

        // 🌓 Turnos (modo oscuro)
        'shift-morning-dark': '#fde68a',
        'shift-afternoon-dark': '#fcd34d',
        'shift-night-dark': '#a5b4fc',

        // ✅ Toast – texto
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
        
        // ✅ Toast – texto en modo oscuro
        'toast-success-text-dark': '#22c55e',
        'toast-success-action-text-dark': '#4ade80',
        'toast-success-close-dark': '#86efac',
        'toast-success-close-hover-dark': '#16a34a',

        'toast-error-text-dark': '#f87171',
        'toast-error-action-text-dark': '#fca5a5',
        'toast-error-close-dark': '#fecaca',
        'toast-error-close-hover-dark': '#dc2626',

        'toast-warning-text-dark': '#facc15',
        'toast-warning-action-text-dark': '#fde047',
        'toast-warning-close-dark': '#fef08a',
        'toast-warning-close-hover-dark': '#ca8a04',

        'toast-info-text-dark': '#60a5fa',
        'toast-info-action-text-dark': '#93c5fd',
        'toast-info-close-dark': '#bfdbfe',
        'toast-info-close-hover-dark': '#3b82f6',

        // 🎯 Iconos – modo oscuro (para botones de acción)
        'icon-alert-dark': '#f87171',
        'icon-active-dark': '#fbbf24',
        'icon-muted-dark': '#94a3b8',
        'icon-success-dark': '#4ade80',
      },
    },
  },
  plugins: [],
}
