import { ref, watchEffect } from 'vue'

const LOCAL_STORAGE_KEY = 'darkMode'

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

const isDark = ref(
  localStorage.getItem(LOCAL_STORAGE_KEY) === 'dark' ||
  (!localStorage.getItem(LOCAL_STORAGE_KEY) && prefersDark)
)

watchEffect(() => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem(LOCAL_STORAGE_KEY, 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem(LOCAL_STORAGE_KEY, 'light')
  }
})

export function useDarkMode() {
  function enableDark() {
    isDark.value = true
  }

  function disableDark() {
    isDark.value = false
  }

  function toggleDark() {
    isDark.value = !isDark.value
  }

  return {
    isDark,
    enableDark,
    disableDark,
    toggleDark,
  }
}
