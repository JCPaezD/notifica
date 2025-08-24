<template>
    <TransitionRoot appear :show="props.modelValue" as="template">
        <Dialog as="div" class="relative z-[60]" @close="handleClose" :initial-focus="closeButtonRef">
            <!-- Fondo semitransparente con fade -->
            <TransitionChild
                as="template"
                enter="transition-opacity ease-out duration-200"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="transition-opacity ease-in duration-150"
                leave-from="opacity-100"
                leave-to="opacity-0"
                >
                <DialogOverlay class="fixed inset-0 bg-black/30 dark:bg-black/50" />
            </TransitionChild>


            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center text-center">
                    <TransitionChild
                    as="template"
                    enter="transition ease-out duration-200"
                    enter-from="opacity-0 scale-95"
                    enter-to="opacity-100 scale-100"
                    leave="transition ease-in duration-150"
                    leave-from="opacity-100 scale-100"
                    leave-to="opacity-0 scale-95"
                    >
                    <DialogPanel
                        class="relative z-50 max-w-md w-full mx-4 rounded-xl
                            bg-surface-hover dark:bg-surface-hover-dark
                            text-text-main dark:text-main-dark
                            shadow-xl pointer-events-auto border border-divider dark:border-divider-dark"
                    >
                        <!-- Contenido interno del modal -->
                        <div class="bg-surface-1 dark:bg-surface-1-dark rounded-xl">
                            <DialogTitle class="sr-only">Modal</DialogTitle>
                            <slot />
                            <button ref="closeButtonRef" type="button" class="sr-only">Cerrar</button>
                        </div>
                    </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogOverlay, DialogPanel, TransitionChild, TransitionRoot, DialogTitle } from '@headlessui/vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function handleClose() {
  emit('update:modelValue', false)
}

const closeButtonRef = ref(null)
</script>


