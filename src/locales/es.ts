export default {
  btn: {
    // Botones y acciones cortas
    start: "Iniciar",
    import: "Importar",
    export: "Exportar",
    share: "Compartir",
    deleteAll: "Borrar todo",
  },
  menu: {
    // Menús y navegación
    title: "Menú",
    options: "Opciones",
    appearance: "Apariencia",
    language: "Idioma",
    theme: {
      // Tema claro/oscuro/sistema
      light: "Claro",
      dark: "Oscuro",
      system: "Sistema",
    },
  },
  shift: {
    // Turnos
    term: "Tramo",
    new: "Nuevo Tramo",
    current: "Tramo Actual",
    ofDate: "Tramo del {date}",
    ofLabel: "Tramo del {label}",
  },
  task: {
    assignee: {
      // Asignación de tareas
      add: "Asignar a…",
    },
    description: {
      // Descripciones de tareas (sin placeholder)
    },
    action: {
      // Acciones sobre tareas
      finish: "Finalizar",
      reopen: "Reabrir",
    },
    // Textos de fallback de tareas
    noDescription: "(Sin descripción)",
  },
  nav: {
    // Navegación
    shift: {
      // Acciones relacionadas con turnos en la navegación
      returnCurrent: "Volver al Tramo Actual",
    },
  },
  aria: {
    menu: {
      // Etiquetas accesibilidad menú
      open: "Abrir menú",
      close: "Cerrar menú",
    },
    toast: {
      // Etiquetas accesibilidad toasts
      close: "Cerrar notificación",
    },
    filter: {
      // Accesibilidad filtros (sr-only)
      activeOnly: "Mostrar solo tareas activas",
      unregisteredOnly: "Mostrar solo tareas sin registrar",
    },
    task: {
      // Accesibilidad en tareas
      state: "Estado de registro",
      delete: "Eliminar tarea",
    },
  },
  toast: {
    task: {
      // Toasts relacionados con tareas
      started: "Tarea iniciada",
      finished: "Tarea finalizada",
      finishedDetail: "«{description}» completada a las {endTime}",
      registered: "Tarea registrada",
      registeredDetail: "«{description}» marcada como registrada",
      unregistered: "Registro anulado",
      unregisteredDetail: "«{description}» ya no está registrada",
      updated: "Tarea actualizada",
      updatedDetail: "«{description}» actualizada",
      reopened: "Tarea reabierta",
      deleted: "Tarea eliminada",
      restored: "Tarea restaurada",
      notFound: "No se encontró la tarea con ID: {id}",
      reopenedDetail: "«{description}» reabierta",
      deletedDetail: "«{description}» eliminada",
      restoredDetail: "«{description}» restaurada",
      startedDetail: "«{description}» comenzada",
    },
    error: {
      // Errores generales
      update: "Error al actualizar",
    },
    action: {
      // Acciones de botones en toasts
      undo: "Deshacer",
      cancelled: "Acción cancelada",
      undone: "Acción deshecha",
      closeAll: "Cerrar todo",
      unknown: "Acción desconocida",
    },
    shift: {
      // Toasts relacionados con tramos
      cancelled: "Inicio de nuevo tramo cancelado por el usuario",
      started: "Nuevo tramo iniciado",
      rollback: "Se restauró el estado anterior al nuevo tramo",
      starting: "Iniciando nuevo tramo a las {time}",
      startedDetail: "Tramo comenzado a las {time}",
    },
    validation: {
      // Mensajes de validación
      required: "Campo requerido",
      description: "Introduce una descripción para la tarea",
    },
    import: {
      // Toasts relacionados con importación
      failed: "Importación fallida",
      noFile: "No se seleccionó ningún archivo",
      success: "Importación completada",
      error: "Error de importación",
      errorDetail: "Error al procesar el archivo: {errorMessage}",
      readError: "Error de lectura",
      readErrorDetail: "Ocurrió un problema al leer el archivo seleccionado",
      invalidList: "El archivo no contiene una lista válida de tareas",
      invalidTask: "Formato de tarea inválido. Faltan campos requeridos",
      count: "{count} tarea importada correctamente | {count} tareas importadas correctamente",
    },
    export: {
      // Toasts relacionados con exportación
      empty: "Exportación vacía",
      noTasks: "No hay tareas para exportar",
      success: "Tareas exportadas",
      error: "Error al exportar",
      errorDetail: "No se pudo generar el archivo",
      generatedFile: "Archivo «{fileName}» generado",
    },
    share: {
      // Toasts relacionados con compartir
      error: "Error al compartir",
      noShift: "No hay un tramo seleccionado o activo para compartir",
      empty: "Nada que compartir",
      success: "Tareas compartidas",
      detail: "Contenido enviado mediante sistema nativo",
      successFallback: "Tareas compartidas",
      detailFallback: "Contenido enviado a la aplicación de compartir",
      errorFallback: "Error al compartir",
      unsupported: "Tu navegador no soporta la función de compartir o copiar",
      readyFile: "Archivo «{fileName}» listo para compartir",
      noTasks: "No hay tareas en el {shift} para compartir",
    },
    clipboard: {
      // Toasts relacionados con portapapeles
      success: "Tareas copiadas",
      detail: "Contenido copiado al portapapeles",
    },
    deleteAll: {
      // Toasts relacionados con borrado masivo
      done: "Borrado completo",
      detail: "Todas las tareas y notas han sido eliminadas",
      restored: "Tareas restauradas",
      restoredDetail: "Todas las tareas han sido restauradas",
      cancelled: "El borrado de tareas fue cancelado",
    },
    load: {
      // Toasts relacionados con carga inicial
      error: "Error de carga",
      errorDetail: "No se pudieron cargar las tareas guardadas. Podrían estar corruptas",
    },
    demo: {
      // Toasts de demostración
      title: "Notificación de prueba",
      detail: "Esto es una prueba del sistema de toasts propio",
    },
    menu: {
      // Toasts relacionados con acciones de menú no implementadas
      unimplemented: "La acción de menú «{action}» no está implementada",
    },
  },
  dialog: {
    deleteAll: {
      // Diálogo de borrado total
      confirm: "¿Borrar todas las tareas de la aplicación? No podrán recuperarse",
    },
    task: {
      // Diálogo de borrado individual de tarea
      confirmDelete: "¿Seguro que quieres eliminar la tarea «{description}»?",
    },
    share: {
      // Diálogo de compartir
      title: "Compartir tareas",
      titleShift: "Notificaciones del {shift}",
      titleShiftFallback: "Notificaciones del {shift}",
    },
    export: {
      // Diálogo de exportación
      title: "Exportar tareas",
      message: "Archivo de tareas exportado desde Notifica",
    },
    shift: {
      // Diálogo al iniciar nuevo tramo
      confirmArchive: "Esto archivará las tareas actuales. ¿Deseas continuar?",
    },
  },
  filter: {
    // Filtros y estados de lista
    active: "Activas",
    unregistered: "Sin registrar",
  },
  tooltip: {
    task: {
      // Tooltips relacionados con tareas
      unregistered: "Marcar como no registrada",
      registered: "Marcar como registrada",
      delete: "Eliminar tarea",
    },
  },
  placeholder: {
    task: {
      // Placeholders para tareas
      description: "Descripción",
      assignee: "Asignado a…",
    },
    note: {
      // Placeholders para notas
      add: "Añadir nota…",
      // Usado en notas previas
      default: "Nota",
    },
  },
  header: {
    // Encabezados de secciones
    notes: "Notas",
  },
  title: {
    // Títulos de pantallas/secciones
    taskList: "Tramo del {shift}",
  },
  taskList: {
    // Textos de la lista de tareas
    viewingShift: "Viendo tramo",
    defaultTitle: "Lista de tareas",
  },
  empty: {
    // Mensajes cuando no hay tareas
    filters: "Prueba a desactivar los filtros",
    noTasksShift: "Este tramo no tiene tareas",
    startNew: "Empieza una nueva tarea para este tramo",
  },
  share: {
    content: {
      // Encabezados del contenido compartido
      headerTasks: "📋 Notificaciones del {shift}",
      headerNotes: "🗒️ Notas",
    },
  },
  export: {
    // Exportación de archivos
    filename: "notifica-backup-{date}.json",
  },
}
