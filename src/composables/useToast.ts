import { ref } from 'vue'
import type { Toast } from './toast'

const toasts = ref<Toast[]>([])

export function useToast() {
  const add = (toast: Omit<Toast, 'id'>, duration = 3000): string => {
    const id = Date.now().toString()
    const newToast: Toast = { id, ...toast }
    toasts.value.push(newToast)

    setTimeout(() => {
      toast.onDismiss?.()
      remove(id)
    }, duration)

    return id
  }

  const remove = (id: string) => {
    const index = toasts.value.findIndex((t) => t.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  return {
    toasts,
    add,
    remove,
  }
}
