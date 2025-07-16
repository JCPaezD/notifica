<template>
  <div
    ref="toastRef"
    class="flex items-start gap-3 px-4 py-2 rounded-lg shadow-md w-[92vw] max-w-xs border text-sm leading-snug animate-toast-enter"
    :class="toastClasses"
  >
    <!-- Icono por tipo -->
    <div class="mt-0.5 shrink-0" v-html="iconSvg" />

    <!-- Contenido -->
    <div class="flex-1">
      <div class="flex justify-between items-start gap-2">
        <div class="font-semibold leading-tight">{{ title }}</div>
          <button
            v-if="action"
            @click="action.onClick"
            @touchstart.prevent=""
            type="button"
            class="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md"
            :class="[actionButtonClasses, { 'animate-pop': animateOnMount }, 'active:scale-95 transition-transform duration-150']"
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
            {{ action.label }}
          </button>
        </div>
      <div v-if="description" class="text-xs mt-0.5">
        {{ description }}
      </div>
    </div>

    <!-- Botón cerrar -->
    <button
      @click="$emit('onClose')"
      class="ml-1 text-base leading-none transition-colors duration-200"
      :class="closeButtonClasses"
      aria-label="Cerrar notificación"
    >
      &times;
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps<{
  id: number | string
  title?: string
  description?: string
  type?: 'success' | 'error' | 'info' | 'warning'
  action?: {
    label: string
    onClick: () => void
  }
}>()

defineEmits<{
  (e: 'onClose'): void
}>()

const toastRef = ref<HTMLElement | null>(null)
const animateOnMount = ref(false)

onMounted(() => {
  setTimeout(() => {
    animateOnMount.value = true
    setTimeout(() => {
      animateOnMount.value = false
    }, 400)
  }, 300)
})

// Icono SVG como string (para evitar defineComponent y h)
const iconSvg = computed(() => {
  switch (props.type) {
    case 'success':
      return `<svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 
        7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>`
    case 'error':
      return `<svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-10.25a.75.75 0 011.5 0v3.5a.75.75 
        0 01-1.5 0v-3.5zM10 13a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>
      </svg>`
    case 'warning':
      return `<svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.853 
        12.185c.75 1.334-.214 2.996-1.742 2.996H3.146c-1.528 0-2.492-1.662-1.742-2.996L8.257 
        3.1zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V9a1 1 0 012 0v2a1 1 0 01-1 1z"
        clip-rule="evenodd"/>
      </svg>`
    default:
      return `<svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zM9 9a1 1 0 
        112 0v4a1 1 0 11-2 0V9zm1-4a1.25 1.25 0 100 2.5A1.25 1.25 0 0010 5z" clip-rule="evenodd"/>
      </svg>`
  }
})

const toastClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-50 border-green-200 text-green-700'
    case 'error':
      return 'bg-red-50 border-red-200 text-red-700'
    case 'warning':
      return 'bg-yellow-50 border-yellow-200 text-yellow-700'
    default:
      return 'bg-blue-50 border-blue-200 text-blue-700'
  }
})

const actionButtonClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-green-600 bg-green-100 hover:bg-green-200'
    case 'error':
      return 'text-red-600 bg-red-100 hover:bg-red-200'
    case 'warning':
      return 'text-yellow-600 bg-yellow-100 hover:bg-yellow-200'
    default:
      return 'text-blue-600 bg-blue-100 hover:bg-blue-200'
  }
})

const closeButtonClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-green-400 hover:text-green-600'
    case 'error':
      return 'text-red-400 hover:text-red-600'
    case 'warning':
      return 'text-yellow-400 hover:text-yellow-600'
    default:
      return 'text-blue-400 hover:text-blue-600'
  }
})
</script>
