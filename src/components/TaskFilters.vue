<template>
  <div class="flex items-center space-x-2">
    <!-- Toggle Mostrar solo activas -->
    <div class="flex items-center space-x-1">
      <span class="text-xs font-medium text-text-main">Activas</span>
      <button @click="modelShowOnlyActive = !modelShowOnlyActive"
        :class="{ 'bg-accent-main': modelShowOnlyActive, 'bg-toggle-inactive': !modelShowOnlyActive }"
        class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
               transition-colors ease-in-out duration-200 focus:outline-none"
        role="switch" :aria-checked="modelShowOnlyActive">
        <span class="sr-only">Mostrar solo tareas activas</span>
        <span :class="{ 'translate-x-5': modelShowOnlyActive, 'translate-x-0': !modelShowOnlyActive }"
          class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-surface-thumb shadow ring-0 transition ease-in-out duration-200">
          <span :class="{ 'opacity-0 ease-out duration-100': modelShowOnlyActive, 'opacity-100 ease-in duration-200': !modelShowOnlyActive }"
            class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
            aria-hidden="true"></span>
          <span :class="{ 'opacity-100 ease-in duration-200': modelShowOnlyActive, 'opacity-0 ease-out duration-100': !modelShowOnlyActive }"
            class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
            aria-hidden="true"></span>
        </span>
      </button>
    </div>

    <!-- Toggle Mostrar solo sin notificar -->
    <div class="flex items-center space-x-1">
      <span class="text-xs font-medium text-text-main">Sin Notificar</span>
      <button @click="modelShowOnlyNotNotified = !modelShowOnlyNotNotified"
        :class="{ 'bg-accent-main': modelShowOnlyNotNotified, 'bg-toggle-inactive': !modelShowOnlyNotNotified }"
        class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
               transition-colors ease-in-out duration-200 focus:outline-none"
        role="switch" :aria-checked="modelShowOnlyNotNotified">
        <span class="sr-only">Mostrar solo tareas sin notificar</span>
        <span :class="{ 'translate-x-5': modelShowOnlyNotNotified, 'translate-x-0': !modelShowOnlyNotNotified }"
          class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-surface-thumb shadow ring-0 transition ease-in-out duration-200">
          <span :class="{ 'opacity-0 ease-out duration-100': modelShowOnlyNotNotified, 'opacity-100 ease-in duration-200': !modelShowOnlyNotNotified }"
            class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
            aria-hidden="true"></span>
          <span :class="{ 'opacity-100 ease-in duration-200': modelShowOnlyNotNotified, 'opacity-0 ease-out duration-100': !modelShowOnlyNotNotified }"
            class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
            aria-hidden="true"></span>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const modelShowOnlyActive = defineModel<boolean>('showOnlyActive')
const modelShowOnlyNotNotified = defineModel<boolean>('showOnlyNotNotified')
</script>
