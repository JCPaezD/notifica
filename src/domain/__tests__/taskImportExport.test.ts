import { describe, expect, it } from 'vitest'

import {
  createTaskBackup,
  getMostRecentShiftId,
  normalizeImportedTaskBackup,
} from '../taskImportExport'
import type { Task } from '@/types/Task'

describe('taskImportExport', () => {
  const olderShiftId = 'shift-1764565200000'
  const newerShiftId = 'shift-1764651600000'

  it('creates the combined backup shape used by current exports', () => {
    const task = createTask('1', olderShiftId)
    const notesByShiftId = { [olderShiftId]: ['Check relay'] }

    expect(createTaskBackup([task], notesByShiftId)).toEqual({
      tasks: [task],
      notesByShiftId,
    })
  })

  it('normalizes legacy array backups', () => {
    const result = normalizeImportedTaskBackup([
      {
        id: 10,
        description: 'Legacy task',
        startTime: '2026-05-25T08:00:00.000Z',
        isNotified: 'yes',
        shiftId: olderShiftId,
      },
    ])

    expect(result.tasks).toHaveLength(1)
    expect(result.tasks[0]).toMatchObject({
      id: '10',
      description: 'Legacy task',
      isNotified: false,
      shiftId: olderShiftId,
    })
    expect(result.tasks[0].startTime).toBeInstanceOf(Date)
    expect(result.notesByShiftId).toEqual({})
    expect(result.currentShiftId).toBe(olderShiftId)
  })

  it('normalizes current backups with notes-only shifts', () => {
    const result = normalizeImportedTaskBackup({
      tasks: [createRawTask('1', olderShiftId)],
      notesByShiftId: {
        [newerShiftId]: ['Pending note'],
      },
    })

    expect(result.notesByShiftId).toEqual({
      [newerShiftId]: ['Pending note'],
    })
    expect(result.currentShiftId).toBe(newerShiftId)
  })

  it('drops malformed notes instead of restoring unsafe values', () => {
    const result = normalizeImportedTaskBackup({
      tasks: [createRawTask('1', olderShiftId)],
      notesByShiftId: {
        [olderShiftId]: ['ok', 123, null],
        bad: 'not an array',
      },
    })

    expect(result.notesByShiftId).toEqual({
      [olderShiftId]: ['ok'],
    })
  })

  it('throws for invalid task lists and invalid tasks', () => {
    expect(() => normalizeImportedTaskBackup({ tasks: null })).toThrow('invalid-list')
    expect(() => normalizeImportedTaskBackup({ tasks: [{ id: '1' }] })).toThrow('invalid-task')
  })

  it('selects the latest valid shift across tasks and notes', () => {
    expect(getMostRecentShiftId(
      [createTask('1', olderShiftId)],
      { [newerShiftId]: ['Only note'] },
    )).toBe(newerShiftId)
  })
})

function createTask(id: string, shiftId: string): Task {
  return {
    id,
    description: `Task ${id}`,
    startTime: new Date('2026-05-25T08:00:00'),
    isNotified: false,
    shiftId,
  }
}

function createRawTask(id: string, shiftId: string) {
  return {
    id,
    description: `Task ${id}`,
    startTime: '2026-05-25T08:00:00.000Z',
    shiftId,
  }
}
