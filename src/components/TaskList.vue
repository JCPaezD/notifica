<script setup lang="ts">
import type { PropType } from 'vue'
import TaskItem from './TaskItem.vue'
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
  <div class="w-full max-w-lg">
    <h2 
      v-if="props.title && tasks.length > 0" 
      class="text-lg font-semibold tracking-wide text-text-main mb-4 px-1"
    >{{ props.title }}</h2>
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