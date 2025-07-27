import { ref } from 'vue'

export interface Toast {
  id: string
  title: string
  description?: string
  type?: 'success' | 'error' | 'info' | 'warning'
  onDismiss?: () => void
  delayClose?: boolean
  persistent?: boolean
  actions?: {
    label: string
    onClick: () => void
  }[]
}

const toasts = ref<Toast[]>([])
const timers = new Map<string, number>()

export function useToast() {
  const add = (
    toast: Omit<Toast, 'id'>,
    duration = 3000
  ): string => {
    const id = Date.now().toString()
    const newToast: Toast = { id, ...toast }
    toasts.value.push(newToast)

    if (!toast.delayClose && !toast.persistent) {
      const timerId = window.setTimeout(() => {
        toast.onDismiss?.()
        remove(id)
      }, duration)
      timers.set(id, timerId)
    }

    return id
  }

  const remove = (id: string) => {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }

    if (timers.has(id)) {
      clearTimeout(timers.get(id))
      timers.delete(id)
    }
  }

  const startDismissTimer = (id: string, duration = 3000) => {
    if (timers.has(id)) return

    const toast = toasts.value.find((t) => t.id === id)
    if (!toast || toast.persistent) return

    const timerId = window.setTimeout(() => {
      toast.onDismiss?.()
      remove(id)
    }, duration)
    timers.set(id, timerId)
  }

  return {
    toasts,
    add,
    remove,
    startDismissTimer,
  }
}
