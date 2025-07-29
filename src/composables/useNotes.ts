/* src/composables/useNotes.ts */

// Gestión de notas asociadas a cada shiftId en localStorage.
// Formato interno: { [shiftId: string]: string[] }

import { ref } from 'vue'

const STORAGE_KEY = 'notesByShiftId'

const loadFromStorage = (): Record<string, string[]> => {
  const stored = localStorage.getItem(STORAGE_KEY)
  try {
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

const notesMap = ref<Record<string, string[]>>(loadFromStorage())

const persist = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notesMap.value))
}

// ✅ Devuelve notas del turno
export function getNotesForShift(shiftId: string): string[] {
  return notesMap.value[shiftId] ?? []
}

// ✅ Guarda o actualiza las notas del turno
export function setNotesForShift(shiftId: string, notes: string[]) {
  if (notes.length === 0) {
    delete notesMap.value[shiftId]
  } else {
    notesMap.value[shiftId] = notes
  }
  persist()
}

// ✅ Borra todas las notas del turno
export function deleteNotesForShift(shiftId: string) {
  delete notesMap.value[shiftId]
  persist()
}

// ✅ Borra todo el mapa
export function deleteAllNotes() {
  notesMap.value = {}
  persist()
}

// ✅ Reemplaza por un mapa nuevo
export function setAllNotes(rawNotes: Record<string, string[]>) {
  notesMap.value = rawNotes
  persist()
}

// ✅ (Opcional futuro) Acceso completo
export function getAllNotes(): Record<string, string[]> {
  return notesMap.value
}

export { notesMap }
