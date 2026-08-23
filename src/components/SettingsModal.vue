<script setup lang="ts">
import { DialogTitle } from '@headlessui/vue'
import { useI18n } from 'vue-i18n'
import Modal from './ui/Modal.vue'

type ThemeMode = 'light' | 'dark' | 'system'
type LocaleMode = 'es' | 'en' | 'system'

defineProps<{
  modelValue: boolean
  preferredMode: ThemeMode
  selectedLocale: LocaleMode
  keepScreenAwake: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'set-preferred-mode': [mode: ThemeMode]
  'set-locale': [locale: LocaleMode]
  'set-keep-screen-awake': [enabled: boolean]
}>()

const { t } = useI18n()
</script>

<template>
  <Modal
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="bg-surface-hover dark:bg-surface-hover-dark rounded-t-xl px-4 py-2 text-left">
      <DialogTitle as="h2" id="modal-title" class="flex justify-between items-center text-xl font-semibold">
        <span class="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          {{ t('menu.options') }}
        </span>
        <button
          v-cancel-touch-click
          @click="emit('update:modelValue', false)"
          :aria-label="t('aria.menu.close')"
          class="focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-7 h-7 text-text-main dark:text-main-dark transition-colors duration-150 hover:text-subtle dark:hover:text-subtle-dark active:text-accent-main">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </DialogTitle>
    </div>

    <div class="bg-surface-1 dark:bg-surface-1-dark rounded-b-xl px-6 py-6 text-left">
      <div class="mb-6">
        <p class="flex items-center gap-2 text-base font-semibold text-subtle dark:text-subtle-dark mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
          </svg>
          {{ t('menu.appearance') }}
        </p>
        <div class="grid grid-cols-3 gap-2">
          <button v-cancel-touch-click @click="emit('set-preferred-mode', 'system')" :class="[
            'h-10 w-full flex items-center gap-1 px-2 md:px-3 md:gap-2 py-2 rounded-md transition-all duration-150',
            preferredMode === 'system'
              ? 'bg-accent-main text-white font-semibold'
              : 'bg-surface-1 dark:bg-surface-1-dark text-subtle dark:text-subtle-dark border border-divider hover:bg-surface-hover dark:hover:bg-surface-hover-dark'
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
            </svg>
            {{ t('menu.theme.system') }}
          </button>

          <button v-cancel-touch-click @click="emit('set-preferred-mode', 'light')" :class="[
            'h-10 w-full flex items-center gap-1 px-2 md:px-3 md:gap-2 py-2 rounded-md transition-all duration-150',
            preferredMode === 'light'
              ? 'bg-accent-main text-white font-semibold'
              : 'bg-surface-1 dark:bg-surface-1-dark text-subtle dark:text-subtle-dark border border-divider hover:bg-surface-hover dark:hover:bg-surface-hover-dark'
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 3v1.5m0 15V21m9-9h-1.5M4.5 12H3m16.95 4.95l-1.061-1.061M6.111 6.111 5.05 5.05m0 13.9 1.061-1.061m12.728-12.728-1.061 1.061M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ t('menu.theme.light') }}
          </button>

          <button v-cancel-touch-click @click="emit('set-preferred-mode', 'dark')" :class="[
            'h-10 w-full flex items-center gap-1 px-2 md:px-3 md:gap-2 py-2 rounded-md transition-all duration-150',
            preferredMode === 'dark'
              ? 'bg-accent-main text-white font-semibold'
              : 'bg-surface-1 dark:bg-surface-1-dark text-subtle dark:text-subtle-dark border border-divider hover:bg-surface-hover dark:hover:bg-surface-hover-dark'
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
            {{ t('menu.theme.dark') }}
          </button>
        </div>
      </div>

      <hr class="my-4 border-divider dark:border-divider-dark mx-3" />

      <div>
        <p class="flex items-center gap-2 text-base font-semibold text-subtle dark:text-subtle-dark mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
          </svg>
          {{ t('menu.language') }}
        </p>
        <div class="grid grid-cols-3 gap-2">
          <button v-cancel-touch-click @click="emit('set-locale', 'system')" :class="[
            'flex-1 h-10 flex items-center justify-center rounded-md transition-all duration-150',
            selectedLocale === 'system'
              ? 'bg-accent-main text-white font-semibold'
              : 'bg-surface-1 dark:bg-surface-1-dark text-subtle dark:text-subtle-dark border border-divider hover:bg-surface-hover dark:hover:bg-surface-hover-dark'
          ]">
            AUTO
          </button>
          <button v-cancel-touch-click @click="emit('set-locale', 'es')" :class="[
            'flex-1 h-10 flex items-center justify-center rounded-md transition-all duration-150',
            selectedLocale === 'es'
              ? 'bg-accent-main text-white font-semibold'
              : 'bg-surface-1 dark:bg-surface-1-dark text-subtle dark:text-subtle-dark border border-divider hover:bg-surface-hover dark:hover:bg-surface-hover-dark'
          ]">
            ES
          </button>
          <button v-cancel-touch-click @click="emit('set-locale', 'en')" :class="[
            'flex-1 h-10 flex items-center justify-center rounded-md transition-all duration-150',
            selectedLocale === 'en'
              ? 'bg-accent-main text-white font-semibold'
              : 'bg-surface-1 dark:bg-surface-1-dark text-subtle dark:text-subtle-dark border border-divider hover:bg-surface-hover dark:hover:bg-surface-hover-dark'
          ]">
            EN
          </button>
        </div>
      </div>

      <hr class="my-4 border-divider dark:border-divider-dark mx-3" />

      <div class="flex items-center justify-between gap-4">
        <span class="flex items-center gap-2 text-base font-semibold text-subtle dark:text-subtle-dark">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-2.636-1.591 1.591M5.25 12H3m3.636-6.364L5.045 4.045M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
          {{ t('menu.keepScreenAwake') }}
        </span>
        <button
          v-cancel-touch-click
          type="button"
          role="switch"
          :aria-checked="keepScreenAwake"
          :aria-label="t('aria.settings.keepScreenAwake')"
          @click="emit('set-keep-screen-awake', !keepScreenAwake)"
          :class="[
            keepScreenAwake ? 'bg-accent-main' : 'bg-toggle-inactive dark:bg-toggle-inactive-dark',
            'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-main'
          ]"
        >
          <span
            :class="keepScreenAwake ? 'translate-x-5' : 'translate-x-0'"
            class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-surface-thumb dark:bg-surface-thumb-dark shadow ring-0 transition ease-in-out duration-200"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  </Modal>
</template>
