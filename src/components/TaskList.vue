<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import TaskItem from './TaskItem.vue'
import ShiftNotes from './ShiftNotes.vue'
import type { Task } from '../types/Task'
import { getShiftColor } from '@/composables/useShifts'

const { t } = useI18n()

const props = defineProps<{
  tasks: Task[]
  title?: string
  titleId?: string
  titleIcon?: object | null
  filtersActive?: boolean
  currentShiftId: string | null
  allTaskShiftIds: string[]
  activeShiftId: string | null
}>()

const emit = defineEmits<{
  'finish-task': [taskId: string]
  'update-task': [updatedTask: Task]
  'reactivate-task': [taskId: string]
  'delete-task': [taskId: string]
}>()

const titleDisplayed = computed(() =>
  props.title || t('taskList.defaultTitle')
)

const emptyMessage = computed(() => {
  if (props.filtersActive) {
    return t('empty.filters')
  }

  if (
    props.titleId &&
    props.activeShiftId &&
    props.titleId !== props.activeShiftId
  ) {
    return t('empty.noTasksShift')
  }

  return t('empty.startNew')
})

const showNotes = computed(() => props.titleId !== undefined && props.titleId !== '')
</script>

<template>
  <div class="w-full max-w-lg">
    <div
      v-if="props.title"
      class="mb-4 px-1"
    >
      <p class="text-s text-text-subtle dark:text-subtle-dark mb-1">{{ t('taskList.viewingShift') }}</p>
      <div class="flex items-center gap-2 text-xl font-semibold text-text-main dark:text-main-dark">
        <component
          v-if="props.titleIcon"
          :is="props.titleIcon"
          :class="['w-4 h-4 shrink-0', getShiftColor(props.titleId ?? '')]"
        />
        <span>{{ titleDisplayed }}</span>
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
        @finish-task="emit('finish-task', $event)"
        @update-task="emit('update-task', $event)"
        @reactivate-task="emit('reactivate-task', $event)"
        @delete-task="emit('delete-task', $event)"
      />

      <li
        v-if="tasks.length === 0"
        :key="'no-tasks-placeholder'"
        class="flex flex-row text-sm relative overflow-hidden"
      >
        <div class="w-1 shrink-0 z-10"></div>

        <div class="flex-grow grid grid-cols-[1fr_auto_auto] items-center gap-x-2 py-1 px-3">
          <div class="col-start-1 row-start-1 col-span-3 py-1 text-center text-subtle dark:text-subtle-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 mx-auto mb-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
              />
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

      <ShiftNotes
        v-if="showNotes"
        :key="'notes-block'"
        :shift-id="props.titleId ?? ''"
      />
    </TransitionGroup>
  </div>
</template>
