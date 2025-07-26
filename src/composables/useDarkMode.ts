import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

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
