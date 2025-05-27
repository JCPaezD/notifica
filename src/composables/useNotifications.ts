import { toast, type ExternalToast } from 'vue-sonner' // Import ExternalToast
// src/composables/useNotifications.ts
// Composable para gestionar la visualización de notificaciones (toasts) utilizando vue-sonner.

// Definimos tipos para los mensajes de notificación para consistencia
type NotificationType = 'success' | 'error' | 'info' | 'warning' | 'normal' // 'action' type removed, as any toast can have an action

// Estas son las opciones que nuestras funciones helper (notifySuccess, etc.) pueden tomar
// además de 'title' y 'description'. Incluyen propiedades de ExternalToast como
// 'action', 'duration', 'className', 'onDismiss', etc., excluyendo las que manejamos explícitamente.
type HelperToastOptions = Omit<ExternalToast, 'title' | 'description' | 'type'>;

/**
 * Composable que proporciona funciones para mostrar diferentes tipos de notificaciones (toasts).
 */
export function useNotifications() {
  // Función interna genérica para mostrar una notificación.
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

  /**
   * Muestra una notificación de éxito.
   * @param title - El título de la notificación.
   * @param description - (Opcional) La descripción de la notificación.
   * @param opts - (Opcional) Opciones adicionales de vue-sonner.
   * @returns El ID del toast generado.
   */
  const notifySuccess = (title: string, description?: string, opts?: HelperToastOptions) => {
    return showNotification('success', title, { description, ...opts })
  }

  /**
   * Muestra una notificación de error.
   * @param title - El título de la notificación.
   * @param description - (Opcional) La descripción de la notificación.
   * @param opts - (Opcional) Opciones adicionales de vue-sonner.
   * @returns El ID del toast generado.
   */
  const notifyError = (title: string, description?: string, opts?: HelperToastOptions) => {
    return showNotification('error', title, { description, ...opts })
  }

  /**
   * Muestra una notificación informativa.
   * @param title - El título de la notificación.
   * @param description - (Opcional) La descripción de la notificación.
   * @param opts - (Opcional) Opciones adicionales de vue-sonner.
   * @returns El ID del toast generado.
   */
  const notifyInfo = (title: string, description?: string, opts?: HelperToastOptions) => {
    return showNotification('info', title, { description, ...opts })
  }
  
  /**
   * Muestra una notificación de advertencia.
   * @param title - El título de la notificación.
   * @param description - (Opcional) La descripción de la notificación.
   * @param opts - (Opcional) Opciones adicionales de vue-sonner.
   * @returns El ID del toast generado.
   */
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
