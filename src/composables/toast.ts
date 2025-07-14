export interface Toast {
  id: string
  title?: string
  description?: string
  icon?: any
  action?: {
    label: string
    onClick: () => void
  }
}
