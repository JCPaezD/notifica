import './assets/main.css'
import './assets/css/animations.css'

import { createApp } from 'vue'
import App from './App.vue'

import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support'

// 🌙 Aplicar clase 'dark' antes de montar la app según el modo guardado
const saved = localStorage.getItem('darkMode')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

const shouldUseDark =
  saved === 'dark' ||
  (saved === 'system' || saved === null) && prefersDark

if (shouldUseDark) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

import { Capacitor } from '@capacitor/core'

// 🧪 Inicializar compatibilidad edge-to-edge y status bar en Android nativo
document.addEventListener('deviceready', async () => {
  if (Capacitor.getPlatform() !== 'android') return

  try {
    await EdgeToEdge.enable()
    await EdgeToEdge.setBackgroundColor({ color: '#00ffffff' })

    // await StatusBar.setOverlaysWebView({ overlay: false })
    // await StatusBar.setBackgroundColor({ color: '#00ffffff' })
    // await StatusBar.setStyle({ style: Style.Dark })
  } catch (error) {
    console.warn('[EdgeToEdge|StatusBar] No se pudo aplicar configuración:', error)
  }

  // ⚙️ Obtener color de fondo actual (resuelto por Tailwind) desde un span temporal
  const span = document.createElement('span')
  span.className = 'bg-surface-1 dark:bg-surface-1-dark'
  span.style.display = 'none'
  document.body.appendChild(span)

  const color = getComputedStyle(span).backgroundColor
  document.body.removeChild(span)

  // 🎯 Convertir rgb(...) → #rrggbb
  const rgbToHex = (rgb: string) => {
    const result = rgb.match(/\d+/g)
    if (!result || result.length < 3) return '#ffffff'
    return (
      '#' +
      result
        .slice(0, 3)
        .map(x => parseInt(x).toString(16).padStart(2, '0'))
        .join('')
    )
  }

  const hexColor = rgbToHex(color)

  // 🧪 Aplicar a EdgeToEdge plugin
  try {
    console.log('🎨 Color resuelto:', color)
    console.log('🎨 HEX:', hexColor)

    await EdgeToEdge.setBackgroundColor({ color: hexColor })
  } catch (err) {
    console.warn('Error al aplicar EdgeToEdge background (dinámico):', err)
  }
})


createApp(App).mount('#app')
