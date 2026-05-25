export function calculateTaskDurationHours(startTime: Date, endTime?: Date): number | null {
  if (!endTime) return null

  const startTotalMinutes = startTime.getHours() * 60 + startTime.getMinutes()
  let endTotalMinutes = endTime.getHours() * 60 + endTime.getMinutes()

  if (endTotalMinutes < startTotalMinutes) {
    endTotalMinutes += 24 * 60
  }

  const durationMinutes = endTotalMinutes - startTotalMinutes
  return Math.ceil((durationMinutes / 60) / 0.5) * 0.5
}

export function formatTaskDuration(
  startTime: Date,
  endTime: Date | undefined,
  locale: string,
): string | null {
  const durationHours = calculateTaskDurationHours(startTime, endTime)
  if (durationHours === null) return null

  return `${durationHours.toLocaleString(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} h`
}

export function applyClockValueToDate(baseDate: Date, clockValue: string): Date | null {
  const [hours, minutes] = clockValue.split(':').map(Number)

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return null
  }

  const nextDate = new Date(baseDate)
  nextDate.setHours(hours, minutes, 0, 0)
  return nextDate
}

export function formatClockTime(date: Date, locale: string): string {
  return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
}
