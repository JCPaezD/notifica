<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

// Emits
const emit = defineEmits(['close', 'action'])

const isAnimatingOut = ref(false)

const closeMenu = () => {
  isAnimatingOut.value = true
  // emit('close') se llamará en handleAnimationEnd
  }

const handleAction = (actionName: string) => {
  emit('action', actionName)
  closeMenu() // Iniciar animación de cierre después de una acción
}

const handleAnimationEnd = () => {
  // Asegurarnos de que esto solo se ejecute para la animación de cierre
  if (isAnimatingOut.value) {
    // No resetear isAnimatingOut aquí.
    // Esto mantiene la clase de animación aplicada mientras el diálogo se oculta.
    emit('close') // Ahora emitimos close para que el v-if/show lo oculte
  }
}

watch(() => props.isOpen, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    // Si el menú se está abriendo (isOpen cambió de false a true)
    isAnimatingOut.value = false // Reseteamos el estado de la animación de salida
  }
})

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
        <div class="fixed inset-0 bg-black/30" />
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
              class="w-64 max-w-sm h-screen
                     overflow-hidden bg-app-bg p-4
                     text-left align-middle shadow-xl
                     flex flex-col"
              :class="{ 'animate-bounce-out-left': isAnimatingOut }"
              @animationend="handleAnimationEnd"
            >
            <DialogTitle
                as="h3"
                class="text-lg font-semibold tracking-wide
                       leading-6 text-text-main flex
                       justify-between items-center mb-4"              >
                <span>Acciones</span>
                <button
                  @click="closeMenu"
                  class="p-1 rounded-md hover:bg-slate-100
                         focus:outline-none"
                  aria-label="Cerrar menú"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-text-main">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </DialogTitle>

              <div class="mt-2 flex-grow flex flex-col space-y-4"> 
                <!-- Aquí irán los botones de acción -->
                <button
                  @click="handleAction('newShift')"
                  class="w-full flex items-center gap-x-3 px-3 py-3 rounded-md                         
                         text-sm font-medium 
                         bg-status-success text-green-700
                         hover:bg-emerald-300 hover:brightness-95
                         active:scale-95 transition-all duration-150 ease-in-out
                         focus:outline-none focus:bg-slate-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Nuevo Turno</span>
                </button>

                <hr class="my-6 border-slate-200 mx-3" /> <!-- Margen vertical aumentado -->

                <button
                 @click="handleAction('shareTasks')"
                 class="w-full flex items-center gap-x-3 px-3 py-3 rounded-md
                        text-sm font-medium 
                        bg-accent-main text-blue-800 
                        hover:bg-accent-main/80 hover:brightness-95
                        active:scale-95 transition-all duration-150 ease-in-out
                        focus:outline-none focus:bg-accent-main/70"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                 </svg>
                 <span>Compartir</span>
               </button>

               <hr class="my-6 border-slate-200 mx-3" /> <!-- Margen vertical aumentado -->

                <button
                  @click="handleAction('importTasks')"
                  class="w-full flex items-center gap-x-3 px-3 py-3 rounded-md
                         text-sm font-medium 
                         bg-accent-main text-blue-800 
                         hover:bg-accent-main/80 hover:brightness-95
                         active:scale-95 transition-all duration-150 ease-in-out
                         focus:outline-none focus:bg-accent-main/70"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  <span>Importar</span>
                </button>
                <button
                  @click="handleAction('exportTasks')"
                  class="w-full flex items-center gap-x-3 px-3 py-3 rounded-md
                         text-sm font-medium 
                         bg-accent-main text-blue-800 
                         hover:bg-accent-main/80 hover:brightness-95
                         active:scale-95 transition-all duration-150 ease-in-out
                         focus:outline-none focus:bg-accent-main/70"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <span>Exportar</span>
                </button>
              </div>

              
              <!-- Sección para Borrar Todo, separada y más abajo -->
              <div class="mt-auto"> <!-- mt-auto empuja esto hacia abajo -->

                <button
                  @click="handleAction('deleteAll')"
                  class="w-full flex items-center gap-x-3 px-3 py-3 rounded-md
                         text-sm font-medium
                         bg-red-100 text-red-700 
                         hover:bg-red-200 hover:brightness-95
                         active:scale-95 transition-all duration-150 ease-in-out
                         focus:outline-none focus:bg-red-200 focus:ring-2 focus:ring-red-300 focus:ring-offset-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.242.078 3.324.214M15 5.79V4.5A2.25 2.25 0 0012.75 2.25h-1.5A2.25 2.25 0 009 4.5v1.29m0 0C9 7.529 9.21 8.25 9.45 9" />
                  </svg>
                  <span>Borrar todo</span>
                </button>
              </div>

              <div class="mt-4"> <!-- mt-4 para espacio, quitado pt-4 y border-t -->
                <hr class="mt-6 mb-4 border-slate-200 mx-3" /> <!-- Ajustado margen inferior para centrar el texto del pie -->
                <div class="flex items-center justify-center gap-1">
                  <img 
                    src="/assets/logo-header.png" 
                    alt="Logo Notifica" 
                    class="w-4 h-4" />
                  <p class="text-[11px] text-slate-400/80">Notifica v0.1.0 - JCPD 2025</p>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
