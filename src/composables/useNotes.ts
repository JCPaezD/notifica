/* src/composables/useNotes.ts */

// Gestión de notas asociadas a cada shiftId en localStorage.
// Formato interno: { [shiftId: string]: string[] }

const STORAGE_KEY = 'notesByShiftId'

interface NotesMap {
  [shiftId: string]: string[]
}

// Obtiene todas las notas del almacenamiento (puede estar vacío)
function getNotesMap(): NotesMap {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return {}
  try {
    return JSON.parse(raw) as NotesMap
  } catch {
    return {}
  }
}

// Guarda el objeto completo de notas en localStorage
function setNotesMap(map: NotesMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
}

// Obtiene las notas de un turno específico
export function getNotesForShift(shiftId: string): string[] {
  const map = getNotesMap()
  return map[shiftId] ?? []
}

// Guarda (o sobreescribe) las notas de un turno
export function setNotesForShift(shiftId: string, notes: string[]) {
  const map = getNotesMap()
  map[shiftId] = notes
  setNotesMap(map)
}

// Elimina todas las notas de un turno específico
export function deleteNotesForShift(shiftId: string) {
  const map = getNotesMap()
  if (shiftId in map) {
    delete map[shiftId]
    setNotesMap(map)
  }
}

// (Opcional) Devuelve todas las notas almacenadas
export function getAllNotes(): NotesMap {
  return getNotesMap()
}
