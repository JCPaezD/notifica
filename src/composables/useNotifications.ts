import { toast, type ExternalToast } from 'vue-sonner' // Import ExternalToast

// Definimos tipos para los mensajes de notificación para consistencia
type NotificationType = 'success' | 'error' | 'info' | 'warning' | 'normal' // 'action' type removed, as any toast can have an action

// Estas son las opciones que nuestras funciones helper (notifySuccess, etc.) pueden tomar
// además de 'title' y 'description'. Incluyen propiedades de ExternalToast como
// 'action', 'duration', 'className', 'onDismiss', etc., excluyendo las que manejamos explícitamente.
type HelperToastOptions = Omit<ExternalToast, 'title' | 'description' | 'type'>;

export function useNotifications() {
  const showNotification = (
    type: NotificationType,
    title: string,
    // Las opciones para showNotification combinan nuestra 'description' con HelperToastOptions.
    options?: HelperToastOptions & { description?: string }
  ): string | number => { // Return the toastId
    // Si options es undefined, currentDescription será undefined y restOptions será un objeto vacío.
    const currentDescription = options?.description;
    const { description: _ignoredDescription, ...restOptions } = options || {} as HelperToastOptions & { description?: string };

    const toastProps: ExternalToast = {
      description: currentDescription,
      duration: restOptions.duration ?? 3000, // Default duration 3s para toasts informativos
      ...restOptions, // Spread all other options like action, onDismiss, etc.
    }

    let toastId: string | number

    switch (type) {
      case 'success':
        toastId = toast.success(title, toastProps)
        break
      case 'error':
        toastId = toast.error(title, toastProps)
        break
      case 'info':
        toastId = toast.info(title, toastProps)
        break
      case 'warning':
        toastId = toast.warning(title, toastProps)
        break
      case 'normal':
      default:
        toastId = toast(title, toastProps)
        break
    }
    return toastId
  }

  // Funciones específicas para tipos comunes de notificaciones
  // Now they can also accept additional options and will return the toastId
  const notifySuccess = (title: string, description?: string, opts?: HelperToastOptions) => {
    return showNotification('success', title, { description, ...opts })
  }

  const notifyError = (title: string, description?: string, opts?: HelperToastOptions) => {
    return showNotification('error', title, { description, ...opts })
  }

  const notifyInfo = (title: string, description?: string, opts?: HelperToastOptions) => {
    return showNotification('info', title, { description, ...opts })
  }
  
  const notifyWarning = (title: string, description?: string, opts?: HelperToastOptions) => {
    return showNotification('warning', title, { description, ...opts })
  }

  return {
    showNotification,
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyWarning,
    dismissToast: toast.dismiss, // Expose dismiss function
  }
}
