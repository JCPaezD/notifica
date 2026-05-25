import { describe, expect, it } from 'vitest'

import { buildAvailableShifts, filterAndSortTasks } from '../taskFilters'
import type { Task } from '@/types/Task'

describe('taskFilters', () => {
  it('filters by current shift, active state, notified state and sorts by start time', () => {
    const currentShiftId = 'shift-1764565200000'
    const otherShiftId = 'shift-1764651600000'
    const activeLater = createTask('active-later', currentShiftId, '2026-05-25T10:00:00')
    const activeEarlier = createTask('active-earlier', currentShiftId, '2026-05-25T08:00:00')
    const finished = createTask('finished', currentShiftId, '2026-05-25T09:00:00', {
      endTime: new Date('2026-05-25T09:30:00'),
    })
    const notified = createTask('notified', currentShiftId, '2026-05-25T07:00:00', {
      isNotified: true,
    })
    const other = createTask('other', otherShiftId, '2026-05-25T06:00:00')

    const result = filterAndSortTasks(
      [activeLater, finished, other, activeEarlier, notified],
      {
        selectedShiftToView: 'current',
        currentShiftId,
        showOnlyActive: true,
        showOnlyNotNotified: true,
      },
    )

    expect(result.map((task) => task.id)).toEqual(['active-earlier', 'active-later'])
  })

  it('includes notes-only shifts in the available shift list', () => {
    const taskShiftId = 'shift-1764565200000'
    const noteOnlyShiftId = 'shift-1764651600000'

    const result = buildAvailableShifts(
      [createTask('1', taskShiftId, '2026-05-25T08:00:00')],
      { [noteOnlyShiftId]: ['Note'] },
      'en',
    )

    expect(result.map((shift) => shift.id)).toEqual([noteOnlyShiftId, taskShiftId])
  })
})

function createTask(
  id: string,
  shiftId: string,
  startTime: string,
  overrides: Partial<Task> = {},
): Task {
  return {
    id,
    description: id,
    startTime: new Date(startTime),
    shiftId,
    isNotified: false,
    ...overrides,
  }
}
