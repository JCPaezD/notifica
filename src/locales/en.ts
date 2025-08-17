export default {
  btn: {
    // Botones y acciones cortas
    start: "Start",
    import: "Import",
    export: "Export",
    share: "Share",
    deleteAll: "Delete all",
  },
  menu: {
    // Menús y navegación
    title: "Menu",
    options: "Options",
    theme: {
      // Tema claro/oscuro/sistema
      light: "Light",
      dark: "Dark",
      system: "System",
    },
  },
  shift: {
    // Turnos
    term: "Segment",
    new: "New segment",
  },
  task: {
    assignee: {
      // Asignación de tareas
      add: "Assign to…",
    },
    description: {
      // Descripciones de tareas (sin placeholder)
    },
    action: {
      // Acciones sobre tareas
      finish: "Finish",
      reopen: "Reopen",
    },
    // Textos de fallback de tareas
    noDescription: "(No description)",
  },
  nav: {
    // Navegación
    shift: {
      // Acciones relacionadas con turnos en la navegación
      returnCurrent: "Return to current segment",
    },
  },
  aria: {
    menu: {
      // Etiquetas accesibilidad menú
      open: "Open menu",
      close: "Close menu",
    },
    toast: {
      // Etiquetas accesibilidad toasts
      close: "Close notification",
    },
    filter: {
      // Accesibilidad filtros (sr-only)
      activeOnly: "Show only active tasks",
      unregisteredOnly: "Show only unregistered tasks",
    },
    task: {
      // Accesibilidad en tareas
      state: "Registration status",
      delete: "Delete task",
    },
  },
  toast: {
    task: {
      // Toasts relacionados con tareas
      started: "Task started",
      finished: "Task finished",
      finishedDetail: "“{description}” completed at {endTime}",
      registered: "Task registered",
      registeredDetail: "“{description}” marked as registered",
      unregistered: "Registration cancelled",
      unregisteredDetail: "“{description}” is no longer registered",
      updated: "Task updated",
      updatedDetail: "“{description}” updated",
      reopened: "Task reopened",
      deleted: "Task deleted",
      restored: "Task restored",
      notFound: "Task with ID {id} not found",
      reopenedDetail: "“{description}” reopened",
      deletedDetail: "“{description}” deleted",
      restoredDetail: "“{description}” restored",
      startedDetail: "«{description}» started",
    },
    error: {
      // Errores generales
      update: "Error updating",
    },
    action: {
      // Acciones de botones en toasts
      undo: "Undo",
      cancelled: "Action cancelled",
      undone: "Action undone",
      closeAll: "Close all",
      unknown: "Unknown action",
    },
    shift: {
      // Toasts relacionados con tramos
      cancelled: "New segment start cancelled by user",
      started: "New segment started",
      rollback: "Previous state restored before the new segment",
      starting: "Starting new segment at {time}",
      startedDetail: "Segment started at {time}",
    },
    validation: {
      // Mensajes de validación
      required: "Field required",
      description: "Enter a description for the task",
    },
    import: {
      // Toasts relacionados con importación
      failed: "Import failed",
      noFile: "No file selected",
      success: "Import completed",
      error: "Import error",
      errorDetail: "Error processing file: {errorMessage}",
      readError: "Read error",
      readErrorDetail: "There was a problem reading the selected file",
      invalidList: "The file does not contain a valid list of tasks",
      invalidTask: "Invalid task format. Required fields are missing",
      count: "{count} task imported successfully | {count} tasks imported successfully",
    },
    export: {
      // Toasts relacionados con exportación
      empty: "Empty export",
      noTasks: "No tasks to export",
      success: "Tasks exported",
      error: "Export error",
      errorDetail: "Could not generate the file",
      generatedFile: "File “{fileName}” generated",
    },
    share: {
      // Toasts relacionados con compartir
      error: "Error sharing",
      noShift: "No active segment selected to share",
      empty: "Nothing to share",
      success: "Tasks shared",
      detail: "Content sent through native system",
      successFallback: "Tasks shared",
      detailFallback: "Content sent to the share application",
      errorFallback: "Error sharing",
      unsupported: "Your browser does not support share or copy function",
      readyFile: "File \"{fileName}\" ready to share",
      noTasks: "No tasks in {shift} to share",
    },
    clipboard: {
      // Toasts relacionados con portapapeles
      success: "Tasks copied",
      detail: "Content copied to clipboard",
    },
    deleteAll: {
      // Toasts relacionados con borrado masivo
      done: "Wipe complete",
      detail: "All tasks and notes have been deleted",
      restored: "Tasks restored",
      restoredDetail: "All tasks have been restored",
      cancelled: "Task deletion was cancelled",
    },
    load: {
      // Toasts relacionados con carga inicial
      error: "Load error",
      errorDetail: "Saved tasks could not be loaded. They may be corrupted",
    },
    demo: {
      // Toasts de demostración
      title: "Test notification",
      detail: "This is a test of the custom toast system",
    },
    menu: {
      // Toasts relacionados con acciones de menú no implementadas
      unimplemented: "Menu action \"{action}\" is not implemented",
    },
  },
  dialog: {
    deleteAll: {
      // Diálogo de borrado total
      confirm: "Delete all tasks in the app? They cannot be recovered",
    },
    share: {
      // Diálogo de compartir
      title: "Share tasks",
      titleShift: "Notifications for {shift}",
      titleShiftFallback: "Notifications for {shift}",
    },
    export: {
      // Diálogo de exportación
      title: "Export tasks",
      message: "Tasks file exported from Notifica",
    },
    shift: {
      // Diálogo al iniciar nuevo tramo
      confirmArchive: "This will archive the current tasks. Do you want to continue?",
    },
  },
  filter: {
    // Filtros y estados de lista
    active: "Active",
    unregistered: "Unregistered",
  },
  tooltip: {
    task: {
      // Tooltips relacionados con tareas
      unregistered: "Mark as unregistered",
      registered: "Mark as registered",
      delete: "Delete task",
    },
  },
  placeholder: {
    task: {
      // Placeholders para tareas
      description: "Description",
      assignee: "Assigned to…",
    },
    note: {
      // Placeholders para notas
      add: "Add note…",
      // Usado en notas previas
      default: "Note",
    },
  },
  header: {
    // Encabezados de secciones
    notes: "Notes",
  },
  title: {
    // Títulos de pantallas/secciones
    taskList: "Segment of {shift}",
  },
  taskList: {
    // Textos de la lista de tareas
    viewingShift: "Viewing segment",
  },
  share: {
    content: {
      // Encabezados del contenido compartido
      headerTasks: "📋 Notifications for {shift}",
      headerNotes: "🗒️ Notes",
    },
  },
  export: {
    // Exportación de archivos
    filename: "notifica-backup-{date}.json",
  },
}
