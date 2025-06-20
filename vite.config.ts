// vite.config.ts
// Archivo de configuración para Vite. Gestiona la configuración general del proyecto,
// la configuración de la Progressive Web App (PWA) incluyendo el manifest y el service worker,
// y la configuración de plugins como Vue DevTools y alias de rutas.
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate', // El Service Worker se actualizará automáticamente cuando haya una nueva versión.
      injectRegister: 'auto',   // El plugin intentará inyectar el código de registro del SW automáticamente.
      devOptions: {
        enabled: true, // Permite probar el Service Worker en modo desarrollo.
        type: 'module', // Necesario para Vite 5+ en desarrollo.
      },
      manifest: {
        name: 'Notifica - Registro de Tareas',
        short_name: 'Notifica',
        description: 'Aplicación para registrar tareas laborales de forma ágil.',
        theme_color: '#93c5fd',     // Nuevo color de acento principal
        background_color: '#f5f7fa', // Nuevo color de fondo
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: 'icons/icon-192x192.png', // Ruta relativa a la carpeta public
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png', // Ruta relativa a la carpeta public
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/icon-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }

        ],
        screenshots: [
          {
            "src": "screenshots/screenshot-desktop-1.png", // Ruta relativa a la carpeta public
            "sizes": "571x794", // Tamaño de tu captura de escritorio
            "type": "image/png",
            "form_factor": "wide",
            "label": "Vista de Notifica en Escritorio"
          },
          {
            "src": "screenshots/screenshot-mobile-1.png", // Ruta relativa a la carpeta public
            "sizes": "357x738", // Tamaño de tu captura móvil (ejemplo)
            "type": "image/png",
            "form_factor": "narrow",
            "label": "Vista de Notifica en Móvil"
          }
        ]
      },
      workbox: {
        // Patrones para incluir en el precache.
        // Asegúrate de que todos los tipos de archivo esenciales para tu app estén aquí.
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}'],
        // Si una navegación a una URL no cacheada ocurre (típico en SPAs),
        // sirve 'index.html' en su lugar.
        navigateFallback: 'index.html',
        // Limpia cachés antiguas cuando un nuevo Service Worker se activa.
        cleanupOutdatedCaches: true,
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
