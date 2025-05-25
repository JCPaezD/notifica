import { toast } from 'vue-sonner'

// Definimos tipos para los mensajes de notificación para consistencia
type NotificationType = 'success' | 'error' | 'info' | 'warning' | 'action' | 'normal'

interface NotificationOptions {
  description?: string
  duration?: number // en milisegundos
  // Aquí se pueden añadir más opciones de vue-sonner si se necesitan
}

export function useNotifications() {
  const showNotification = (
    type: NotificationType,
    title: string,
    options?: NotificationOptions
  ) => {
    const toastOptions = {
      description: options?.description,
      duration: options?.duration || 3000, // Duración por defecto de 3 segundos
      // Puedes añadir más opciones aquí, como un icono personalizado, etc.
    }

    switch (type) {
      case 'success':
        toast.success(title, toastOptions)
        break
      case 'error':
        toast.error(title, toastOptions)
        break
      case 'info':
        toast.info(title, toastOptions)
        break
      case 'warning':
        toast.warning(title, toastOptions)
        break
      case 'action':
        // Para toasts con acciones, vue-sonner tiene una sintaxis específica
        // Ejemplo: toast(title, { action: { label: 'Undo', onClick: () => console.log('Undo') } })
        // Por ahora, lo trataremos como un toast normal, pero se puede expandir
        toast(title, toastOptions)
        break
      case 'normal':
      default:
        toast(title, toastOptions)
        break
    }
  }

  // Funciones específicas para tipos comunes de notificaciones
  const notifySuccess = (title: string, description?: string) => {
    showNotification('success', title, { description })
  }

  const notifyError = (title: string, description?: string) => {
    showNotification('error', title, { description })
  }

  const notifyInfo = (title: string, description?: string) => {
    showNotification('info', title, { description })
  }
  
  const notifyWarning = (title: string, description?: string) => {
    showNotification('warning', title, { description })
  }

  return {
    showNotification,
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyWarning,
  }
}
