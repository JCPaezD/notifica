<script setup lang="ts">
// src/components/TaskList.vue
// Componente que muestra una lista de tareas.
// Recibe un array de tareas y un título opcional, y renderiza cada tarea usando TaskItem.
import type { PropType } from 'vue'
import TaskItem from './TaskItem.vue'
import type { Task } from '../types/Task'
import { getShiftColor } from '@/composables/useShifts'
import { computed, ref, watchEffect } from 'vue'


const isNotesOpen = ref(false)

// Props del componente.
const props = defineProps({
  // Array de objetos Task a mostrar.
  tasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
  // Título opcional a mostrar encima de la lista de tareas.
  title: {
    type: String,
    default: 'Lista de Tareas' // Título por defecto si no se proporciona
  },
  // ID del turno al que corresponde el título (para mostrar icono).
  titleId: {
    type: String,
    default: ''
  },
  titleIcon: {
    type: Object,
    default: null
  },
  filtersActive: {
    type: Boolean,
    default: false
  },
  currentShiftId: {
    type: [String, null] as PropType<string | null>,
    required: true
  },
  allTaskShiftIds: {
    type: Array as PropType<string[]>,
    required: true
  },
  activeShiftId: {
    type: [String, null] as PropType<string | null>,
    required: true
  }
})

// Emits para comunicar acciones al componente padre (App.vue).
// Estos eventos son retransmitidos desde los componentes TaskItem.
const emit = defineEmits(['finish-task', 'update-task', 'reactivate-task', 'delete-task'])

// Retransmite el evento 'finish-task' desde TaskItem al padre.
const relayFinishTask = (taskId: string) => {
  emit('finish-task', taskId)
}

// Retransmite el evento 'update-task' desde TaskItem al padre.
const relayUpdateTask = (updatedTask: Task) => {
  emit('update-task', updatedTask)
}

// Retransmite el evento 'reactivate-task' desde TaskItem al padre.
const relayReactivateTask = (taskId: string) => {
  emit('reactivate-task', taskId)
}

const relayDeleteTask = (taskId: string) => {
  emit('delete-task', taskId)
}

const emptyMessage = computed(() => {
  if (props.filtersActive) {
    return 'Prueba a desactivar los filtros'
  }

  if (
    props.titleId &&
    props.activeShiftId &&
    props.titleId !== props.activeShiftId
  ) {
    return 'Este turno no tiene tareas'
  }

  return 'Empieza una nueva tarea para este turno'
})

const onEnter = (el: Element) => {
  const htmlEl = el as HTMLElement
  htmlEl.style.maxHeight = `${htmlEl.scrollHeight}px`
}

const onAfterEnter = (el: Element) => {
  const htmlEl = el as HTMLElement
  htmlEl.style.maxHeight = ''
}

const onBeforeLeave = (el: Element) => {
  const htmlEl = el as HTMLElement
  htmlEl.style.maxHeight = `${htmlEl.scrollHeight}px`
}

const onLeave = (el: Element) => {
  const htmlEl = el as HTMLElement
  htmlEl.style.maxHeight = '0px'
}

import { watch } from 'vue'
import { getNotesForShift, setNotesForShift, deleteNotesForShift } from '@/composables/useNotes'

const showNotes = computed(() => props.titleId !== '')

import { notesMap } from '@/composables/useNotes' // debes exportarla explícitamente

const notes = ref<string[]>([])

watchEffect(() => {
  const base = notesMap.value[props.titleId] ?? []
  notes.value = [...base, '']
})

// Guarda y actualiza las notas tras cada edición
function handleBlur(index: number) {
  const cleaned = notes.value
    .map(n => n.trim())
    .filter(n => n.length > 0)

  if (cleaned.length === 0) {
    deleteNotesForShift(props.titleId)
    notes.value = ['']
  } else {
    setNotesForShift(props.titleId, cleaned)
    notes.value = [...cleaned, '']
  }
}

// Si se cambia de turno visualizado, recarga notas
watch(() => props.titleId, (newId) => {
  notes.value = [...getNotesForShift(newId), '']
})

watch(
  () => props.titleId,
  (newId) => {
    const shiftNotes = getNotesForShift(newId)
    const hasNonEmptyNotes = shiftNotes.some(n => n.trim() !== '')
    isNotesOpen.value = hasNonEmptyNotes
  }
)


</script>

<template>
  <div class="w-full max-w-lg">
    <div 
      v-if="props.title" 
      class="mb-4 px-1"
    >
      <p class="text-s text-text-subtle dark:text-subtle-dark mb-1">Viendo Turno</p>
      <div class="flex items-center gap-2 text-xl font-semibold text-text-main dark:text-main-dark">
        <component
          v-if="props.titleIcon"
          :is="props.titleIcon"
          :class="['w-4 h-4 shrink-0', getShiftColor(props.titleId)]"
        />
        <span>{{ props.title }}</span>
      </div>
    </div>
    <TransitionGroup 
      tag="ul" 
      name="task-list"
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 max-h-0" 
      enter-to-class="opacity-100 max-h-32" 
      leave-active-class="transition-all duration-300 ease-in-out"
      move-class="transition-transform duration-500 ease-out" 
      leave-from-class="opacity-100 max-h-32"  
      leave-to-class="opacity-0 max-h-0"
      class="bg-surface-1 dark:bg-surface-1-dark rounded-xl shadow-sm border border-divider dark:border-divider-dark flex flex-col overflow-hidden"
    >
      <TaskItem 
        v-for="(task, index) in tasks" 
        :key="task.id"  
        :task="task"
        :is-first="index === 0"
        :is-last="index === tasks.length - 1"
        @finish-task="relayFinishTask" 
        @update-task="relayUpdateTask" 
        @reactivate-task="relayReactivateTask" 
        @delete-task="relayDeleteTask" />
      
      <!-- Placeholder si no hay tareas -->
      <li
        v-if="tasks.length === 0"
        :key="'no-tasks-placeholder'"
        class="flex flex-row text-sm relative overflow-hidden"
      >
        <div class="w-1 shrink-0 z-10"></div>

        <div class="flex-grow grid grid-cols-[1fr_auto_auto] items-center gap-x-2 py-1 px-3">
          <div class="col-start-1 row-start-1 col-span-3 py-1 text-center text-subtle dark:text-subtle-dark">
            <svg xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6 mx-auto mb-1">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
            </svg>
            <Transition
              name="fade-scale"
              mode="out-in"
            >
              <p :key="emptyMessage" class="text-sm">
                {{ emptyMessage }}
              </p>
            </Transition>
          </div>
        </div>
      </li>

      <!-- Bloque de Notas del Turno -->
      <li v-if="showNotes" :key="'notes-block'" class="flex flex-row text-sm relative overflow-hidden">
        <div class="w-1 shrink-0 z-10"></div>

        <div class="flex-grow grid grid-cols-[1fr_auto_auto] items-center gap-x-2 py-1 px-3">
          <div class="col-start-1 row-start-1 col-span-3">

            <div class="space-y-1 mt-1">
              <button
                @click="isNotesOpen = !isNotesOpen"
                :class="[
                  'w-full flex items-center justify-between gap-x-3 px-3 py-3 rounded-md text-sm font-medium',
                  'bg-surface-2 dark:bg-surface-2-dark text-text-main dark:text-main-dark',
                  'active:scale-95 transition-all duration-150 ease-in-out'
                ]"
                :aria-expanded="isNotesOpen"
                aria-controls="notes-content"
              >
                <span class="flex items-center gap-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h7.5m-7.5 3h7.5m-7.5 3h4.5" />
                  </svg>
                  Notas del turno
                </span>
                <svg
                  class="w-5 h-5 text-text-main dark:text-main-dark/80 transition-transform duration-300"
                  :class="{ 'rotate-90': isNotesOpen }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <Transition
                name="collapse"
                @enter="onEnter"
                @after-enter="onAfterEnter"
                @before-leave="onBeforeLeave"
                @leave="onLeave"
              >
                <div id="notes-content" v-show="isNotesOpen" class="bg-surface-1 dark:bg-surface-1-dark border border-divider dark:border-divider-dark rounded-xl px-3 py-3 space-y-2">
                  <div class="space-y-2">
                    <div
                      v-for="(note, index) in notes"
                      :key="`note-${index}`"
                      class="relative"
                    >
                      <input
                        v-model="notes[index]"
                        @blur="handleBlur(index)"
                        type="text"
                        class="w-full rounded-md bg-surface-2 dark:bg-surface-2-dark text-text-main dark:text-main-dark border border-divider dark:border-divider-dark px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-main"
                        :placeholder="index === notes.length - 1 ? 'Añadir nota…' : 'Nota'"
                      />
                    </div>
                  </div>
                </div>
              </Transition>
            </div>

          </div>
        </div>
      </li>

    </TransitionGroup>
  </div>
</template>
