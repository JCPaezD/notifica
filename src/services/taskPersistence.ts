import type { Task } from '@/types/Task'

export const TASKS_STORAGE_KEY = 'notifica-tasks'
export const CURRENT_SHIFT_STORAGE_KEY = 'notifica-current-shift-id'

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>

export function loadTasksFromStorage(storage: StorageLike = localStorage): Task[] {
  const storedTasks = storage.getItem(TASKS_STORAGE_KEY)
  if (!storedTasks) return []

  const parsedTasks = JSON.parse(storedTasks) as Task[]
  return parsedTasks.map((task) => ({
    ...task,
    startTime: new Date(task.startTime),
    endTime: task.endTime ? new Date(task.endTime) : undefined,
  }))
}

export function saveTasksToStorage(tasks: Task[], storage: StorageLike = localStorage) {
  storage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
}

export function loadCurrentShiftId(storage: StorageLike = localStorage): string | null {
  return storage.getItem(CURRENT_SHIFT_STORAGE_KEY)
}

export function saveCurrentShiftId(shiftId: string | null, storage: StorageLike = localStorage) {
  if (shiftId) {
    storage.setItem(CURRENT_SHIFT_STORAGE_KEY, shiftId)
  } else {
    storage.removeItem(CURRENT_SHIFT_STORAGE_KEY)
  }
}
