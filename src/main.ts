import './assets/main.css'
import './assets/css/animations.css'

import { createApp } from 'vue'
import App from './App.vue'


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

createApp(App).mount('#app')
