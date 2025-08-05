import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
// import { showDebugLog } from '@/main'


type ThemeMode = 'light' | 'dark' | 'system'

const LOCAL_STORAGE_KEY = 'darkMode'
const validModes: ThemeMode[] = ['light', 'dark', 'system']

// Leer valor persistido o usar 'system' por defecto
const stored = localStorage.getItem(LOCAL_STORAGE_KEY) as ThemeMode | null
const preferredMode = ref<ThemeMode>(validModes.includes(stored as ThemeMode) ? stored as ThemeMode : 'system')

// Media query: usado solo si estamos en modo 'system'
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
const systemPrefersDark = ref(mediaQuery.matches)

// Actualiza systemPrefersDark al cambiar la preferencia del sistema
function handleMediaChange(event: MediaQueryListEvent) {
  systemPrefersDark.value = event.matches
}

// Calcula si el modo efectivo debe ser oscuro
const isDark = computed(() => {
  if (preferredMode.value === 'system') return systemPrefersDark.value
  return preferredMode.value === 'dark'
})

// Configura el observador y actualiza systemPrefersDark antes de evaluar isDark
setupSystemListener()

// Aplicar clase `dark` inmediatamente al cargar (después de setup)
const html = document.documentElement
html.classList.toggle('dark', isDark.value)

// Seguir reaccionando a cambios posteriores
watch(isDark, (newVal) => {
  html.classList.toggle('dark', newVal)
})

// Persistencia al cambiar la preferencia del usuario
watch(preferredMode, (newVal) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, newVal)
  setupSystemListener() // Reactiva listener si pasamos a 'system'
}, { immediate: true })

// Configura el observador solo si es necesario
function setupSystemListener() {
  if (preferredMode.value === 'system') {
    mediaQuery.addEventListener('change', handleMediaChange)
    systemPrefersDark.value = mediaQuery.matches
  } else {
    mediaQuery.removeEventListener('change', handleMediaChange)
  }
}


import { EdgeToEdge } from '@capawesome/capacitor-android-edge-to-edge-support'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { isAndroidApiAtLeast } from '@/utils/platform' // ajusta la ruta si es distinta
import { Device } from '@capacitor/device'


watch(isDark, async () => {
  if (Capacitor.getPlatform() !== 'android') return

  // 🎨 Crear un span temporal con las clases de color de fondo según tema actual (Tailwind)
  const span = document.createElement('span')
  span.className = 'bg-surface-1 dark:bg-surface-1-dark'
  span.style.display = 'none'
  document.body.appendChild(span)

  const color = getComputedStyle(span).backgroundColor
  document.body.removeChild(span)

  // 🎯 Convertir rgb(...) → #rrggbb
  const rgbToHex = (rgb: string) => {
    const result = color.match(/\d+/g)
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

  // 🧪 Mostrar información útil en pantalla para pruebas
  // const apiOK = await isAndroidApiAtLeast(30)
  // showDebugLog(`API >= 30: ${apiOK}\nTema actual: ${isDark.value ? 'dark' : 'light'}\nColor HEX: ${hexColor}`)

  try {
    console.log('[DarkMode] Tema cambiado, aplicando color a EdgeToEdge y StatusBar:', hexColor)

    // 🧪 Actualizar fondo de barras del sistema en EdgeToEdge
    await EdgeToEdge.setBackgroundColor({ color: hexColor })
    if ((await Device.getInfo()).androidSDKVersion === 30) {
      await StatusBar.setBackgroundColor({ color: hexColor })
    }


    // 🌓 Cambiar estilo de iconos en status bar solo en Android API 30+
    if (await isAndroidApiAtLeast(30)) {
      const isNowDark = document.documentElement.classList.contains('dark')
      await StatusBar.setStyle({ style: isNowDark ? Style.Dark : Style.Light })
    }
  } catch (err) {
    console.warn('[DarkMode] Error al aplicar EdgeToEdge background o StatusBar:', err)
  }
})





// API pública
export function useDarkMode() {
  function setPreferredMode(mode: ThemeMode) {
    preferredMode.value = mode
  }

  function enableDark() {
    preferredMode.value = 'dark'
  }

  function disableDark() {
    preferredMode.value = 'light'
  }

  function setSystemMode() {
    preferredMode.value = 'system'
  }

  function toggleDark() {
    preferredMode.value = isDark.value ? 'light' : 'dark'
  }

  return {
    preferredMode,
    isDark,
    setPreferredMode,
    setSystemMode,
    enableDark,
    disableDark,
    toggleDark,
  }
}
