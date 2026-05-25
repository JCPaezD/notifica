<script setup lang="ts">
// src/components/SideMenu.vue
// Componente del menú lateral deslizable que ofrece acciones rápidas para la aplicación.
import { ref, watch } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import AppLogo from './AppLogo.vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// Props
// `isOpen`: Controla la visibilidad del menú lateral.
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  showReleaseNotesEntry: {
    type: Boolean,
    default: false,
  },
})

// Emits:
// `close`: Evento emitido para solicitar el cierre del menú.
// `action`: Evento emitido cuando se selecciona una acción del menú, con el nombre de la acción como payload.
const emit = defineEmits(['close', 'action'])

const isAnimatingOut = ref(false) // Estado para controlar la animación de salida del menú.

// Inicia la animación de cierre del menú.
const closeMenu = () => {
  isAnimatingOut.value = true
  // emit('close') se llamará en handleAnimationEnd
}

// Emite la acción seleccionada y luego inicia el cierre del menú.
const handleAction = (actionName: string) => {
  emit('action', actionName)
  closeMenu() // Iniciar animación de cierre después de una acción
}

// Maneja el final de la animación CSS. Emite 'close' si la animación de salida ha terminado.
const handleAnimationEnd = () => {
  // Asegurarnos de que esto solo se ejecute para la animación de cierre
  if (isAnimatingOut.value) {
    // No resetear isAnimatingOut aquí.
    // Esto mantiene la clase de animación aplicada mientras el diálogo se oculta.
    emit('close') // Emitir 'close' para que el componente padre oculte el menú.
  }
}

// Observa cuando el menú se abre para reiniciar el estado de animación de cierre.
watch(() => props.isOpen, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    isAnimatingOut.value = false
  }
})

</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeMenu" class="relative z-50">
      <!-- Overlay -->
      <TransitionChild as="template" enter="transition-opacity ease-out duration-300" enter-from="opacity-0"
        enter-to="opacity-100" leave="transition-opacity ease-in duration-400" leave-from="opacity-100"
        leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/30 dark:bg-black/50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-start justify-start text-left">
          <TransitionChild as="template" enter="transform transition ease-in-out duration-300"
            enter-from="-translate-x-full" enter-to="translate-x-0">
            <DialogPanel
              class="w-64 max-w-sm min-h-[100svh]
                    overflow-hidden bg-app-bg dark:bg-surface-1-dark
                    text-left align-middle shadow-xl select-none"
              :class="{ 'animate-bounce-out-left': isAnimatingOut }"
              @animationend="handleAnimationEnd"
            >
              <div class="flex flex-col min-h-[100svh] h-full px-4 pb-4 pt-4">
                
                <DialogTitle
                  ref="titleRef"
                  as="h3"
                  class="text-lg font-semibold tracking-wide
                        leading-6 text-text-main dark:text-main-dark flex
                        justify-between items-center mb-4"
                >
                  <span>{{ t('menu.title') }}</span>
                  <button @click="closeMenu" class="btn-close" :aria-label="t('aria.menu.close')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-7 h-7 text-text-main dark:text-main-dark">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </DialogTitle>

                <div class="mt-2 flex-grow flex flex-col space-y-4">
                  <!-- Aquí irán los botones de acción -->
                  <!-- Nuevo Turno -->
                  <button @click="handleAction('newShift')" :class="[
                    'w-full flex items-center gap-x-3 px-3 py-3 rounded-md text-sm font-medium',
                    'btn-success',
                    'active:scale-95 transition-all duration-150 ease-in-out'
                  ]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ t('shift.new') }}</span>
                  </button>

                  <hr class="my-6 border-divider dark:border-divider-dark mx-3" /> <!-- Margen vertical aumentado -->

                  <!-- Compartir -->
                  <button @click="handleAction('shareTasks')" :class="[
                    'w-full flex items-center gap-x-3 px-3 py-3 rounded-md text-sm font-medium',
                    'btn-primary',
                    'active:scale-95 transition-all duration-150 ease-in-out'
                  ]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                    </svg>
                    <span>{{ t('btn.share') }}</span>
                  </button>

                  <hr class="my-6 border-divider dark:border-divider-dark mx-3" /> <!-- Margen vertical aumentado -->

                  <!-- Importar -->
                  <button @click="handleAction('importTasks')" :class="[
                    'w-full flex items-center gap-x-3 px-3 py-3 rounded-md text-sm font-medium',
                    'btn-primary',
                    'active:scale-95 transition-all duration-150 ease-in-out'
                  ]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    <span>{{ t('btn.import') }}</span>
                  </button>
                  <!-- Exportar -->
                  <button @click="handleAction('exportTasks')" :class="[
                    'w-full flex items-center gap-x-3 px-3 py-3 rounded-md text-sm font-medium',
                    'btn-primary',
                    'active:scale-95 transition-all duration-150 ease-in-out'
                  ]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <span>{{ t('btn.export') }}</span>
                  </button>

                  <hr class="my-6 border-divider dark:border-divider-dark mx-3" /> <!-- Margen vertical aumentado -->

                  <!-- Ajustes -->
                  <button @click="handleAction('settings')" :class="[
                    'w-full flex items-center gap-x-3 px-3 py-3 rounded-md text-sm font-medium',
                    'btn-purple',
                    'active:scale-95 transition-all duration-150 ease-in-out'
                  ]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                      stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M4.5 6.75h15m-15 5.25h15m-15 5.25h15" />
                    </svg>
                    <span>{{ t('menu.options') }}</span>
                  </button>

                  <button
                    v-if="showReleaseNotesEntry"
                    @click="handleAction('releaseNotes')"
                    :class="[
                      'w-full flex items-center gap-x-3 px-3 py-2.5 rounded-md text-sm font-medium',
                      'bg-surface-pressed dark:bg-surface-pressed-dark text-subtle dark:text-subtle-dark border border-divider dark:border-divider-dark',
                      'active:scale-95 transition-all duration-150 ease-in-out'
                    ]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24"
                      stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10.3404 15.8398C9.65153 15.7803 8.95431 15.75 8.25 15.75H7.5C5.01472 15.75 3 13.7353 3 11.25C3 8.76472 5.01472 6.75 7.5 6.75H8.25C8.95431 6.75 9.65153 6.71966 10.3404 6.66022M10.3404 15.8398C10.5933 16.8015 10.9237 17.7317 11.3246 18.6234C11.5721 19.1738 11.3842 19.8328 10.8616 20.1345L10.2053 20.5134C9.6539 20.8318 8.9456 20.6306 8.67841 20.0527C8.0518 18.6973 7.56541 17.2639 7.23786 15.771M10.3404 15.8398C9.95517 14.3745 9.75 12.8362 9.75 11.25C9.75 9.66379 9.95518 8.1255 10.3404 6.66022M10.3404 15.8398C13.5 16.1124 16.4845 16.9972 19.1747 18.3749M10.3404 6.66022C13.5 6.3876 16.4845 5.50283 19.1747 4.12509M19.1747 4.12509C19.057 3.74595 18.9302 3.37083 18.7944 3M19.1747 4.12509C19.7097 5.84827 20.0557 7.65462 20.1886 9.51991M19.1747 18.3749C19.057 18.7541 18.9302 19.1292 18.7944 19.5M19.1747 18.3749C19.7097 16.6517 20.0557 14.8454 20.1886 12.9801M20.1886 9.51991C20.6844 9.93264 21 10.5545 21 11.25C21 11.9455 20.6844 12.5674 20.1886 12.9801M20.1886 9.51991C20.2293 10.0913 20.25 10.6682 20.25 11.25C20.25 11.8318 20.2293 12.4087 20.1886 12.9801" />
                    </svg>
                    <span class="opacity-85">{{ t('menu.releaseNotes') }}</span>
                  </button>

                </div>

                <!-- Sección para Borrar Todo, separada y más abajo -->
                <div class="mt-auto"> <!-- mt-auto empuja esto hacia abajo -->

                  <!-- Botón Borrar todo -->
                  <button @click="handleAction('deleteAll')" :class="[
                    'w-full flex items-center gap-x-3 px-3 py-3 rounded-md text-sm font-medium',
                    'btn-danger',
                    'active:scale-95 transition-all duration-150 ease-in-out focus:outline-none'
                  ]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.242.078 3.324.214M15 5.79V4.5A2.25 2.25 0 0012.75 2.25h-1.5A2.25 2.25 0 009 4.5v1.29m0 0C9 7.529 9.21 8.25 9.45 9" />
                    </svg>
                    <span>{{ t('btn.deleteAll') }}</span>
                  </button>
                </div>

                <div class="mt-4 pb-3"> <!-- mt-4 para espacio, safe-area-inset-bottom para evitar UIs -->
                  <hr class="mt-6 mb-4 border-divider dark:border-divider-dark mx-3" />
                  <div class="flex items-center justify-center gap-1">
                    <AppLogo class="h-4 w-4 text-text-main dark:text-main-dark" />
                    <p class="text-muted-80 dark:text-muted-80-dark text-[11px]">Notifica v1.3.0 - JCPD 2026</p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
