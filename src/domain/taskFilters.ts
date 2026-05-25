import type { Task } from '@/types/Task'

export type ShiftOption = {
  id: string
  label: string
  date: Date
}

export function filterAndSortTasks(
  tasks: Task[],
  options: {
    selectedShiftToView: string | 'current'
    currentShiftId: string | null
    showOnlyActive: boolean
    showOnlyNotNotified: boolean
  },
): Task[] {
  let tasksToDisplay = [...tasks]
  const targetShiftId = options.selectedShiftToView === 'current'
    ? options.currentShiftId
    : options.selectedShiftToView

  if (targetShiftId) {
    tasksToDisplay = tasksToDisplay.filter((task) => task.shiftId === targetShiftId)
  } else if (options.selectedShiftToView === 'current' && !options.currentShiftId) {
    tasksToDisplay = tasksToDisplay.filter((task) => !task.shiftId)
  }

  if (options.showOnlyActive) {
    tasksToDisplay = tasksToDisplay.filter((task) => !task.endTime)
  }

  if (options.showOnlyNotNotified) {
    tasksToDisplay = tasksToDisplay.filter((task) => !task.isNotified)
  }

  return tasksToDisplay.sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
}

export function buildAvailableShifts(
  tasks: Task[],
  notesByShiftId: Record<string, string[]>,
  locale: string | string[],
): ShiftOption[] {
  const shiftIds = new Set<string>()

  tasks.forEach((task) => {
    if (task.shiftId) shiftIds.add(task.shiftId)
  })

  Object.keys(notesByShiftId).forEach((id) => {
    if (id) shiftIds.add(id)
  })

  return Array.from(shiftIds)
    .map((id) => {
      const timestamp = parseInt(id.replace('shift-', ''), 10)
      if (Number.isNaN(timestamp)) {
        return { id, label: id, date: new Date(0) }
      }

      const date = new Date(timestamp)
      return {
        id,
        label: `${date.toLocaleDateString(locale, {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        })} ${date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}`,
        date,
      }
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime())
}
