import type { Task } from '@/types/Task'
import { formatClockTime, formatTaskDuration } from './taskTime'

type Translate = (key: string, values?: Record<string, unknown>) => string

export function formatTaskForPlainText(
  task: Task,
  t: Translate,
  locale: string,
): string {
  const taskEmoji = '\u{1F4DD}'
  const technicianEmoji = '\u{1F477}'
  const notifiedEmoji = '\u2705'
  const clockEmoji = '\u23F1\uFE0F'

  const startTimeStr = formatClockTime(task.startTime, locale)
  const endTimeStr = task.endTime ? formatClockTime(task.endTime, locale) : '--:--'
  const duration = formatTaskDuration(task.startTime, task.endTime, locale)
  const durationStr = duration ? ` (${duration})` : ''

  let taskString =
    `${taskEmoji} ${task.description}\n${clockEmoji} ${startTimeStr} ${t('share.content.to')} ${endTimeStr}${durationStr}`

  if (task.isNotified) {
    taskString += `\n${notifiedEmoji} ${t('task.registered')}`
  }

  if (task.technician) {
    taskString += `\n    ${technicianEmoji} ${task.technician}`
  }

  return taskString
}

export function buildShiftShareText(
  tasks: Task[],
  notes: string[],
  shiftLabel: string,
  t: Translate,
  locale: string,
): string {
  const orderedTasks = [...tasks].sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
  const title = `_*${t('share.content.headerTasks', { shift: shiftLabel })}*:_\n\n`
  const tasksText = orderedTasks.map((task) => formatTaskForPlainText(task, t, locale)).join('\n\n')

  if (notes.length === 0) {
    return title + tasksText
  }

  return `${title}${tasksText}\n\n_*${t('share.content.headerNotes')}*:_\n${notes
    .map((note) => `    - ${note}`)
    .join('\n')}`
}
