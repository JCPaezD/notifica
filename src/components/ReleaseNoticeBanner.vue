<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 max-h-0"
    enter-to-class="opacity-100 max-h-[220px]"
    leave-active-class="transition-all duration-250 ease-in"
    leave-from-class="opacity-100 max-h-[220px]"
    leave-to-class="opacity-0 max-h-0"
  >
    <div
      v-if="visible"
      class="bg-surface-hover dark:bg-surface-hover-dark rounded-xl p-3.5 shadow-sm w-full max-w-lg mb-4 border border-status-purple/40 dark:border-status-purple-dark/40 overflow-hidden"
    >
      <div class="flex items-start gap-3">
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-2">
            <div class="flex min-w-0 items-center gap-3">
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-status-purple dark:bg-status-purple-dark text-purple-strong dark:text-purple-strong-dark"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-[1.3rem] w-[1.3rem]" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.3404 15.8398C9.65153 15.7803 8.95431 15.75 8.25 15.75H7.5C5.01472 15.75 3 13.7353 3 11.25C3 8.76472 5.01472 6.75 7.5 6.75H8.25C8.95431 6.75 9.65153 6.71966 10.3404 6.66022M10.3404 15.8398C10.5933 16.8015 10.9237 17.7317 11.3246 18.6234C11.5721 19.1738 11.3842 19.8328 10.8616 20.1345L10.2053 20.5134C9.6539 20.8318 8.9456 20.6306 8.67841 20.0527C8.0518 18.6973 7.56541 17.2639 7.23786 15.771M10.3404 15.8398C9.95517 14.3745 9.75 12.8362 9.75 11.25C9.75 9.66379 9.95518 8.1255 10.3404 6.66022M10.3404 15.8398C13.5 16.1124 16.4845 16.9972 19.1747 18.3749M10.3404 6.66022C13.5 6.3876 16.4845 5.50283 19.1747 4.12509M19.1747 4.12509C19.057 3.74595 18.9302 3.37083 18.7944 3M19.1747 4.12509C19.7097 5.84827 20.0557 7.65462 20.1886 9.51991M19.1747 18.3749C19.057 18.7541 18.9302 19.1292 18.7944 19.5M19.1747 18.3749C19.7097 16.6517 20.0557 14.8454 20.1886 12.9801M20.1886 9.51991C20.6844 9.93264 21 10.5545 21 11.25C21 11.9455 20.6844 12.5674 20.1886 12.9801M20.1886 9.51991C20.2293 10.0913 20.25 10.6682 20.25 11.25C20.25 11.8318 20.2293 12.4087 20.1886 12.9801" />
                </svg>
              </div>

              <p class="text-xl font-semibold leading-none text-text-main dark:text-main-dark">
                {{ t('releaseNotice.title') }}
              </p>
            </div>

            <button
              v-cancel-touch-click
              @click="$emit('close')"
              class="btn-close shrink-0"
              :aria-label="t('releaseNotice.close')"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 text-text-main dark:text-main-dark" fill="none" stroke="currentColor" stroke-width="1.7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="ml-[1.15rem] mr-[1.15rem] mt-1.5">
            <p class="text-sm leading-relaxed text-text-main/80 dark:text-main-dark/80">
              {{ t('releaseNotice.body') }}
            </p>
          </div>

          <p class="ml-[1.7rem] mr-[1.15rem] mt-1 text-[0.82rem] text-text-main/65 dark:text-main-dark/65">
            {{ t('releaseNotice.summary') }}
          </p>

          <div class="ml-[1.15rem] mr-[1.15rem] mt-1.5 flex flex-wrap items-center gap-2">
            <button
              v-if="showStoreCta"
              v-cancel-touch-click
              @click="$emit('open-store')"
              type="button"
              class="btn-primary inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium active:scale-95 transition-all duration-150 ease-in-out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v12.75" />
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 12 3.75 3.75L15.75 12" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v.75A2.25 2.25 0 0 0 5.25 19.5h13.5A2.25 2.25 0 0 0 21 17.25v-.75" />
              </svg>
              <span>{{ t('releaseNotice.cta') }}</span>
            </button>

            <div class="basis-full text-xs text-text-main/60 dark:text-main-dark/60">
              <span>{{ t(showStoreCta ? 'releaseNotice.footer.store' : 'releaseNotice.footer.web') }}</span>
              <button
                v-cancel-touch-click
                @click="$emit('close')"
                type="button"
                class="ml-1 inline underline underline-offset-2 transition-opacity duration-150 hover:opacity-80"
              >
                {{ t('releaseNotice.dismissLink') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  visible: boolean
  showStoreCta: boolean
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'open-store'): void
}>()
</script>
