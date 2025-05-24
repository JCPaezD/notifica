<script setup lang="ts">
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

const closeMenu = () => {
  emit('close')
}

const handleAction = (actionName: string) => {
  emit('action', actionName)
  closeMenu() // Cerrar el menú después de una acción
}
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
        leave="transition-opacity ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/30" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-start justify-start text-left">
          <TransitionChild
            as="template"
            enter="transition-transform ease-out duration-300"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition-transform ease-in duration-200"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="w-64 max-w-sm h-screen
                     transform overflow-hidden bg-app-bg
                     p-4 text-left align-middle shadow-xl
                     transition-all flex flex-col"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-semibold tracking-wide leading-6 text-text-main
                       flex justify-between items-center mb-4"
              >
                <span>Acciones</span>
                <button
                  @click="closeMenu"
                  class="p-1 rounded-md hover:bg-slate-100
                         focus:outline-none focus:ring-2
                         focus:ring-accent-main"
                  aria-label="Cerrar menú"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </DialogTitle>

              <div class="mt-2 flex-grow flex flex-col space-y-4"> 
                <!-- Aquí irán los botones de acción -->
                <button
                  @click="handleAction('newShift')"
                  class="w-full flex items-center gap-x-3 px-3 py-2 rounded-md                         
                         text-sm font-medium
                         bg-status-success text-text-on-pastel
                         hover:bg-emerald-300
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
                 class="w-full flex items-center gap-x-3 px-3 py-2 rounded-md
                        text-sm font-medium
                        bg-accent-main text-text-on-pastel
                        hover:bg-accent-main/80
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
                  class="w-full flex items-center gap-x-3 px-3 py-2 rounded-md
                         text-sm font-medium
                         bg-accent-main text-text-on-pastel
                         hover:bg-accent-main/80
                         focus:outline-none focus:bg-accent-main/70"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  <span>Importar</span>
                </button>
                <button
                  @click="handleAction('exportTasks')"
                  class="w-full flex items-center gap-x-3 px-3 py-2 rounded-md
                         text-sm font-medium
                         bg-accent-main text-text-on-pastel
                         hover:bg-accent-main/80
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
                  class="w-full flex items-center gap-x-3 px-3 py-2 rounded-md
                         text-sm font-medium
                         bg-red-100 text-red-700
                         hover:bg-red-200
                         focus:outline-none focus:bg-red-200 focus:ring-2 focus:ring-red-300 focus:ring-offset-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.242.078 3.324.214M15 5.79V4.5A2.25 2.25 0 0012.75 2.25h-1.5A2.25 2.25 0 009 4.5v1.29m0 0C9 7.529 9.21 8.25 9.45 9" />
                  </svg>
                  <span>Borrar todo</span>
                </button>
              </div>

              <div class="mt-4"> <!-- mt-4 para espacio, quitado pt-4 y border-t -->
                <hr class="my-2 border-slate-200 mx-3" /> <!-- Separador con margen vertical my-2 -->
                <p class="text-[11px] text-slate-400/80 text-center">Notifica v0.1.0 - JCPD 2025</p>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
