import type { Task } from '@/types/Task'

export type TaskBackup = {
  tasks: Task[]
  notesByShiftId: Record<string, string[]>
}

export type NormalizedTaskImport = TaskBackup & {
  currentShiftId: string | null
}

export function createTaskBackup(
  tasks: Task[],
  notesByShiftId: Record<string, string[]>,
): TaskBackup {
  return {
    tasks,
    notesByShiftId,
  }
}

export function normalizeImportedTaskBackup(rawBackup: unknown): NormalizedTaskImport {
  const importedTasks = Array.isArray(rawBackup)
    ? rawBackup
    : isObjectRecord(rawBackup)
      ? rawBackup.tasks
      : undefined

  if (!Array.isArray(importedTasks)) {
    throw new Error('invalid-list')
  }

  const notesByShiftId = !Array.isArray(rawBackup) && isObjectRecord(rawBackup)
    ? normalizeNotesByShiftId(rawBackup.notesByShiftId)
    : {}

  const tasks = importedTasks.map(normalizeImportedTask)

  return {
    tasks,
    notesByShiftId,
    currentShiftId: getMostRecentShiftId(tasks, notesByShiftId),
  }
}

export function getMostRecentShiftId(
  tasks: Task[],
  notesByShiftId: Record<string, string[]>,
): string | null {
  const shiftIdsFromTasks = tasks
    .filter((task) => task.shiftId)
    .map((task) => task.shiftId as string)

  const allShiftIds = Array.from(new Set([
    ...shiftIdsFromTasks,
    ...Object.keys(notesByShiftId),
  ]))

  const shiftsWithDates = allShiftIds
    .map((id) => {
      const timestamp = parseInt(id.replace('shift-', ''), 10)
      return Number.isNaN(timestamp) ? null : { id, date: new Date(timestamp) }
    })
    .filter((shift): shift is { id: string; date: Date } => shift !== null)
    .sort((a, b) => b.date.getTime() - a.date.getTime())

  return shiftsWithDates[0]?.id ?? null
}

function normalizeImportedTask(rawTask: unknown): Task {
  if (!isObjectRecord(rawTask)) {
    throw new Error('invalid-task')
  }

  if (!rawTask.id || !rawTask.description || !rawTask.startTime) {
    throw new Error('invalid-task')
  }

  return {
    ...rawTask,
    id: String(rawTask.id),
    description: String(rawTask.description),
    startTime: new Date(String(rawTask.startTime)),
    endTime: rawTask.endTime ? new Date(String(rawTask.endTime)) : undefined,
    technician: rawTask.technician ? String(rawTask.technician) : undefined,
    isNotified: rawTask.isNotified === true,
    shiftId: rawTask.shiftId ? String(rawTask.shiftId) : undefined,
  }
}

function normalizeNotesByShiftId(rawNotes: unknown): Record<string, string[]> {
  if (!isObjectRecord(rawNotes)) {
    return {}
  }

  return Object.fromEntries(
    Object.entries(rawNotes)
      .filter(([, notes]) => Array.isArray(notes))
      .map(([shiftId, notes]) => [
        shiftId,
        (notes as unknown[]).filter((note): note is string => typeof note === 'string'),
      ]),
  )
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
