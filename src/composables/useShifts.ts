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

const { isDark } = useDarkMode()

// Devuelve el color de texto correspondiente a un turno dado su ID.
export function getShiftColor(shiftId: string): string {
  const icon = getShiftIcon(shiftId)

  if (icon === 'sun') return isDark.value ? 'text-yellow-300' : 'text-yellow-400'
  if (icon === 'clock') return isDark.value ? 'text-amber-300' : 'text-amber-500'
  return isDark.value ? 'text-indigo-300' : 'text-indigo-500'
}

