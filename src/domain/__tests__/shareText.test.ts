import { describe, expect, it } from 'vitest'

import { buildShiftShareText, formatTaskForPlainText } from '../shareText'
import type { Task } from '@/types/Task'

describe('shareText', () => {
  it('formats a task with duration, technician and logged state', () => {
    const text = formatTaskForPlainText(
      {
        id: '1',
        description: 'Replace filter',
        startTime: new Date('2026-05-25T08:00:00'),
        endTime: new Date('2026-05-25T09:00:00'),
        technician: 'Ana',
        isNotified: true,
      },
      translate,
      'en',
    )

    expect(text).toContain('Replace filter')
    expect(text).toContain('to')
    expect(text).toContain('09:00')
    expect(text).toContain('(1.0 h)')
    expect(text).toContain('Logged')
    expect(text).toContain('Ana')
  })

  it('orders tasks and appends shift notes', () => {
    const later = createTask('later', '2026-05-25T10:00:00')
    const earlier = createTask('earlier', '2026-05-25T08:00:00')

    const text = buildShiftShareText(
      [later, earlier],
      ['Bring ladder', 'Call support'],
      'Segment of 25/05/26',
      translate,
      'en',
    )

    expect(text.indexOf('earlier')).toBeLessThan(text.indexOf('later'))
    expect(text).toContain('_*Tasks for Segment of 25/05/26*:_')
    expect(text).toContain('_*Notes*:_')
    expect(text).toContain('    - Bring ladder')
  })

  it('keeps unfinished tasks shareable', () => {
    const text = formatTaskForPlainText(createTask('unfinished', '2026-05-25T08:00:00'), translate, 'en')

    expect(text).toContain('to --:--')
  })
})

function createTask(description: string, startTime: string): Task {
  return {
    id: description,
    description,
    startTime: new Date(startTime),
    isNotified: false,
  }
}

function translate(key: string, values?: Record<string, unknown>) {
  const map: Record<string, string> = {
    'share.content.to': 'to',
    'task.registered': 'Logged',
    'share.content.headerTasks': `Tasks for ${values?.shift}`,
    'share.content.headerNotes': 'Notes',
  }

  return map[key] ?? key
}
