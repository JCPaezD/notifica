<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  deleteNotesForShift,
  getNotesForShift,
  notesMap,
  setNotesForShift,
} from '@/composables/useNotes'

const props = defineProps<{
  shiftId: string
}>()

const { t } = useI18n()

const isNotesOpen = ref(false)
const notes = ref<string[]>([])
const textareaRefs: Record<number, HTMLTextAreaElement | null> = {}

const filledNotesCount = computed(() => notes.value.filter(note => note.trim().length > 0).length)
const notesContentId = computed(() => `notes-content-${props.shiftId}`)

function autoResize(index: number) {
  const el = textareaRefs[index]
  if (el) {
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }
}

function resizeAllNotes() {
  nextTick(() => {
    notes.value.forEach((_, index) => autoResize(index))
  })
}

const onEnter = (el: Element) => {
  const htmlEl = el as HTMLElement
  htmlEl.style.maxHeight = `${htmlEl.scrollHeight}px`
}

const onAfterEnter = (el: Element) => {
  const htmlEl = el as HTMLElement
  htmlEl.style.maxHeight = ''
  resizeAllNotes()
}

const onBeforeLeave = (el: Element) => {
  const htmlEl = el as HTMLElement
  htmlEl.style.maxHeight = `${htmlEl.scrollHeight}px`
}

const onLeave = (el: Element) => {
  const htmlEl = el as HTMLElement
  htmlEl.style.maxHeight = '0px'
}

onMounted(() => {
  resizeAllNotes()
})

watch(notes, () => {
  resizeAllNotes()
})

watchEffect(() => {
  const base = notesMap.value[props.shiftId] ?? []
  notes.value = [...base, '']
})

function handleBlur() {
  const cleaned = notes.value
    .map(note => note.trim())
    .filter(note => note.length > 0)

  if (cleaned.length === 0) {
    deleteNotesForShift(props.shiftId)
    notes.value = ['']
    return
  }

  setNotesForShift(props.shiftId, cleaned)
  notes.value = [...cleaned, '']
}

watch(() => props.shiftId, (newId) => {
  notes.value = [...getNotesForShift(newId), '']
})

watch(
  () => props.shiftId,
  (newId) => {
    const shiftNotes = getNotesForShift(newId)
    isNotesOpen.value = shiftNotes.some(note => note.trim() !== '')
  },
  { immediate: true }
)

function handleEnter(index: number) {
  const note = notes.value[index]?.trim() ?? ''

  if (note.length === 0) {
    if (index !== notes.value.length - 1) {
      notes.value.splice(index, 1)
      handleBlur()
      return
    }

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
    return
  }

  if (index === notes.value.length - 1) {
    notes.value.push('')
  }

  handleBlur()
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
}
</script>

<template>
  <li
    :key="'notes-block'"
    class="bg-surface-hover dark:bg-surface-hover-dark"
  >
    <div class="w-1 shrink-0 z-10"></div>

    <div class="flex-grow grid grid-cols-[1fr_auto_auto] items-center gap-x-2">
      <div class="col-start-1 row-start-1 col-span-3">
        <div class="space-y-1 mt-1">
          <button
            v-cancel-touch-click
            @click="isNotesOpen = !isNotesOpen"
            :class="[
              'w-full flex items-center justify-between gap-x-3 py-2 rounded-md text-sm font-medium',
              'bg-surface-hover dark:bg-surface-hover-dark text-text-main dark:text-main-dark',
              'pr-3'
            ]"
            :aria-expanded="isNotesOpen"
            :aria-controls="notesContentId"
          >
            <span class="flex items-center gap-x-2 py-1.5 px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
              <span class="text-base">{{ t('header.notes') }}</span>
              <Transition
                name="fade-scale"
                mode="out-in"
                appear
              >
                <span
                  v-if="filledNotesCount > 0"
                  :key="filledNotesCount"
                  class="ml-2 px-1.5 py-0.5 rounded-full text-xs font-medium
                        bg-status-success text-success-strong
                        dark:bg-status-success-dark dark:text-success-strong-dark"
                >
                  {{ filledNotesCount }}
                </span>
              </Transition>
            </span>
            <svg
              class="w-5 h-5 text-text-main dark:text-main-dark/80 transition-transform duration-300"
              :class="{ 'rotate-90': isNotesOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <Transition
            name="collapse"
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @before-leave="onBeforeLeave"
            @leave="onLeave"
          >
            <div
              :id="notesContentId"
              v-show="isNotesOpen"
              class="relative bg-surface-1 dark:bg-surface-1-dark border border-divider dark:border-divider-dark
                    rounded-xl space-y-2"
            >
              <div class="absolute top-0 bottom-0 left-8 w-px bg-status-alert dark:bg-status-alert-dark z-10"></div>
              <div class="py-2">
                <div class="space-y-2">
                  <div class="divide-y divide-divider dark:divide-divider-dark">
                    <div
                      v-for="(note, index) in notes"
                      :key="`note-${index}`"
                      class="relative"
                    >
                      <textarea
                        v-model="notes[index]"
                        :ref="el => textareaRefs[index] = el as HTMLTextAreaElement"
                        @blur="handleBlur"
                        @keydown.enter.prevent="handleEnter(index)"
                        @input="autoResize(index)"
                        rows="1"
                        class="w-full bg-surface-1 dark:bg-surface-1-dark text-text-main dark:text-main-dark
                              border-0 border-b-2 border-transparent focus:border-accent-main
                              focus:outline-none resize-none overflow-hidden
                              placeholder-text-main/70 dark:placeholder-text-main-dark/70
                              text-sm pt-[12px] pb-[1px] leading-tight align-text-bottom transition-all duration-150
                              whitespace-pre-wrap break-words pl-10 px-4"
                        :placeholder="index === notes.length - 1 ? t('placeholder.note.add') : t('placeholder.note.default')"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </li>
</template>
