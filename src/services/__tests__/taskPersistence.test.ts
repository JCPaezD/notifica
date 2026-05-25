import { describe, expect, it } from 'vitest'

import {
  CURRENT_SHIFT_STORAGE_KEY,
  TASKS_STORAGE_KEY,
  loadCurrentShiftId,
  loadTasksFromStorage,
  saveCurrentShiftId,
  saveTasksToStorage,
} from '../taskPersistence'
import type { Task } from '@/types/Task'

describe('taskPersistence', () => {
  it('loads stored tasks and revives date fields', () => {
    const storage = createMemoryStorage()
    storage.setItem(TASKS_STORAGE_KEY, JSON.stringify([
      {
        id: '1',
        description: 'Stored task',
        startTime: '2026-05-25T08:00:00.000Z',
        endTime: '2026-05-25T09:00:00.000Z',
      },
    ]))

    const tasks = loadTasksFromStorage(storage)

    expect(tasks[0].startTime).toBeInstanceOf(Date)
    expect(tasks[0].endTime).toBeInstanceOf(Date)
  })

  it('returns an empty task list when storage has no tasks', () => {
    expect(loadTasksFromStorage(createMemoryStorage())).toEqual([])
  })

  it('saves tasks using the existing storage key and JSON format', () => {
    const storage = createMemoryStorage()
    const tasks: Task[] = [{
      id: '1',
      description: 'Stored task',
      startTime: new Date('2026-05-25T08:00:00.000Z'),
    }]

    saveTasksToStorage(tasks, storage)

    expect(JSON.parse(storage.getItem(TASKS_STORAGE_KEY) ?? '[]')).toMatchObject([
      {
        id: '1',
        description: 'Stored task',
        startTime: '2026-05-25T08:00:00.000Z',
      },
    ])
  })

  it('loads, saves and clears the current shift id', () => {
    const storage = createMemoryStorage()

    expect(loadCurrentShiftId(storage)).toBeNull()

    saveCurrentShiftId('shift-1', storage)
    expect(loadCurrentShiftId(storage)).toBe('shift-1')

    saveCurrentShiftId(null, storage)
    expect(storage.getItem(CURRENT_SHIFT_STORAGE_KEY)).toBeNull()
  })
})

function createMemoryStorage(): Storage {
  const data = new Map<string, string>()

  return {
    get length() {
      return data.size
    },
    clear: () => data.clear(),
    getItem: (key: string) => data.get(key) ?? null,
    key: (index: number) => Array.from(data.keys())[index] ?? null,
    removeItem: (key: string) => data.delete(key),
    setItem: (key: string, value: string) => {
      data.set(key, value)
    },
  }
}
