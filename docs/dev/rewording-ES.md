# Rewording ES — Inventario inicial de textos UI

## Bloque 1 — Botones y labels cortos

| Texto actual | Ubicación | Propuesta alternativa | Notas |
|--------------|-----------|-----------------------|-------|
| Iniciar | src/components/NewTaskForm.vue:61 |  | Botón inicio tarea |
| Opciones | src/components/SideMenu.vue:217 |  | Botón menú lateral |
| Claro | src/components/SideMenu.vue:249 |  | Botón modo claro |
| Oscuro | src/components/SideMenu.vue:265 |  | Botón modo oscuro |
| Sistema | src/components/SideMenu.vue:281 |  | Botón modo sistema |
| Turno | src/components/ShiftSelector.vue:15 |  | Botón selector de turno |
| Nuevo Turno | src/components/SideMenu.vue:152 |  | Acción menú lateral |
| Importar | src/components/SideMenu.vue:184 |  | Acción menú lateral |
| Exportar | src/components/SideMenu.vue:197 |  | Acción menú lateral |
| Compartir | src/components/SideMenu.vue:168 |  | Acción menú lateral |
| Borrar todo | src/components/SideMenu.vue:305 |  | Acción destructiva (menú) |
| Añadir técnico | src/components/TaskItem.vue:456 |  | Placeholder cuando no hay tech |
| Nuevo aviso | src/components/NewTaskForm.vue:21 |  | Placeholder de descripción |
| Volver al Turno Actual | src/App.vue:967 |  | Acción navegación |
| Abrir menú | src/App.vue:890 |  | Accesibilidad (aria-label) |


## Bloque 2 — Filtros y estados

| Texto actual | Ubicación | Propuesta alternativa | Notas |
|--------------|-----------|-----------------------|-------|
| Mostrar solo tareas activas | src/components/TaskList.vue:142 |  | Accesibilidad (sr-only) |
| Mostrar solo tareas sin notificar | src/components/TaskList.vue:147 |  | Accesibilidad (sr-only) |
| Activas | src/components/TaskList.vue:118 |  | Estado filtro |
| Sin Notificar | src/components/TaskList.vue:122 |  | Estado filtro |
| Finalizar | src/components/TaskItem.vue:305 |  | Acción sobre tarea |
| Reabrir | src/components/TaskItem.vue:314 |  | Acción sobre tarea |

## Bloque 3 — Mensajes de sistema / toasts

| Texto actual | Ubicación | Propuesta alternativa | Notas |
|--------------|-----------|-----------------------|-------|
| Campo Requerido | src/App.vue:74 |  | Toast warning (validación) |
| Por favor, introduce una descripción para la tarea. | src/App.vue:75 |  | Toast warning (validación) |
| Tarea Iniciada | src/App.vue:99 |  | Toast success |
| Tarea Finalizada | src/App.vue:116 |  | Toast success |
| "${task.description}" completada a las ${task.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. | src/App.vue:117 |  | Descripción de toast de finalización |
| Tarea Notificada | src/App.vue:134 |  | Toast success |
| Notificación Anulada | src/App.vue:140 |  | Toast info/warning |
| Tarea Actualizada | src/App.vue:146 |  | Toast info |
| Error al Actualizar | src/App.vue:152 |  | Toast error |
| Tarea Reactivada | src/App.vue:164 |  | Toast warning/info |
| Tarea Eliminada | src/App.vue:182 |  | Toast error (destructiva) |
| Deshacer | src/App.vue:188 |  | Acción de toast (botón) |
| Tarea Restaurada | src/App.vue:203 |  | Toast info |
| Acción Cancelada | src/App.vue:238 |  | Toast info/error |
| Inicio de nuevo turno cancelado por el usuario. | src/App.vue:239 |  | Descripción de toast |
| Nuevo Turno Iniciado | src/App.vue:254 |  | Toast success |
| Deshacer | src/App.vue:260 |  | Acción de toast (botón) |
| Acción Deshecha | src/App.vue:278 |  | Toast info |
| Se restauró el estado anterior al nuevo turno. | src/App.vue:279 |  | Descripción de toast |
| Exportación Vacía | src/App.vue:383 |  | Toast warning |
| No hay tareas para exportar. | src/App.vue:384 |  | Descripción de toast |
| Exportar tareas | src/App.vue:418 |  | Título (diálogo/OS share) |
| Archivo de tareas exportado desde Notifica. | src/App.vue:419 |  | Texto de OS share |
| Tareas exportadas | src/App.vue:425 |  | Toast success (exportación) |
| Error al exportar | src/App.vue:431 |  | Toast error (exportación) |
| No se pudo generar el archivo. | src/App.vue:432 |  | Descripción de toast |
| Importación Fallida | src/App.vue:459 |  | Toast warning (importación) |
| No se seleccionó ningún archivo. | src/App.vue:460 |  | Descripción de toast |
| Importación Exitosa | src/App.vue:531 |  | Toast info (importación) |
| Error de Importación | src/App.vue:537 |  | Toast error (importación) |
| Al procesar el archivo: ${error instanceof Error ? error.message : 'Error desconocido'} | src/App.vue:538 |  | Descripción de toast |
| Error de Lectura | src/App.vue:549 |  | Toast error (importación) |
| Ocurrió un problema al leer el archivo seleccionado. | src/App.vue:550 |  | Descripción de toast |
| ¿Estás seguro de que quieres borrar TODAS las tareas de la aplicación? No podrán ser recuperadas. | src/App.vue:561 |  | Confirm (diálogo nativo) |
| Borrado Completo | src/App.vue:570 |  | Toast error (destructiva) |
| Todas las tareas y notas han sido eliminadas. | src/App.vue:571 |  | Descripción de toast |
| Deshacer | src/App.vue:576 |  | Acción de toast (botón) |
| Tareas Restauradas | src/App.vue:595 |  | Toast info (rollback) |
| Todas las tareas han sido restauradas. | src/App.vue:596 |  | Descripción de toast |
| Acción Cancelada | src/App.vue:608 |  | Toast info |
| El borrado de tareas fue cancelado. | src/App.vue:609 |  | Descripción de toast |
| Error de Carga | src/App.vue:640 |  | Toast error (carga inicial) |
| No se pudieron cargar las tareas guardadas. Podrían estar corruptas. | src/App.vue:641 |  | Descripción de toast |
| Notificación de prueba | src/App.vue:649 |  | Toast demo |
| Esto es una prueba del sistema de toasts propio. | src/App.vue:650 |  | Descripción de toast |
| Cerrar Todo | src/App.vue:653 |  | Acción de toast (botón) |
| Error al Compartir | src/App.vue:751 |  | Toast error (share) |
| No hay un turno seleccionado o activo para compartir. | src/App.vue:752 |  | Descripción de toast |
| Nada que Compartir | src/App.vue:764 |  | Toast warning (share) |
| Compartir Tareas | src/App.vue:790 |  | Título diálogo OS share |
| Tareas Compartidas | src/App.vue:793 |  | Toast info (share) |
| Contenido enviado mediante sistema nativo. | src/App.vue:794 |  | Descripción de toast |
| Tareas Compartidas | src/App.vue:810 |  | Toast info (share fallback) |
| Contenido enviado a la aplicación de compartir. | src/App.vue:811 |  | Descripción de toast |
| Tareas Copiadas | src/App.vue:817 |  | Toast info (clipboard) |
| Contenido copiado al portapapeles. | src/App.vue:818 |  | Descripción de toast |
| Error al Compartir | src/App.vue:823 |  | Toast error (share fallback) |
| Tu navegador no soporta la función de compartir o copiar. | src/App.vue:824 |  | Descripción de toast |
| Acción Desconocida | src/App.vue:868 |  | Toast warning |
| "${updatedTask.description}" marcada como notificada. | src/App.vue:135 |  | Toast success (estado) |
| "${updatedTask.description}" ya no está notificada. | src/App.vue:141 |  | Toast info (estado) |
| "${updatedTask.description}" ha sido actualizada. | src/App.vue:147 |  | Toast info (update) |
| No se encontró la tarea con ID: ${updatedTask.id}. | src/App.vue:153 |  | Toast error (not found) |
| "${task.description}" ha sido reabierta. | src/App.vue:165 |  | Toast info (reabrir) |
| "${taskToDelete.description}" ha sido eliminada. | src/App.vue:183 |  | Toast error (delete) |
| "${taskToDelete.description}" ha sido restaurada. | src/App.vue:204 |  | Toast info (restore) |
| Iniciando nuevo turno a las ${shiftStartTimeFormatted}. | src/App.vue:233 |  | Confirm (línea 1) |
| Esto archivará las tareas actuales. ¿Desea continuar? | src/App.vue:234 |  | Confirm (línea 2) |
| Turno comenzado a las ${shiftStartTimeFormatted}. | src/App.vue:255 |  | Toast success (turno) |
| Archivo "${fileName}" listo para compartir. | src/App.vue:426 |  | Toast info (share) |
| Archivo "${fileName}" generado. | src/App.vue:444 |  | Toast success (export) |
| "${updatedTask.description}" marcada como notificada. | src/App.vue:135 |  | Toast success (estado) |
| "${updatedTask.description}" ya no está notificada. | src/App.vue:141 |  | Toast info (estado) |
| "${updatedTask.description}" ha sido actualizada. | src/App.vue:147 |  | Toast info (update) |
| No se encontró la tarea con ID: ${updatedTask.id}. | src/App.vue:153 |  | Toast error (not found) |
| "${task.description}" ha sido reabierta. | src/App.vue:165 |  | Toast info (reabrir) |
| "${taskToDelete.description}" ha sido eliminada. | src/App.vue:183 |  | Toast error (delete) |
| "${taskToDelete.description}" ha sido restaurada. | src/App.vue:204 |  | Toast info (restore) |
| Iniciando nuevo turno a las ${shiftStartTimeFormatted}. | src/App.vue:233 |  | Confirm (línea 1) |
| Esto archivará las tareas actuales. ¿Desea continuar? | src/App.vue:234 |  | Confirm (línea 2) |
| Turno comenzado a las ${shiftStartTimeFormatted}. | src/App.vue:255 |  | Toast success (turno) |
| El archivo no contiene una lista válida de tareas. | src/App.vue:480 |  | Error message (propaga a toast) |
| Formato de tarea inválido. Faltan campos requeridos. | src/App.vue:493 |  | Error message (propaga a toast) |
| ${validatedTasks.length} tareas importadas correctamente. | src/App.vue:532 |  | Toast info (importación) |
| No hay tareas en el ${shiftLabel} para compartir. | src/App.vue:765 |  | Toast info (share) |
| _*📋 Notificaciones del ${shiftLabel}*:_ | src/App.vue:771 |  | Título (contenido de compartir) |
| _*🗒️ Notas*:_ | src/App.vue:778 |  | Encabezado bloque notas (share) |
| Notificaciones del ${shiftLabel} | src/App.vue:788 |  | Título diálogo OS share |
| Notificaciones del ${shiftLabel} | src/App.vue:806 |  | Título diálogo OS share (fallback) |
| La acción de menú "${actionName}" no está implementada. | src/App.vue:869 |  | Toast warning |



## Bloque 4 — Textos largos / encabezados / placeholders

| Texto actual | Ubicación | Propuesta alternativa | Notas |
|--------------|-----------|-----------------------|-------|
| Notas del turno | src/components/TaskList.vue:315 |  | Encabezado sección |
| Nuevo aviso | src/components/NewTaskForm.vue:21 |  | Placeholder input |
| Técnico(s) | src/components/NewTaskForm.vue:37 |  | Placeholder input |
| [Sin descripción] | src/components/TaskItem.vue:341 |  | Fallback descripción vacía |
| Añadir nota… | src/components/TaskList.vue:378 |  | Placeholder dinámico (última nota) |
| Nota | src/components/TaskList.vue:378 |  | Placeholder dinámico (notas previas) |


## Bloque 5 — Otros (branding / textos residuales)

| Texto actual | Ubicación | Propuesta alternativa | Notas |
|--------------|-----------|-----------------------|-------|
| Notifica | src/App.vue:?? |  | Nombre de la aplicación (branding, no se traduce) |
| notifica-tareas | src/App.vue:390 |  | Prefijo nombre de archivo exportado (sí se traduce) |


## Bloque 6 — Accesibilidad (aria-label / alt / title)

| Texto actual | Ubicación | Propuesta alternativa | Notas |
|--------------|-----------|-----------------------|-------|
| Abrir menú | src/App.vue:890 |  | aria-label (botón menú) |
| Cerrar menú | src/components/SideMenu.vue:131 |  | aria-label |
| Estado de notificación | src/components/TaskItem.vue:488 |  | aria-label |
| Eliminar tarea | src/components/TaskItem.vue:519 |  | aria-label |
| Cerrar notificación | src/components/Toast.vue:62 |  | aria-label |
| Marcar como No Notificado | src/components/TaskItem.vue:486 |  | title (tooltip) |
| Marcar como Notificado | src/components/TaskItem.vue:486 |  | title (tooltip) |
| Eliminar Tarea | src/components/TaskItem.vue:517 |  | title (tooltip) |
| listTitle (dinámico) | src/App.vue:361 |  | title usa getShiftLabel(selectedShiftToView) → “Turno del …” (ver Bloque 3) |
