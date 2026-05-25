import type { Task } from '@/types/Task'

export type NewTaskInput = {
  id: string
  description: string
  startTime: Date
  technician?: string
  shiftId?: string
}

export function createStartedTask(input: NewTaskInput): Task {
  return {
    id: input.id,
    description: input.description,
    startTime: input.startTime,
    technician: input.technician,
    isNotified: false,
    shiftId: input.shiftId,
  }
}

export function finishTaskById(tasks: Task[], taskId: string, endTime: Date): Task | null {
  const task = tasks.find((candidate) => candidate.id === taskId)
  if (!task) return null

  task.endTime = endTime
  return task
}

export function replaceTaskById(
  tasks: Task[],
  updatedTask: Task,
): { previousTask: Task; updatedTask: Task } | null {
  const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id)
  if (taskIndex === -1) return null

  const previousTask = tasks[taskIndex]
  tasks[taskIndex] = updatedTask
  return {
    previousTask,
    updatedTask,
  }
}

export function reactivateTaskById(tasks: Task[], taskId: string): Task | null {
  const task = tasks.find((candidate) => candidate.id === taskId)
  if (!task) return null

  delete task.endTime
  return task
}

export function getTaskRemovalSnapshot(
  tasks: Task[],
  taskId: string,
): { taskIndex: number; task: Task } | null {
  const taskIndex = tasks.findIndex((task) => task.id === taskId)
  if (taskIndex === -1) return null

  return {
    taskIndex,
    task: { ...tasks[taskIndex] },
  }
}

export function restoreTaskAtIndex(tasks: Task[], taskIndex: number, task: Task) {
  tasks.splice(taskIndex, 0, task)
}

export function removeTaskAtIndex(tasks: Task[], taskIndex: number) {
  tasks.splice(taskIndex, 1)
}

export function reviveTaskDates(tasks: Task[]): Task[] {
  return tasks.map((task) => ({
    ...task,
    startTime: new Date(task.startTime),
    endTime: task.endTime ? new Date(task.endTime) : undefined,
  }))
}
