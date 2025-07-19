<template>
  <!-- Selector de Turno -->
  <div class="relative flex-shrink-0">
    <button
      ref="shiftDropdownButtonRef"
      @click="toggleShiftDropdown"
      type="button"
      class="inline-flex items-center justify-center w-[72px] 
        rounded-md border border-slate-300 bg-white px-2 py-2 text-xs font-medium text-text-main shadow-sm hover:bg-slate-50
        focus:outline-none transition-all duration-300 ease-in-out active:scale-95"
      aria-haspopup="true"
      :aria-expanded="isShiftDropdownOpen"
    >
      Turno
      <svg class="ml-0.5 h-3 w-3 text-text-main/70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
        fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z"
          clip-rule="evenodd" />
      </svg>
    </button>

    <Teleport to="body">
        <div
            v-if="isShiftDropdownOpen"
            class="fixed inset-0 z-40"
            @mousedown.prevent
        ></div>
    </Teleport>

    <div
      v-if="isShiftDropdownOpen"
      ref="shiftDropdownMenuRef"
      class="absolute left-0 z-50 w-56 origin-top-left rounded-md bg-white shadow-lg border border-slate-200 focus:outline-none max-h-60 overflow-y-auto"
      :class="openUpward
        ? 'bottom-full mb-2 origin-bottom-left'
        : 'mt-2 origin-top-left'"
      role="menu"
      aria-orientation="vertical"
    >
      <div class="py-0.5" role="none">
        <button
          @click="emitSelect('current')"
          class="text-text-main w-full text-left min-h-[44px] px-4 py-2 text-sm hover:bg-slate-100 hover:text-text-main transition-colors duration-150 ease-in-out flex items-center gap-2"
          role="menuitem"
        >
          <component
            :is="icons[getShiftIcon(currentShiftId || '')]"
            :class="['w-4 h-4 shrink-0', getShiftColor(currentShiftId || '')]"
          />
          <span>{{ getShiftLabel(currentShiftId || '') }}</span>
          <span class="ml-auto w-3 h-3 rounded-full bg-emerald-300 self-center"></span>
        </button>

        <template v-for="shift in availableShifts" :key="shift.id">
          <button
            v-if="shift.id !== currentShiftId"
            @click="emitSelect(shift.id)"
            class="text-text-main w-full text-left min-h-[44px] px-4 py-2 text-sm hover:bg-slate-100 hover:text-text-main transition-colors duration-150 ease-in-out flex items-center gap-2"
            role="menuitem"
          >
            <component
              :is="icons[getShiftIcon(shift.id)]"
              :class="['w-4 h-4 shrink-0', getShiftColor(shift.id)]"
            />
            <span>{{ getShiftLabel(shift.id) }}</span>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getShiftIcon, getShiftLabel, getShiftColor } from '@/composables/useShifts'
import { shiftIcons as icons } from '@/icons/shifts'

interface Shift {
  id: string
  label: string
  date: Date
}

const props = defineProps<{
  availableShifts: Shift[]
  currentShiftId: string | null
  selectedShiftToView: string | 'current'
}>()

const emit = defineEmits<{
  (e: 'select', shiftId: string | 'current'): void
}>()

const isShiftDropdownOpen = ref(false)
const openUpward = ref(false)
const shiftDropdownButtonRef = ref<HTMLElement | null>(null)
const shiftDropdownMenuRef = ref<HTMLDivElement | null>(null)

function toggleShiftDropdown() {
  isShiftDropdownOpen.value = !isShiftDropdownOpen.value

  if (isShiftDropdownOpen.value && shiftDropdownButtonRef.value) {
    const rect = shiftDropdownButtonRef.value.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const dropdownHeight = 240
    const margin = 16

    const spaceBelow = viewportHeight - rect.bottom
    const spaceAbove = rect.top

    openUpward.value = spaceBelow < dropdownHeight + margin && spaceAbove > dropdownHeight + margin
  }
}

function emitSelect(shiftId: string | 'current') {
  emit('select', shiftId)
  isShiftDropdownOpen.value = false
}

import { onMounted, onUnmounted } from 'vue'

function handleClickOutsideShiftDropdown(event: MouseEvent) {
  if (isShiftDropdownOpen.value) {
    const target = event.target as Node
    const isClickOnButton = shiftDropdownButtonRef.value?.contains(target)
    const isClickOnMenu = shiftDropdownMenuRef.value?.contains(target)

    if (!isClickOnButton && !isClickOnMenu) {
      isShiftDropdownOpen.value = false
    }
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutsideShiftDropdown)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutsideShiftDropdown)
})

</script>
