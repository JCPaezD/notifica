<script setup lang="ts">
// src/components/SideMenu.vue
// Componente del menú lateral deslizable que ofrece acciones rápidas para la aplicación.
import { ref, watch, computed } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { useDarkMode } from '@/composables/useDarkMode'
import { menuButtonStyles } from '../constants/menuButtonStyles'


const isOptionsOpen = ref(false)
const { isDark, toggleDark } = useDarkMode()

const mode = ref<'light' | 'dark'>(isDark.value ? 'dark' : 'light')

function getButtonStyle(key: keyof typeof menuButtonStyles, theme: 'light' | 'dark') {
  return menuButtonStyles[key][theme]
}

watch(isDark, () => {
  mode.value = isDark.value ? 'dark' : 'light'
})

// Props
// `isOpen`: Controla la visibilidad del menú lateral.
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
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

// Observa cambios en la prop `isOpen`.
// Si el menú se abre, resetea el estado de la animación de salida.
watch(() => props.isOpen, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    // Si el menú se está abriendo (isOpen cambió de false a true)
    isAnimatingOut.value = false // Reseteamos el estado de la animación de salida
  }
})

// --- Lógica para la animación del colapsable ---
const onEnter = (el: Element) => {
  const htmlEl = el as HTMLElement;
  htmlEl.style.maxHeight = `${htmlEl.scrollHeight}px`;
};

const onAfterEnter = (el: Element) => {
  const htmlEl = el as HTMLElement;
  htmlEl.style.maxHeight = 'auto';
};

const onBeforeLeave = (el: Element) => {
  const htmlEl = el as HTMLElement;
  htmlEl.style.maxHeight = `${htmlEl.scrollHeight}px`;
};

const onLeave = (el: Element) => {
  const htmlEl = el as HTMLElement;
  htmlEl.style.maxHeight = '0px';
};
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeMenu" class="relative z-50">
      <!-- Overlay -->
      <TransitionChild
        as="template"
        enter="transition-opacity ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-in duration-400"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/30 dark:bg-black/50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-start justify-start text-left">
          <TransitionChild
            as="template"            
            
            enter="transform transition ease-in-out duration-300"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
          >
            <DialogPanel
              class="w-64 max-w-sm min-h-[100svh]
                    overflow-hidden bg-app-bg dark:bg-surface-1-dark p-4
                    text-left align-middle shadow-xl
                    flex flex-col select-none"
              :class="{ 'animate-bounce-out-left': isAnimatingOut }"
              @animationend="handleAnimationEnd"
            >
            <DialogTitle
                as="h3"
                class="text-lg font-semibold tracking-wide
                       leading-6 text-text-main dark:text-main-dark flex
                       justify-between items-center mb-4"              >
                <span>Acciones</span>
                <button
                  @click="closeMenu"
                  class="p-1 rounded-md border border-divider dark:border-divider-dark hover:bg-surface-hover dark:hover:bg-surface-hover-dark
                         focus:outline-none transition-all duration-150 ease-in-out active:scale-95"
                  aria-label="Cerrar menú"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-text-main dark:text-main-dark">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </DialogTitle>

              <div class="mt-2 flex-grow flex flex-col space-y-4"> 
                <!-- Aquí irán los botones de acción -->
                <!-- Nuevo Turno -->
                <button
                  @click="handleAction('newShift')"
                  :class="[
                    'w-full flex items-center gap-x-3 px-3 py-3 rounded-md text-sm font-medium',
                    getButtonStyle('newShift', mode),
                    'active:scale-95 transition-all duration-150 ease-in-out'
                  ]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Nuevo Turno</span>
                </button>

                <hr class="my-6 border-divider dark:border-divider-dark mx-3" /> <!-- Margen vertical aumentado -->

                <!-- Compartir -->
                <button
                  @click="handleAction('shareTasks')"
                  :class="[
                    'w-full flex items-center gap-x-3 px-3 py-3 rounded-md text-sm font-medium',
                    getButtonStyle('share', mode),
                    'active:scale-95 transition-all duration-150 ease-in-out'
                  ]"
                >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                 </svg>
                 <span>Compartir</span>
               </button>

               <hr class="my-6 border-divider dark:border-divider-dark mx-3" /> <!-- Margen vertical aumentado -->

                <!-- Importar -->
                <button
                  @click="handleAction('importTasks')"
                  :class="[
                    'w-full flex items-center gap-x-3 px-3 py-3 rounded-md text-sm font-medium',
                    getButtonStyle('import', mode),
                    'active:scale-95 transition-all duration-150 ease-in-out'
                  ]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  <span>Importar</span>
                </button>
                <!-- Exportar -->
                <button
                  @click="handleAction('exportTasks')"
                  :class="[
                    'w-full flex items-center gap-x-3 px-3 py-3 rounded-md text-sm font-medium',
                    getButtonStyle('export', mode),
                    'active:scale-95 transition-all duration-150 ease-in-out'
                  ]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <span>Exportar</span>
                </button>

                <hr class="my-6 border-divider dark:border-divider-dark mx-3" /> <!-- Margen vertical aumentado -->

                <!-- 🔧 Bloque de Opciones -->
                <div class="space-y-1">
                  <!-- Opciones (botón superior) -->
                  <button
                    @click="isOptionsOpen = !isOptionsOpen"
                    :class="[
                      'w-full flex items-center justify-between gap-x-3 px-3 py-3 rounded-md text-sm font-medium',
                      getButtonStyle('options', mode),
                      'active:scale-95 transition-all duration-150 ease-in-out'
                    ]"
                    :aria-expanded="isOptionsOpen"
                    aria-controls="options-content"
                  >
                    <span class="flex items-center gap-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 6.75h15m-15 5.25h15m-15 5.25h15" />
                      </svg>
                      Opciones
                    </span>
                    <svg
                      class="w-5 h-5 text-purple-strong dark:text-purple-strong-dark/80 transition-transform duration-300"
                      :class="{ 'rotate-90': isOptionsOpen }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <Transition
                    name="collapse"
                    @enter="onEnter"
                    @after-enter="onAfterEnter"
                    @before-leave="onBeforeLeave"
                    @leave="onLeave"
                  >
                    <div v-show="isOptionsOpen" id="options-content" class="pl-6 pr-4 space-y-2">
                      <!-- Botón modo oscuro -->
                      <button
                        @click="toggleDark()"
                        :class="[
                          'w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium',
                          getButtonStyle('toggle', mode),
                          'active:scale-95 transition-all duration-150 ease-in-out'
                        ]"
                      >
                        <span>Modo oscuro</span>
                        <span>{{ isDark ? 'Oscuro' : 'Claro' }}</span>
                      </button>
                    </div>
                  </Transition>
                </div>

              </div>
              
              <!-- Sección para Borrar Todo, separada y más abajo -->
              <div class="mt-auto"> <!-- mt-auto empuja esto hacia abajo -->

                <!-- Botón Borrar todo -->
                <button
                  @click="handleAction('deleteAll')"
                  :class="[
                    'w-full flex items-center gap-x-3 px-3 py-3 rounded-md text-sm font-medium',
                    getButtonStyle('delete', mode),
                    'active:scale-95 transition-all duration-150 ease-in-out focus:outline-none'
                  ]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.242.078 3.324.214M15 5.79V4.5A2.25 2.25 0 0012.75 2.25h-1.5A2.25 2.25 0 009 4.5v1.29m0 0C9 7.529 9.21 8.25 9.45 9" />
                  </svg>
                  <span>Borrar todo</span>
                </button>
              </div>

              <div class="mt-4"> <!-- mt-4 para espacio, quitado pt-4 y border-t -->
                <hr class="mt-6 mb-4 border-divider dark:border-divider-dark mx-3" /> <!-- Ajustado margen inferior para centrar el texto del pie -->
                <div class="flex items-center justify-center gap-1">
                  <img 
                    src="/assets/logo-header.png" 
                    alt="Logo Notifica" 
                    class="w-4 h-4" />
                  <p class="text-muted-80 dark:text-muted-80-dark text-[11px]">Notifica v1.0.5 - JCPD 2025</p>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
