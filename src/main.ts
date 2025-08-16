import './assets/main.css'
import './assets/css/animations.css'

import { createApp } from 'vue'
import App from './App.vue'

import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support'
import { StatusBar, Style } from '@capacitor/status-bar'
import { Device } from '@capacitor/device'

import { createI18n } from 'vue-i18n'
import es from './locales/es'
import en from './locales/en'



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
  } catch (error) {
    console.warn('[EdgeToEdge] No se pudo activar edge-to-edge:', error)
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

  // 🎨 Aplicar color dinámico a barras de sistema (status bar + edge-to-edge)
  try {
    await StatusBar.setOverlaysWebView({ overlay: false })
    await StatusBar.setBackgroundColor({ color: hexColor })
    await StatusBar.setStyle({ style: shouldUseDark ? Style.Dark : Style.Light })
    await EdgeToEdge.setBackgroundColor({ color: hexColor })
    if ((await Device.getInfo()).androidSDKVersion === 30) {
      await StatusBar.setBackgroundColor({ color: hexColor })
    }
  } catch (error) {
    console.warn('[StatusBar|EdgeToEdge] No se pudo aplicar configuración dinámica:', error)
  }
})


// 🧪 Mostrar logs visuales flotantes para depuración
//const debugDiv = document.createElement('div')
//debugDiv.id = 'debug-log'
//debugDiv.style.position = 'fixed'
//debugDiv.style.top = '50%'
//debugDiv.style.left = '50%'
//debugDiv.style.transform = 'translate(-50%, -50%)'
//debugDiv.style.backgroundColor = 'rgba(0,0,0,0.7)'
//debugDiv.style.color = 'white'
//debugDiv.style.padding = '8px 12px'
//debugDiv.style.fontSize = '14px'
//debugDiv.style.borderRadius = '8px'
//debugDiv.style.zIndex = '9999'
//debugDiv.style.pointerEvents = 'none'
//debugDiv.style.maxWidth = '90%'
//debugDiv.style.whiteSpace = 'pre-line'
//debugDiv.style.textAlign = 'center'
//debugDiv.textContent = 'Cargando log...'
//document.body.appendChild(debugDiv)

// function showDebugLog(text: string) {
//   const div = document.getElementById('debug-log')
//   if (div) div.textContent = text
// }
// export { showDebugLog }



// 🌍 Idioma inicial
const savedLocale = localStorage.getItem('locale')

const browserLocale = navigator.language.split('-')[0] // ej: "es-ES" → "es"

const locale =
  savedLocale ||
  (['es', 'en'].includes(browserLocale) ? browserLocale : 'en')


const i18n = createI18n({
  legacy: false,          // Usar Composition API
  locale,                 // Idioma inicial
  fallbackLocale: 'en',   // Fallback general
  messages: {
    es,
    en,
  },
})


createApp(App)
  .use(i18n)
  .mount('#app')
