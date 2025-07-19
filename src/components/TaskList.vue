<script setup lang="ts">
// src/components/TaskList.vue
// Componente que muestra una lista de tareas.
// Recibe un array de tareas y un título opcional, y renderiza cada tarea usando TaskItem.
import type { PropType } from 'vue'
import TaskItem from './TaskItem.vue'
import type { Task } from '../types/Task'

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

function getShiftColor(shiftId: string): string {
  const hour = Number(shiftId.replace('shift-', '')) || 0
  const h = new Date(hour).getHours()

  if (h < 12) return 'text-yellow-400'
  if (h < 20) return 'text-amber-500'
  return 'text-indigo-500'
}

</script>

<template>
  <div class="w-full max-w-lg">
    <div 
      v-if="props.title && tasks.length > 0" 
      class="mb-4 px-1"
    >
      <p class="text-s text-gray-500 mb-1">Viendo Turno</p>
      <div class="flex items-center gap-2 text-xl font-semibold text-text-main">
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
      class="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden"
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
    </TransitionGroup>
  </div>
</template>

<!-- El bloque <style> con .task-list-item-move se elimina ya que move-class usa Tailwind directamente -->