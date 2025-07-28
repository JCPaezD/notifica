<script setup lang="ts">
// src/components/TaskList.vue
// Componente que muestra una lista de tareas.
// Recibe un array de tareas y un título opcional, y renderiza cada tarea usando TaskItem.
import type { PropType } from 'vue'
import TaskItem from './TaskItem.vue'
import type { Task } from '../types/Task'
import { getShiftColor } from '@/composables/useShifts'
import { computed } from 'vue'

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

    </TransitionGroup>
  </div>
</template>
