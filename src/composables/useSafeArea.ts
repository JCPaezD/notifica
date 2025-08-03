// src/composables/useSafeArea.ts
import { ref, readonly } from 'vue'

const safeAreaTop = ref(0)

/**
 * Captura el valor actual de `--safe-area-inset-top` desde el HTML root y lo guarda como número (px).
 * Puede llamarse en cualquier momento, pero solo tiene efecto cuando el valor CSS ya está actualizado.
 */
function updateSafeAreaTop() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top')
  const px = parseInt(raw.trim().replace('px', '') || '0', 10)
  if (!Number.isNaN(px)) {
    safeAreaTop.value = px
  }
}

export function useSafeArea() {
  return {
    safeAreaTop: readonly(safeAreaTop),
    updateSafeAreaTop
  }
}