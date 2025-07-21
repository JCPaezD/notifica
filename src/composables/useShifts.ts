// src/composables/useShifts.ts

import dayjs from 'dayjs'
import { capitalize } from '../utils/text'

// Devuelve el texto formateado de un turno dado su ID.
// Incluye tramo horario y fecha abreviada, usado como parte del título y el selector.
export function getShiftLabel(shiftId: string): string {
  const timestamp = Number(shiftId.replace('shift-', ''))
  const date = dayjs(timestamp)
  const dayName = capitalize(date.format('ddd').replace('.', '')) // sin punto final
  const dateStr = date.format('DD/MM')
  const hourStr = date.format('HH:mm')
  return `${dayName} · ${dateStr} · ${hourStr}`
}

// Devuelve el icono correspondiente a un turno dado su ID.
export function getShiftIcon(shiftId: string): 'sun' | 'clock' | 'moon' {
  const timestamp = Number(shiftId.replace('shift-', ''))
  const hour = dayjs(timestamp).hour()

  if (hour < 12) return 'sun'
  else if (hour < 20) return 'clock'
  else return 'moon'
}

import { useDarkMode } from './useDarkMode'
import { shiftColors } from '../constants/shiftColors'

const { isDark } = useDarkMode()

export function getShiftColor(shiftId: string): string {
  const icon = getShiftIcon(shiftId)
  return shiftColors[icon][isDark.value ? 'dark' : 'light']
}
