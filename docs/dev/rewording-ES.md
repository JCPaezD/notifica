# Rewording ES — Inventario inicial de textos UI

## Bloque 1 — Botones y labels cortos

| Texto actual | Ubicación | ES final | Clave i18n | Params | Plural | Notas |
|--------------|-----------|----------|------------|--------|--------|-------|
| Iniciar | src/components/NewTaskForm.vue:61 | Iniciar | btn.start | — | no | Botón inicio tarea |
| Opciones | src/components/SideMenu.vue:217 | Opciones | menu.options | — | no | Botón menú lateral (toggle/expand) |
| Claro | src/components/SideMenu.vue:249 | Claro | menu.theme.light | — | no | Tema claro |
| Oscuro | src/components/SideMenu.vue:265 | Oscuro | menu.theme.dark | — | no | Tema oscuro |
| Sistema | src/components/SideMenu.vue:281 | Sistema | menu.theme.system | — | no | Tema según sistema |
| Turno | src/components/ShiftSelector.vue:15 | Tramo | shift.term | — | no | Botón selector de tramo |
| Nuevo Turno | src/components/SideMenu.vue:152 | Nuevo Tramo | shift.new | — | no | Acción menú lateral |
| Importar | src/components/SideMenu.vue:184 | Importar | btn.import | — | no | Acción menú lateral |
| Exportar | src/components/SideMenu.vue:197 | Exportar | btn.export | — | no | Acción menú lateral |
| Compartir | src/components/SideMenu.vue:168 | Compartir | btn.share | — | no | Acción menú lateral |
| Borrar todo | src/components/SideMenu.vue:305 | Borrar todo | btn.deleteAll | — | no | Acción destructiva (menú) |
| Añadir técnico | src/components/TaskItem.vue:456 | Asignar a… | task.assignee.add | — | no | Placeholder cuando la tarea ya creada no tiene asignación |
| Nuevo aviso | src/components/NewTaskForm.vue:21 | Descripción | task.description.placeholder | — | no | Placeholder de descripción |
| Volver al Turno Actual | src/App.vue:967 | Volver al Tramo Actual | nav.shift.returnCurrent | — | no | Acción de navegación |
| Abrir menú | src/App.vue:890 | Abrir menú | a11y.menu.open | — | no | Accesibilidad (aria-label) |

## Bloque 2 — Filtros y estados

| Texto actual | Ubicación | ES final | Clave i18n | Params | Plural | Notas |
|--------------|-----------|----------|------------|--------|--------|-------|
| Mostrar solo tareas activas | src/components/TaskList.vue:142 | Mostrar solo tareas activas | a11y.filter.activeOnly | — | no | Accesibilidad (sr-only) |
| Mostrar solo tareas sin notificar | src/components/TaskList.vue:147 | Mostrar solo tareas sin registrar | a11y.filter.unregisteredOnly | — | no | Accesibilidad (sr-only) |
| Activas | src/components/TaskList.vue:118 | Activas | filter.active | — | no | Estado filtro |
| Sin Notificar | src/components/TaskList.vue:122 | Sin registrar | filter.unregistered | — | no | Estado filtro |
| Finalizar | src/components/TaskItem.vue:305 | Finalizar | task.action.finish | — | no | Acción sobre tarea |
| Reabrir | src/components/TaskItem.vue:314 | Reabrir | task.action.reopen | — | no | Acción sobre tarea |

## Bloque 3 — Mensajes de sistema / toasts

| Texto actual | Ubicación | ES final | Clave i18n | Params | Plural | Notas |
|--------------|-----------|----------|------------|--------|--------|-------|
| Campo Requerido | src/App.vue:74 | Campo requerido | toast.validation.required | — | no | Toast warning (validación) |
| Por favor, introduce una descripción para la tarea. | src/App.vue:75 | Introduce una descripción para la tarea | toast.validation.description | — | no | Toast warning (validación) |
| Tarea Iniciada | src/App.vue:99 | Tarea iniciada | toast.task.started | — | no | Toast success |
| Tarea Finalizada | src/App.vue:116 | Tarea finalizada | toast.task.finished | — | no | Toast success |
| "${task.description}" completada a las ${task.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. | src/App.vue:117 | «{description}» completada a las {endTime} | toast.task.finishedDetail | description, endTime | no | Descripción de toast de finalización |
| Tarea Notificada | src/App.vue:134 | Tarea registrada | toast.task.registered | — | no | Toast success |
| Notificación Anulada | src/App.vue:140 | Registro anulado | toast.task.unregistered | — | no | Toast info/warning |
| Tarea Actualizada | src/App.vue:146 | Tarea actualizada | toast.task.updated | — | no | Toast info |
| Error al Actualizar | src/App.vue:152 | Error al actualizar | toast.error.update | — | no | Toast error |
| Tarea Reactivada | src/App.vue:164 | Tarea reabierta | toast.task.reopened | — | no | Toast info |
| Tarea Eliminada | src/App.vue:182 | Tarea eliminada | toast.task.deleted | — | no | Toast error (destructiva) |
| Deshacer | src/App.vue:188 | Deshacer | toast.action.undo | — | no | Acción de toast (botón) |
| Tarea Restaurada | src/App.vue:203 | Tarea restaurada | toast.task.restored | — | no | Toast info |
| Acción Cancelada | src/App.vue:238 | Acción cancelada | toast.action.cancelled | — | no | Toast info/error |
| Inicio de nuevo turno cancelado por el usuario. | src/App.vue:239 | Inicio de nuevo tramo cancelado por el usuario | toast.shift.cancelled | — | no | Descripción de toast |
| Nuevo Turno Iniciado | src/App.vue:254 | Nuevo tramo iniciado | toast.shift.started | — | no | Toast success |
| Deshacer | src/App.vue:260 | Deshacer | toast.action.undo | — | no | Acción de toast (botón) |
| Acción Deshecha | src/App.vue:278 | Acción deshecha | toast.action.undone | — | no | Toast info |
| Se restauró el estado anterior al nuevo turno. | src/App.vue:279 | Se restauró el estado anterior al nuevo tramo | toast.shift.rollback | — | no | Descripción de toast |
| Exportación Vacía | src/App.vue:383 | Exportación vacía | toast.export.empty | — | no | Toast warning |
| No hay tareas para exportar. | src/App.vue:384 | No hay tareas para exportar | toast.export.noTasks | — | no | Descripción de toast |
| Exportar tareas | src/App.vue:418 | Exportar tareas | dialog.export.title | — | no | Título diálogo / OS share |
| Archivo de tareas exportado desde Notifica. | src/App.vue:419 | Archivo de tareas exportado desde Notifica | dialog.export.message | — | no | Texto de OS share |
| Tareas exportadas | src/App.vue:425 | Tareas exportadas | toast.export.success | — | no | Toast success (exportación) |
| Error al exportar | src/App.vue:431 | Error al exportar | toast.export.error | — | no | Toast error (exportación) |
| No se pudo generar el archivo. | src/App.vue:432 | No se pudo generar el archivo | toast.export.errorDetail | — | no | Descripción de toast |
| Importación Fallida | src/App.vue:459 | Importación fallida | toast.import.failed | — | no | Toast warning (importación) |
| No se seleccionó ningún archivo. | src/App.vue:460 | No se seleccionó ningún archivo | toast.import.noFile | — | no | Descripción de toast |
| Importación Exitosa | src/App.vue:531 | Importación completada | toast.import.success | — | no | Toast info (importación) |
| Error de Importación | src/App.vue:537 | Error de importación | toast.import.error | — | no | Toast error (importación) |
| Al procesar el archivo: ${error instanceof Error ? error.message : 'Error desconocido'} | src/App.vue:538 | Error al procesar el archivo: {errorMessage} | toast.import.errorDetail | errorMessage | no | Descripción de toast (dinámica) |
| Error de Lectura | src/App.vue:549 | Error de lectura | toast.import.readError | — | no | Toast error (importación) |
| Ocurrió un problema al leer el archivo seleccionado. | src/App.vue:550 | Ocurrió un problema al leer el archivo seleccionado | toast.import.readErrorDetail | — | no | Descripción de toast |
| ¿Estás seguro de que quieres borrar TODAS las tareas de la aplicación? No podrán ser recuperadas. | src/App.vue:561 | ¿Borrar todas las tareas de la aplicación? No podrán recuperarse | dialog.deleteAll.confirm | — | no | Confirm (diálogo nativo) |
| Borrado Completo | src/App.vue:570 | Borrado completo | toast.deleteAll.done | — | no | Toast error (destructiva) |
| Todas las tareas y notas han sido eliminadas. | src/App.vue:571 | Todas las tareas y notas han sido eliminadas | toast.deleteAll.detail | — | no | Descripción de toast |
| Deshacer | src/App.vue:576 | Deshacer | toast.action.undo | — | no | Acción de toast (botón) |
| Tareas Restauradas | src/App.vue:595 | Tareas restauradas | toast.deleteAll.restored | — | no | Toast info (rollback) |
| Todas las tareas han sido restauradas. | src/App.vue:596 | Todas las tareas han sido restauradas | toast.deleteAll.restoredDetail | — | no | Descripción de toast |
| Acción Cancelada | src/App.vue:608 | Acción cancelada | toast.action.cancelled | — | no | Toast info |
| El borrado de tareas fue cancelado. | src/App.vue:609 | El borrado de tareas fue cancelado | toast.deleteAll.cancelled | — | no | Descripción de toast |
| Error de Carga | src/App.vue:640 | Error de carga | toast.load.error | — | no | Toast error (carga inicial) |
| No se pudieron cargar las tareas guardadas. Podrían estar corruptas. | src/App.vue:641 | No se pudieron cargar las tareas guardadas. Podrían estar corruptas | toast.load.errorDetail | — | no | Descripción de toast |
| Notificación de prueba | src/App.vue:649 | Notificación de prueba | toast.demo.title | — | no | Toast demo |
| Esto es una prueba del sistema de toasts propio. | src/App.vue:650 | Esto es una prueba del sistema de toasts propio | toast.demo.detail | — | no | Descripción de toast |
| Cerrar Todo | src/App.vue:653 | Cerrar todo | toast.action.closeAll | — | no | Acción de toast (botón) |
| Error al Compartir | src/App.vue:751 | Error al compartir | toast.share.error | — | no | Toast error (share) |
| No hay un turno seleccionado o activo para compartir. | src/App.vue:752 | No hay un tramo seleccionado o activo para compartir | toast.share.noShift | — | no | Descripción de toast |
| Nada que Compartir | src/App.vue:764 | Nada que compartir | toast.share.empty | — | no | Toast warning (share) |
| Compartir Tareas | src/App.vue:790 | Compartir tareas | dialog.share.title | — | no | Título diálogo OS share |
| Tareas Compartidas | src/App.vue:793 | Tareas compartidas | toast.share.success | — | no | Toast info (share) |
| Contenido enviado mediante sistema nativo. | src/App.vue:794 | Contenido enviado mediante sistema nativo | toast.share.detail | — | no | Descripción de toast |
| Tareas Compartidas | src/App.vue:810 | Tareas compartidas | toast.share.successFallback | — | no | Toast info (share fallback) |
| Contenido enviado a la aplicación de compartir. | src/App.vue:811 | Contenido enviado a la aplicación de compartir | toast.share.detailFallback | — | no | Descripción de toast |
| Tareas Copiadas | src/App.vue:817 | Tareas copiadas | toast.clipboard.success | — | no | Toast info (clipboard) |
| Contenido copiado al portapapeles. | src/App.vue:818 | Contenido copiado al portapapeles | toast.clipboard.detail | — | no | Descripción de toast |
| Error al Compartir | src/App.vue:823 | Error al compartir | toast.share.errorFallback | — | no | Toast error (share fallback) |
| Tu navegador no soporta la función de compartir o copiar. | src/App.vue:824 | Tu navegador no soporta la función de compartir o copiar | toast.share.unsupported | — | no | Descripción de toast |
| Acción Desconocida | src/App.vue:868 | Acción desconocida | toast.action.unknown | — | no | Toast warning |
| "${updatedTask.description}" marcada como notificada. | src/App.vue:135 | «{description}» marcada como registrada | toast.task.registeredDetail | description | no | Toast success (estado) |
| "${updatedTask.description}" ya no está notificada. | src/App.vue:141 | «{description}» ya no está registrada | toast.task.unregisteredDetail | description | no | Toast info (estado) |
| "${updatedTask.description}" ha sido actualizada. | src/App.vue:147 | «{description}» actualizada | toast.task.updatedDetail | description | no | Toast info (update) |

| No se encontró la tarea con ID: ${updatedTask.id}. | src/App.vue:153 | No se encontró la tarea con ID: {id} | toast.task.notFound | id | no | Toast error (not found) |
| "${task.description}" ha sido reabierta. | src/App.vue:165 | «{description}» reabierta | toast.task.reopenedDetail | description | no | Toast info (reabrir) |
| "${taskToDelete.description}" ha sido eliminada. | src/App.vue:183 | «{description}» eliminada | toast.task.deletedDetail | description | no | Toast error (delete) |
| "${taskToDelete.description}" ha sido restaurada. | src/App.vue:204 | «{description}» restaurada | toast.task.restoredDetail | description | no | Toast info (restore) |
| Iniciando nuevo turno a las ${shiftStartTimeFormatted}. | src/App.vue:233 | Iniciando nuevo tramo a las {time} | toast.shift.starting | time | no | Confirm (línea 1) |
| Esto archivará las tareas actuales. ¿Desea continuar? | src/App.vue:234 | Esto archivará las tareas actuales. ¿Deseas continuar? | dialog.shift.confirmArchive | — | no | Confirm (línea 2) |
| Turno comenzado a las ${shiftStartTimeFormatted}. | src/App.vue:255 | Tramo comenzado a las {time} | toast.shift.startedDetail | time | no | Toast success (tramo) |
| Archivo "${fileName}" listo para compartir. | src/App.vue:426 | Archivo «{fileName}» listo para compartir | toast.share.readyFile | fileName | no | Toast info (share) |
| Archivo "${fileName}" generado. | src/App.vue:444 | Archivo «{fileName}» generado | toast.export.generatedFile | fileName | no | Toast success (export) |
| El archivo no contiene una lista válida de tareas. | src/App.vue:480 | El archivo no contiene una lista válida de tareas | toast.import.invalidList | — | no | Error message (propaga a toast) |
| Formato de tarea inválido. Faltan campos requeridos. | src/App.vue:493 | Formato de tarea inválido. Faltan campos requeridos | toast.import.invalidTask | — | no | Error message (propaga a toast) |
| ${validatedTasks.length} tareas importadas correctamente. | src/App.vue:532 | {count} tarea importada correctamente \| {count} tareas importadas correctamente | toast.import.count | count | sí | Toast info (importación múltiple) |
| No hay tareas en el ${shiftLabel} para compartir. | src/App.vue:765 | No hay tareas en el {shift} para compartir | toast.share.noTasks | shift | no | Toast info (share) |
| _*📋 Notificaciones del ${shiftLabel}*:_ | src/App.vue:771 | 📋 Notificaciones del {shift} | share.content.headerTasks | shift | no | Título (contenido de compartir) |
| _*🗒️ Notas*:_ | src/App.vue:778 | 🗒️ Notas | share.content.headerNotes | — | no | Encabezado bloque notas (share) |
| Notificaciones del ${shiftLabel} | src/App.vue:788 | Notificaciones del {shift} | dialog.share.titleShift | shift | no | Título diálogo OS share |
| Notificaciones del ${shiftLabel} | src/App.vue:806 | Notificaciones del {shift} | dialog.share.titleShiftFallback | shift | no | Título diálogo OS share (fallback) |
| La acción de menú "${actionName}" no está implementada. | src/App.vue:869 | La acción de menú «{action}» no está implementada | toast.menu.unimplemented | action | no | Toast warning |



## Bloque 4 — Textos largos / encabezados / placeholders

| Texto actual | Ubicación | ES final | Clave i18n | Params | Plural | Notas |
|--------------|-----------|----------|------------|--------|--------|-------|
| Notas del turno | src/components/TaskList.vue:315 | Notas | header.notes | — | no | Encabezado sección |
| Nuevo aviso | src/components/NewTaskForm.vue:21 | Descripción | placeholder.task.description | — | no | Placeholder input |
| Técnico(s) | src/components/NewTaskForm.vue:37 | Asignado a… | placeholder.task.assignee | — | no | Placeholder input |
| [Sin descripción] | src/components/TaskItem.vue:341 | (Sin descripción) | task.noDescription | — | no | Fallback descripción vacía |
| Añadir nota… | src/components/TaskList.vue:378 | Añadir nota… | placeholder.note.add | — | no | Placeholder dinámico (última nota) |
| Nota | src/components/TaskList.vue:378 | Nota | placeholder.note | — | no | Placeholder dinámico (notas previas) |


## Bloque 5 — Otros (branding / textos residuales)

| Texto actual | Ubicación | ES final | Clave i18n | Params | Plural | Notas |
|--------------|-----------|----------|------------|--------|--------|-------|
| Notifica | src/App.vue:?? | Notifica | — | — | no | Nombre de la aplicación (branding, no se traduce, queda fuera del sistema i18n) |
| notifica-tareas | src/App.vue:390 | notifica-backup-{date}.json | export.filename | date | no | Prefijo nombre de archivo exportado |


## Bloque 6 — Accesibilidad (aria-label / alt / title)

| Texto actual | Ubicación | ES final | Clave i18n | Params | Plural | Notas |
|--------------|-----------|----------|------------|--------|--------|-------|
| Abrir menú | src/App.vue:890 | Abrir menú | aria.menu.open | — | no | aria-label (botón menú) |
| Cerrar menú | src/components/SideMenu.vue:131 | Cerrar menú | aria.menu.close | — | no | aria-label |
| Estado de notificación | src/components/TaskItem.vue:488 | Estado de registro | aria.task.state | — | no | aria-label |
| Eliminar tarea | src/components/TaskItem.vue:519 | Eliminar tarea | aria.task.delete | — | no | aria-label |
| Cerrar notificación | src/components/Toast.vue:62 | Cerrar notificación | aria.toast.close | — | no | aria-label (accesibilidad) |
| Marcar como No Notificado | src/components/TaskItem.vue:486 | Marcar como no registrada | tooltip.task.unregistered | — | no | title (tooltip) |
| Marcar como Notificado | src/components/TaskItem.vue:486 | Marcar como registrada | tooltip.task.registered | — | no | title (tooltip) |
| Eliminar Tarea | src/components/TaskItem.vue:517 | Eliminar tarea | tooltip.task.delete | — | no | title (tooltip) |
| listTitle (dinámico) | src/App.vue:361 | Tramo del {shift} | title.taskList | shift | no | title dinámico, usa getShiftLabel(selectedShiftToView) |
