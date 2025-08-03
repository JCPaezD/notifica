import './assets/main.css'
import './assets/css/animations.css'

import { createApp } from 'vue'
import App from './App.vue'

import { initialize } from '@capacitor-community/safe-area' // 👈 NUEVO

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

// ⏳ Esperar a que las safe-area variables estén listas
async function waitForSafeAreaTop(timeout = 200) {
  const start = performance.now()
  return new Promise<void>((resolve) => {
    const check = () => {
      const top = getComputedStyle(document.documentElement)
        .getPropertyValue('--safe-area-inset-top')
        .trim()
      if (top && parseInt(top) > 0) {
        resolve()
      } else if (performance.now() - start < timeout) {
        requestAnimationFrame(check)
      } else {
        resolve() // evitar bloqueo si nunca se inyecta
      }
    }
    check()
  })
}

;(async () => {
  await initialize() // Inyecta variables --safe-area-inset-*, necesarias aunque no se apliquen en Android hasta reflow
  await waitForSafeAreaTop()
  createApp(App).mount('#app')
})()
