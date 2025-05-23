<script setup lang="ts">
import type { PropType } from 'vue'
import TaskItem from './TaskItem.vue' // Importar el nuevo componente TaskItem
import type { Task } from '../types/Task'

const props = defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
  title: {
    type: String,
    default: 'Lista de Tareas' // Título por defecto si no se proporciona
  }
})

const emit = defineEmits(['finish-task', 'update-task', 'reactivate-task', 'delete-task'])

const relayFinishTask = (taskId: string) => {
  emit('finish-task', taskId)
}

const relayUpdateTask = (updatedTask: Task) => {
  emit('update-task', updatedTask)
}

const relayReactivateTask = (taskId: string) => {
  emit('reactivate-task', taskId)
}

const relayDeleteTask = (taskId: string) => {
  emit('delete-task', taskId)
}
</script>

<template>
  <div v-if="tasks.length > 0" class="w-full max-w-lg">
    <h2 v-if="props.title" class="text-lg font-semibold tracking-wide text-text-main mb-4 px-1">{{ props.title }}</h2> <!-- Título de la lista ajustado -->
    <ul class="bg-white rounded-xl divide-y divide-gray-200 overflow-hidden shadow-sm border border-gray-200">
      <!-- Usar el componente TaskItem para cada tarea -->
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" @finish-task="relayFinishTask" @update-task="relayUpdateTask" @reactivate-task="relayReactivateTask" @delete-task="relayDeleteTask" />
    </ul>
  </div>
</template>