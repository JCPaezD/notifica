export interface Toast {
  id: string
  title?: string
  description?: string
  icon?: any
  duration?: number
  type?: 'success' | 'error' | 'info' | 'warning'
  onDismiss?: () => void
  action?: {
    label: string
    onClick: () => void
  }
}
