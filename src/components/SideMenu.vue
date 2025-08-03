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

const { preferredMode, setPreferredMode } = useDarkMode()

const themeModes = ['light', 'dark', 'system'] as const
type ThemeMode = typeof themeModes[number]


const isOptionsOpen = ref(false)
const { isDark } = useDarkMode()

const mode = ref<'light' | 'dark'>(isDark.value ? 'dark' : 'light')

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

// Observa cuando el menú se abre para reiniciar el estado de animación de cierre.
watch(() => props.isOpen, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    isAnimatingOut.value = false
  }
})

// --- Lógica para la animación del colapsable ---
const onEnter = (el: Element) => {
  const htmlEl = el as HTMLElement;
  htmlEl.style.maxHeight = `${htmlEl.scrollHeight}px`;
};

const onAfterEnter = (el: Element) => {
  const htmlEl = el as HTMLElement;
  htmlEl.style.maxHeight = '';
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
                  <span>Acciones</span>
                  <button @click="closeMenu" class="btn-close" aria-label="Cerrar menú">
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
                    <span>Nuevo Turno</span>
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
                    <span>Compartir</span>
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
                    <span>Importar</span>
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
                    <span>Exportar</span>
                  </button>

                  <hr class="my-6 border-divider dark:border-divider-dark mx-3" /> <!-- Margen vertical aumentado -->

                  <!-- 🔧 Bloque de Opciones -->
                  <div class="space-y-1">
                    <!-- Opciones (botón superior) -->
                    <button @click="isOptionsOpen = !isOptionsOpen" :class="[
                      'w-full flex items-center justify-between gap-x-3 px-3 py-3 rounded-md text-sm font-medium',
                      'btn-purple',
                      'active:scale-95 transition-all duration-150 ease-in-out'
                    ]" :aria-expanded="isOptionsOpen" aria-controls="options-content"
                      style="z-index: 10; position: relative;">
                      <span class="flex items-center gap-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                          stroke-width="1.5" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M4.5 6.75h15m-15 5.25h15m-15 5.25h15" />
                        </svg>
                        Opciones
                      </span>
                      <svg
                        class="w-5 h-5 text-purple-strong dark:text-purple-strong-dark/80 transition-transform duration-300"
                        :class="{ 'rotate-90': isOptionsOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    <Transition name="collapse" @enter="onEnter" @after-enter="onAfterEnter"
                      @before-leave="onBeforeLeave" @leave="onLeave">
                      <div id="options-content" v-show="isOptionsOpen">
                        <!-- Bloque visual agrupado -->
                        <div
                          class="mx-4 -mt-1 rounded-b-xl border border-t-0 border-divider dark:border-divider-dark bg-surface-1 dark:bg-surface-1-dark ring-1 ring-purple-strong/15 dark:ring-purple-strong-dark/20 p-4 pt-3 space-y-3 text-sm">
                          <p class="text-subtle dark:text-subtle-dark font-medium pl-1">Apariencia</p>

                          <div class="flex flex-col gap-2">
                            <!-- Botón Claro -->
                            <button @click="setPreferredMode('light')" :class="[
                              'h-10',
                              'w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-150',
                              preferredMode === 'light'
                                ? 'bg-accent-main text-white font-semibold'
                                : 'bg-surface-1 dark:bg-surface-1-dark text-subtle dark:text-subtle-dark border border-divider hover:bg-surface-hover dark:hover:bg-surface-hover-dark'
                            ]">
                              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="1.5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M12 3v1.5m0 15V21m9-9h-1.5M4.5 12H3m16.95 4.95l-1.061-1.061M6.111 6.111 5.05 5.05m0 13.9 1.061-1.061m12.728-12.728-1.061 1.061M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Claro
                            </button>

                            <!-- Botón Oscuro -->
                            <button @click="setPreferredMode('dark')" :class="[
                              'h-10',
                              'w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-150',
                              preferredMode === 'dark'
                                ? 'bg-accent-main text-white font-semibold'
                                : 'bg-surface-1 dark:bg-surface-1-dark text-subtle dark:text-subtle-dark border border-divider hover:bg-surface-hover dark:hover:bg-surface-hover-dark'
                            ]">
                              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="1.5">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                              </svg>
                              Oscuro
                            </button>

                            <!-- Botón Sistema -->
                            <button @click="setPreferredMode('system')" :class="[
                              'h-10',
                              'w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-150',
                              preferredMode === 'system'
                                ? 'bg-accent-main text-white font-semibold'
                                : 'bg-surface-1 dark:bg-surface-1-dark text-subtle dark:text-subtle-dark border border-divider hover:bg-surface-hover dark:hover:bg-surface-hover-dark'
                            ]">
                              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                              </svg>
                              Sistema
                            </button>
                          </div>
                        </div>
                      </div>
                    </Transition>
                  </div>

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
                    <span>Borrar todo</span>
                  </button>
                </div>

                <div class="mt-4 pb-3"> <!-- mt-4 para espacio, safe-area-inset-bottom para evitar UIs -->
                  <hr class="mt-6 mb-4 border-divider dark:border-divider-dark mx-3" />
                  <div class="flex items-center justify-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
                      class="h-4 w-4 text-text-main dark:text-main-dark" fill="currentColor" fill-rule="evenodd"
                      clip-rule="evenodd" aria-hidden="true">
                      <g id="#000000ff">
                        <path
                          d="M122.92 32.93C130.66 26.93 140.09 22.98 149.9 22.28C157.33 21.75 164.86 22.26 172.11 24.01C175.34 24.9 179.27 26.37 180.1 30.03C180.92 33.08 178.62 35.64 176.65 37.63C169.95 44.27 163.35 51.02 156.55 57.55C155.03 58.96 153.56 60.7 154.1 62.93C154.76 67.83 154.75 73.69 158.86 77.15C161.28 79.49 164.76 79.94 167.97 80.04C170.48 80.12 173.41 80.28 175.33 78.34C183.54 70.56 191.13 62.14 199.23 54.26C202.14 51 207.89 53.16 208.76 57.2C213.07 71.97 212.77 88.61 205.46 102.41C202.79 107.97 198.53 112.52 194.11 116.73C206.17 124.6 215.98 136.34 219.88 150.36C223.69 163.57 222.55 178.21 216.63 190.65C208.98 206.98 193.35 219.56 175.47 222.66C160.05 226.02 143.45 221.43 131.03 211.92C116.5 201.06 108.17 182.94 108.47 164.9C106.82 165.69 105.23 166.64 103.94 167.95C94.06 177.72 84.36 187.69 74.43 197.42C65.68 205.83 51.03 206.85 41.14 199.86C30.98 192.76 26.5 178.51 30.84 166.89C32.39 161.69 36.14 157.63 39.96 153.96C59.91 133.91 79.92 113.92 99.88 93.89C101.65 91.93 103.73 89.76 103.71 86.94C103.76 82.62 103.08 78.32 103.2 74C102.95 58.26 110.36 42.48 122.92 32.93ZM120.36 51.36C115.25 59.19 113.27 68.79 113.97 78.04C114.26 82.29 115.09 86.56 114.49 90.82C113.94 94.21 111.74 97.01 109.4 99.41C88.95 119.95 68.75 140.75 48.02 161.03C44.56 164.25 41.13 168.07 40.7 173.01C39.24 180.47 42.88 188.8 49.98 191.95C56.09 194.79 63.67 193.11 68.36 188.37C82.52 174.19 96.62 159.94 110.65 145.64C112.53 143.79 114.04 141.61 115.25 139.29C122.54 125.53 135.62 114.84 150.72 110.88C161.6 107.88 173.23 108.72 183.94 112.04C189.37 107.03 194.67 101.51 197.52 94.58C201.06 86.52 201.27 77.49 200.53 68.86C195.66 71.7 192.39 76.52 188.27 80.27C184.03 84.18 180.29 89.87 174.02 90.35C169.35 90.61 164.64 90.47 159.97 90.26C157.28 90.25 155.51 87.96 153.67 86.34C150.06 82.61 145.18 79.21 144.55 73.63C143.99 68.27 142.78 62.81 143.6 57.43C145.69 52.61 150.29 49.54 153.72 45.72C157.17 41.9 161.54 38.77 164.01 34.16C147.83 29.33 129.22 37.2 120.36 51.36ZM157.32 122.19C144.36 124.41 132.71 132.85 126.37 144.34C120.79 154.42 119.27 166.63 122.09 177.79C124.93 189.74 133.13 200.27 143.98 206.01C152.93 210.94 163.63 212.37 173.64 210.54C188.42 207.69 201.55 197.01 206.88 182.87C209.85 175.46 210.41 167.28 209.42 159.41C207.14 143.42 195.38 129.25 180.15 123.93C172.86 121.35 164.91 120.92 157.32 122.19Z" />
                        <path
                          d="M162.41 135.41C165.51 133.66 169.94 135.68 170.64 139.16C171.47 146.94 170.04 154.89 171.31 162.6C175.78 166.25 181.34 168.48 185.41 172.62C188.51 176.22 184.93 182.58 180.24 181.64C176.73 180.57 173.92 178.03 170.8 176.2C167.14 173.56 162.63 171.86 159.74 168.31C158.4 161.34 159.53 154.09 159.14 147.01C159.36 143.07 157.99 137.54 162.41 135.41Z" />
                      </g>
                    </svg>
                    <p class="text-muted-80 dark:text-muted-80-dark text-[11px]">Notifica v1.1.0 - JCPD 2025</p>
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
