import { describe, expect, it } from 'vitest'

import {
  createStartedTask,
  finishTaskById,
  getTaskRemovalSnapshot,
  reactivateTaskById,
  reactivateTaskWithSnapshot,
  removeTaskAtIndex,
  replaceTaskById,
  restoreTaskAtIndex,
  reviveTaskDates,
} from '../taskLifecycle'
import type { Task } from '@/types/Task'

describe('taskLifecycle', () => {
  it('creates a started task with default not notified state', () => {
    expect(createStartedTask({
      id: '1',
      description: 'Replace filter',
      startTime: new Date('2026-05-25T08:00:00'),
      technician: 'Ana',
      shiftId: 'shift-1',
    })).toMatchObject({
      id: '1',
      description: 'Replace filter',
      technician: 'Ana',
      isNotified: false,
      shiftId: 'shift-1',
    })
  })

  it('finishes and reactivates an existing task', () => {
    const tasks = [createTask('1')]
    const endTime = new Date('2026-05-25T09:00:00')

    expect(finishTaskById(tasks, '1', endTime)?.endTime).toBe(endTime)
    expect(reactivateTaskById(tasks, '1')?.endTime).toBeUndefined()
  })

  it('reactivates a task while preserving the previous finished state', () => {
    const endTime = new Date('2026-05-25T09:00:00')
    const tasks = [createTask('1', { endTime, isNotified: true })]

    const result = reactivateTaskWithSnapshot(tasks, '1')

    expect(result?.task.endTime).toBeUndefined()
    expect(result?.previousTask.endTime).toBe(endTime)
    expect(result?.previousTask.isNotified).toBe(true)
    expect(tasks[0].endTime).toBeUndefined()
  })

  it('replaces an existing task and reports the previous state', () => {
    const tasks = [createTask('1', { isNotified: false })]
    const updatedTask = createTask('1', { isNotified: true })

    const result = replaceTaskById(tasks, updatedTask)

    expect(result?.previousTask.isNotified).toBe(false)
    expect(tasks[0].isNotified).toBe(true)
  })

  it('captures removal snapshots and restores tasks in the same position', () => {
    const first = createTask('1')
    const second = createTask('2')
    const tasks = [first, second]
    const snapshot = getTaskRemovalSnapshot(tasks, '1')

    expect(snapshot).toEqual({ taskIndex: 0, task: first })

    removeTaskAtIndex(tasks, snapshot!.taskIndex)
    expect(tasks.map((task) => task.id)).toEqual(['2'])

    restoreTaskAtIndex(tasks, snapshot!.taskIndex, snapshot!.task)
    expect(tasks.map((task) => task.id)).toEqual(['1', '2'])
  })

  it('revives serialized dates for restored task lists', () => {
    const revived = reviveTaskDates([
      {
        id: '1',
        description: 'Serialized',
        startTime: '2026-05-25T08:00:00.000Z' as unknown as Date,
        endTime: '2026-05-25T09:00:00.000Z' as unknown as Date,
      },
    ])

    expect(revived[0].startTime).toBeInstanceOf(Date)
    expect(revived[0].endTime).toBeInstanceOf(Date)
  })
})

function createTask(id: string, overrides: Partial<Task> = {}): Task {
  return {
    id,
    description: `Task ${id}`,
    startTime: new Date('2026-05-25T08:00:00'),
    isNotified: false,
    ...overrides,
  }
}
