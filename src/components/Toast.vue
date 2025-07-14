<template>
    <div ref="toastRef"
        class="flex items-start gap-3 p-3 rounded-lg shadow-md bg-white border border-slate-200 w-[92vw] max-w-sm text-text-main">

        <div v-if="icon" class="mt-0.5 text-lg">
            <slot name="icon">
                <component :is="icon" class="w-5 h-5 text-accent-main" />
            </slot>
        </div>
        <div class="flex-1 text-sm leading-snug">
            <p v-if="title" class="font-semibold text-base">{{ title }}</p>
            <p v-if="description" class="text-slate-600 text-sm mt-0.5">
                {{ description }}
            </p>
        </div>

        <button v-if="action" @click="action.onClick" class="ml-auto px-2 py-1 text-sm font-medium text-accent-main 
            bg-accent-main/10 rounded-md hover:bg-accent-main/20 
            active:scale-95 transition-all duration-200 ease-in-out">
            {{ action.label }}
        </button>

        <button @click="$emit('onClose')"
            class="ml-2 text-slate-400 hover:text-slate-700 transition-colors duration-200"
            aria-label="Cerrar notificación">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none"
                stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    id: number | string
    title?: string
    description?: string
    icon?: any
    action?: {
        label: string
        onClick: () => void
    }
}>()

defineEmits<{
    (e: 'onClose'): void
}>()

import { ref, onMounted } from 'vue'

const animateOnMount = ref(false)
const toastRef = ref<HTMLElement | null>(null)

onMounted(() => {
    setTimeout(() => {
        animateOnMount.value = true
        setTimeout(() => {
            animateOnMount.value = false
        }, 400) // Duración estimada de la animación pop
    }, 300) // Pequeño delay para que no ocurra al mismo tiempo que entrada base
})

</script>
