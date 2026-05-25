import { describe, expect, it } from 'vitest'

import { applyClockValueToDate, calculateTaskDurationHours, formatTaskDuration } from '../taskTime'

describe('taskTime', () => {
  it('rounds durations up to the next half hour', () => {
    const start = new Date('2026-05-25T08:00:00')
    const end = new Date('2026-05-25T08:01:00')

    expect(calculateTaskDurationHours(start, end)).toBe(0.5)
  })

  it('handles tasks crossing midnight by clock time', () => {
    const start = new Date('2026-05-25T23:30:00')
    const end = new Date('2026-05-26T01:00:00')

    expect(calculateTaskDurationHours(start, end)).toBe(1.5)
  })

  it('returns null when a task has no end time', () => {
    expect(calculateTaskDurationHours(new Date('2026-05-25T08:00:00'))).toBeNull()
  })

  it('formats duration with the requested locale', () => {
    const start = new Date('2026-05-25T08:00:00')
    const end = new Date('2026-05-25T09:00:00')

    expect(formatTaskDuration(start, end, 'es')).toBe('1,0 h')
    expect(formatTaskDuration(start, end, 'en')).toBe('1.0 h')
  })

  it('applies a valid clock value without mutating the original date', () => {
    const base = new Date('2026-05-25T08:15:30')
    const result = applyClockValueToDate(base, '09:45')

    expect(result?.getHours()).toBe(9)
    expect(result?.getMinutes()).toBe(45)
    expect(result?.getSeconds()).toBe(0)
    expect(base.getHours()).toBe(8)
  })

  it('rejects invalid clock values', () => {
    expect(applyClockValueToDate(new Date(), '25:00')).toBeNull()
    expect(applyClockValueToDate(new Date(), '10:99')).toBeNull()
    expect(applyClockValueToDate(new Date(), 'bad')).toBeNull()
  })
})
