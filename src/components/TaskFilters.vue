<template>
  <div class="flex items-center space-x-2">
    <!-- Toggle Mostrar solo activas -->
    <div class="flex items-center space-x-1">
      <span class="text-xs font-medium text-text-main dark:text-main-dark">{{ t('filter.active') }}</span>
      <button @click="modelShowOnlyActive = !modelShowOnlyActive"
        :class="[
          modelShowOnlyActive ? 'bg-accent-main' : 'bg-toggle-inactive dark:bg-toggle-inactive-dark'
        ]"
        class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
               transition-colors ease-in-out duration-200 focus:outline-none"
        role="switch" :aria-checked="modelShowOnlyActive">
        <span class="sr-only">{{ t('aria.filter.activeOnly') }}</span>
        <span :class="[
          modelShowOnlyActive ? 'translate-x-5' : 'translate-x-0'
        ]"
          class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-surface-thumb dark:bg-surface-thumb-dark shadow ring-0 transition ease-in-out duration-200">
          <span :class="[
            modelShowOnlyActive ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'
          ]"
            class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
            aria-hidden="true"></span>
          <span :class="[
            modelShowOnlyActive ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'
          ]"
            class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
            aria-hidden="true"></span>
        </span>
      </button>
    </div>

    <!-- Toggle Mostrar solo sin notificar -->
    <div class="flex items-center space-x-1">
      <span class="text-xs font-medium text-text-main dark:text-main-dark">{{ t('filter.unregistered') }}</span>
      <button @click="modelShowOnlyNotNotified = !modelShowOnlyNotNotified"
        :class="[
          modelShowOnlyNotNotified ? 'bg-accent-main' : 'bg-toggle-inactive dark:bg-toggle-inactive-dark'
        ]"
        class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
               transition-colors ease-in-out duration-200 focus:outline-none"
        role="switch" :aria-checked="modelShowOnlyNotNotified">
        <span class="sr-only">{{ t('aria.filter.unregisteredOnly') }}</span>
        <span :class="[
          modelShowOnlyNotNotified ? 'translate-x-5' : 'translate-x-0'
        ]"
          class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-surface-thumb dark:bg-surface-thumb-dark shadow ring-0 transition ease-in-out duration-200">
          <span :class="[
            modelShowOnlyNotNotified ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'
          ]"
            class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
            aria-hidden="true"></span>
          <span :class="[
            modelShowOnlyNotNotified ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100'
          ]"
            class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
            aria-hidden="true"></span>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const modelShowOnlyActive = defineModel<boolean>('showOnlyActive')
const modelShowOnlyNotNotified = defineModel<boolean>('showOnlyNotNotified')
</script>
