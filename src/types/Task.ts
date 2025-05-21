export interface Task {
  id: string
  description: string
  startTime: Date
  endTime?: Date
  technician?: string
  isNotified?: boolean
  shiftId?: string     // Nuevo campo para identificar el turno
}