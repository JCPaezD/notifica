<template>
  <div
    ref="toastRef"
    class="flex items-start gap-3 px-4 py-2 rounded-lg shadow-md w-[92vw] max-w-xs border text-sm leading-snug animate-toast-enter select-none pointer-events-auto text-text-main dark:text-main-dark"
    :class="toastClasses"
  >
    <!-- Icono por tipo -->
    <div class="mt-0.5 shrink-0" v-html="iconSvg" />

    <!-- Contenido -->
    <div class="flex-1">
      <div class="flex justify-between items-start gap-2">
        <div class="font-semibold leading-tight">{{ title }}</div>
        <div class="flex gap-2" v-if="actions && actions.length > 0">
          <!-- Un solo botón -->
          <button
            v-if="actions.length === 1"
            @click="actions[0].onClick"
            @touchstart="() => {}"
            type="button"
            class="btn-toast flex items-center gap-1 text-xs font-medium"
            :class="[actionButtonClasses, { 'animate-pop': animateOnMount }]"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 19a9 9 0 1 0 0-14M9 5v4H5" />
            </svg>
            {{ actions[0].label }}
          </button>

          <!-- Múltiples botones -->
          <template v-else>
            <button
              v-for="(a, i) in actions"
              :key="i"
              @click="a.onClick"
              @touchstart="() => {}"
              type="button"
              class="btn-toast text-xs font-medium"
              :class="[actionButtonClasses]"
            >
              {{ a.label }}
            </button>
          </template>
        </div>
      </div>
      <div v-if="description" class="text-xs mt-0.5">
        {{ description }}
      </div>
    </div>

    <!-- Botón cerrar -->
    <button
      @click="$emit('onClose')"
      class="btn-toast-close ml-1 text-base leading-none"
      :class="closeButtonClasses"
      aria-label="Cerrar notificación"
    >
      &times;
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useToast } from '@/composables/useToast'
import { toastColors } from '@/constants/toastColors'

const { startDismissTimer } = useToast()
const toastRef = ref<HTMLElement | null>(null)
const animateOnMount = ref(false)

const props = defineProps<{
  id: number | string
  title?: string
  description?: string
  type?: 'success' | 'error' | 'info' | 'warning'
  actions?: {
    label: string
    onClick: () => void
  }[]
  delayClose?: boolean
}>()

defineEmits<{
  (e: 'onClose'): void
}>()

onMounted(() => {
  // Animación de entrada
  setTimeout(() => {
    animateOnMount.value = true
    setTimeout(() => {
      animateOnMount.value = false
    }, 400)
  }, 300)

  // Tap fuera para activar cierre diferido
  const handlePointerDown = (event: PointerEvent) => {
    if (!toastRef.value) return
    if (toastRef.value.contains(event.target as Node)) return

    if (props.id && props.delayClose) {
      startDismissTimer(String(props.id), 7000)
    }
  }

  window.addEventListener('pointerdown', handlePointerDown)

  onBeforeUnmount(() => {
    window.removeEventListener('pointerdown', handlePointerDown)
  })
})

// Icono SVG como string (para evitar defineComponent y h)
const iconSvg = computed(() => {
  switch (props.type) {
    case 'success':
      return `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 
        7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>`
    case 'error':
      return `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-10.25a.75.75 0 011.5 0v3.5a.75.75 
        0 01-1.5 0v-3.5zM10 13a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>
      </svg>`
    case 'warning':
      return `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.853 
        12.185c.75 1.334-.214 2.996-1.742 2.996H3.146c-1.528 0-2.492-1.662-1.742-2.996L8.257 
        3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V9a1 1 0 012 0v2a1 1 0 01-1 1z"
        clip-rule="evenodd"/>
      </svg>`
    default:
      return `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zM9 9a1 1 0 
        112 0v4a1 1 0 11-2 0V9zm1-4a1.25 1.25 0 100 2.5A1.25 1.25 0 0010 5z" clip-rule="evenodd"/>
      </svg>`
  }
})

const toastType = computed(() => props.type ?? 'info')

const toastClasses = computed(() => {
  return toastColors[toastType.value]?.base ?? ''
})

const actionButtonClasses = computed(() => {
  return toastColors[toastType.value]?.action ?? ''
})

const closeButtonClasses = computed(() => {
  return toastColors[toastType.value]?.close ?? ''
})
</script>

