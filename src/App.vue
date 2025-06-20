<script setup lang="ts">
// src/App.vue
// Componente principal de la aplicación Notifica. Gestiona el estado global, la lógica de negocio y la renderización de los componentes UI.
import { ref, computed, onMounted, watch, nextTick, onUnmounted } from 'vue' // Añadido onUnmounted
import TaskList from './components/TaskList.vue' // Importar el nuevo componente
import SideMenu from './components/SideMenu.vue' // Importar el menú lateral
import { Toaster } from 'vue-sonner'
import { useNotifications } from './composables/useNotifications'
import type { Task } from './types/Task' // Importar la interfaz Task compartida

// --- Estado para la creación de nuevas tareas ---
const newTaskDescription = ref('')
const newTaskTechnician = ref('')
const descriptionTextareaRef = ref<HTMLTextAreaElement | null>(null) // Ref para el textarea de descripción
const fileImportInputRef = ref<HTMLInputElement | null>(null) // Ref para el input de importación de archivos

// --- Estado principal de las tareas ---
const allTasks = ref<Task[]>([]) // Almacena todas las tareas de la aplicación.

// --- Estados para los filtros de visualización de tareas ---
const showOnlyActive = ref(false) // Toggle: Mostrar solo activas
const showOnlyNotNotified = ref(false) // Toggle: Mostrar solo sin notificar

// --- Claves para LocalStorage ---
const LOCAL_STORAGE_KEY = 'notifica-tasks'
const CURRENT_SHIFT_ID_KEY = 'notifica-current-shift-id'

// --- Gestión de Turnos ---
const currentShiftId = ref<string | null>(null) // ID del turno actualmente activo.
const selectedShiftToView = ref<string | 'current'>('current') // Turno seleccionado para visualización ('current' o un shiftId).
const isShiftDropdownOpen = ref(false) // Controla la visibilidad del dropdown de selección de turno.

const shiftDropdownButtonRef = ref<HTMLButtonElement | null>(null) // Ref para el botón del dropdown de turnos.
const shiftDropdownMenuRef = ref<HTMLDivElement | null>(null) // Ref para el menú del dropdown de turnos.

// --- Estado para el menú lateral ---
const isSideMenuOpen = ref(false) // Controla la visibilidad del menú lateral.
const taskListKey = ref(0); // Key para forzar la re-renderización de TaskList, útil tras ciertas operaciones.

// --- Composables ---
const { notifySuccess, notifyError, notifyInfo, notifyWarning, dismissToast } = useNotifications()

// Crea y añade una nueva tarea a la lista.
const startNewTask = () => {
  if (newTaskDescription.value.trim() === '') {
    notifyWarning('Campo Requerido', 'Por favor, introduce una descripción para la tarea.')
    return
  }

  if (!currentShiftId.value) {
    // Inicia un nuevo turno automáticamente si no hay uno activo, sin alerta.
    startNewShift(false); // Iniciar un nuevo turno automáticamente si no hay uno activo, sin alerta
  }

  const newTask: Task = {
    id: Date.now().toString(), // ID simple basado en el timestamp
    description: newTaskDescription.value,
    startTime: new Date(),
    technician: newTaskTechnician.value.trim() || undefined, // Añadir técnico, o undefined si está vacío
    isNotified: false, // Inicializar isNotified como false por defecto
    shiftId: currentShiftId.value || undefined, // Asignar el ID del turno actual
  }

  allTasks.value.push(newTask)
  newTaskDescription.value = '' // Limpiar el campo después de iniciar
  newTaskTechnician.value = '' // Limpiar el campo del técnico
  notifySuccess('Tarea Iniciada', `"${newTask.description}" comenzada.`);

  // Quitar el foco del elemento activo para cerrar el teclado en móviles
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}

// Marca una tarea como finalizada, estableciendo su hora de finalización.
const finishTask = (taskId: string) => {
  const task = allTasks.value.find(t => t.id === taskId)
  if (task) {
    task.endTime = new Date()
    notifySuccess('Tarea Finalizada', `"${task.description}" completada a las ${task.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`);
  }
}

// Actualiza los datos de una tarea existente.
const updateTask = (updatedTask: Task) => {
  const taskIndex = allTasks.value.findIndex(t => t.id === updatedTask.id)
  if (taskIndex !== -1) {
    const oldIsNotifiedState = allTasks.value[taskIndex].isNotified; // Guardar el estado anterior
    allTasks.value[taskIndex] = updatedTask

    // Comprobar si el estado de notificación cambió
    if (oldIsNotifiedState !== updatedTask.isNotified) {
      if (updatedTask.isNotified) {
        notifySuccess('Tarea Notificada', `"${updatedTask.description}" marcada como notificada.`);
      } else {
        notifyInfo('Notificación Anulada', `"${updatedTask.description}" ya no está notificada.`);
      }
    } else if (oldIsNotifiedState === updatedTask.isNotified) { // Si no cambió el estado de notificación, pero otros campos sí
      notifyInfo('Tarea Actualizada', `"${updatedTask.description}" ha sido actualizada.`);
    }
  } else {
    notifyError('Error al Actualizar', `No se encontró la tarea con ID: ${updatedTask.id}.`);
  }
}

// Reactiva una tarea que había sido finalizada, eliminando su hora de finalización.
const reactivateTask = (taskId: string) => {
  const task = allTasks.value.find(t => t.id === taskId)
  if (task) {
    delete task.endTime
    notifyWarning('Tarea Reactivada', `"${task.description}" ha sido reabierta.`);
  }
}

// Elimina una tarea de la lista, con opción de deshacer la acción.
const deleteTask = (taskId: string) => {
  const taskIndex = allTasks.value.findIndex(t => t.id === taskId);
  if (taskIndex !== -1) {
    const taskToDelete = { ...allTasks.value[taskIndex] }; // Guardar una copia completa de la tarea

    // Eliminar la tarea de la lista principal síncronamente
    allTasks.value.splice(taskIndex, 1);

    // Mostrar toast con opción de Deshacer usando nuestro composable
    // Originalmente era notifyWarning, lo cambiamos a notifyError para el color rojo
    // y añadimos className para el estilo del botón de deshacer.
    const toastId = notifyError( // Cambiado de notifyWarning a notifyError
      'Tarea Eliminada',
      `"${taskToDelete.description}" ha sido eliminada.`,
      {
        action: {
          label: 'Deshacer',
          onClick: () => {
            // Restaurar la tarea en su posición original
            allTasks.value.splice(taskIndex, 0, taskToDelete);
            notifyInfo('Tarea Restaurada', `"${taskToDelete.description}" ha sido restaurada.`);
            dismissToast(toastId); // Cerrar el toast de "Deshacer"
          },
        },
        // Se eliminan las props id, className y classNames ya que no se usará un icono SVG.
        // id: 'undo-delete-task-toast', // Comentado o eliminado
        // className: 'toast-with-undo-action', // Comentado o eliminado
        duration: 7000, // Asegurar duración larga para el toast con "Deshacer"
      }
    );
  }
}

// Inicia un nuevo turno. Archiva las tareas del turno anterior y establece un nuevo ID de turno.
const startNewShift = (showAlert = true) => {
  const shiftStartTimeFormatted = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // Guardar estado anterior para posible Deshacer
  const previousCurrentShiftId = currentShiftId.value;
  const previousSelectedShiftToView = selectedShiftToView.value;

  if (showAlert) {
    const confirmed = window.confirm(
      `Iniciando nuevo turno a las ${shiftStartTimeFormatted}. \n\n` +
      `Esto archivará las tareas actuales. ¿Desea continuar?`
    );
    if (!confirmed) {
      notifyInfo('Acción Cancelada', 'Inicio de nuevo turno cancelado por el usuario.');
      return;
    }
  }
  const newShiftId = `shift-${Date.now()}`; 
  
  currentShiftId.value = newShiftId;
  selectedShiftToView.value = 'current'; 

  const toastId = notifySuccess(
    'Nuevo Turno Iniciado', 
    `Turno comenzado a las ${shiftStartTimeFormatted}.`,
    {
      action: {
        label: 'Deshacer',
        onClick: async () => {
          // Restaurar el estado anterior del turno
          currentShiftId.value = previousCurrentShiftId;
          selectedShiftToView.value = previousSelectedShiftToView;

          // Eliminar tareas que se hayan podido crear en el newShiftId que se está deshaciendo
          allTasks.value = allTasks.value.filter(task => task.shiftId !== newShiftId);

          await nextTick(); // Esperar a que la UI se actualice
          notifyInfo('Acción Deshecha', 'Se restauró el estado anterior al nuevo turno.');
          dismissToast(toastId);
        }
      },
      duration: 7000, // 7 segundos para reaccionar
    }
  );
};

// Propiedad computada: Filtra y ordena las tareas a mostrar según el turno seleccionado y los filtros activos.
const filteredAndSortedTasks = computed(() => {
  let tasksToDisplay = [...allTasks.value];
  let targetShiftId: string | null | undefined = undefined;

  if (selectedShiftToView.value === 'current') {
    targetShiftId = currentShiftId.value;
  } else {
    targetShiftId = selectedShiftToView.value; // Es un shiftId específico
  }

  if (targetShiftId) {
    tasksToDisplay = tasksToDisplay.filter(task => task.shiftId === targetShiftId);
  } else if (selectedShiftToView.value === 'current' && !currentShiftId.value) {
    // Viendo "actual" pero no hay turno activo (ej. inicio limpio), mostrar tareas sin shiftId (antiguas o ninguna)
    tasksToDisplay = tasksToDisplay.filter(task => !task.shiftId);
  }
  // Si selectedShiftToView.value es un ID de un turno que ya no tiene tareas (porque se borraron todas),
  // tasksToDisplay quedará vacío, lo cual es correcto.

  if (showOnlyActive.value) {
    tasksToDisplay = tasksToDisplay.filter(task => !task.endTime)
  }
  if (showOnlyNotNotified.value) {
    tasksToDisplay = tasksToDisplay.filter(task => !task.isNotified)
  }

  // Ordenar por hora de inicio (más antiguas primero, para un flujo cronológico)
  return tasksToDisplay.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
});

// Propiedad computada: Genera una lista de turnos disponibles basados en los `shiftId` de las tareas.
const availableShifts = computed(() => {
  const shiftIds = new Set<string>();
  allTasks.value.forEach(task => {
    if (task.shiftId) {
      shiftIds.add(task.shiftId);
    }
  });

  return Array.from(shiftIds)
    .map(id => {
      const timestamp = parseInt(id.replace('shift-', ''));
      if (isNaN(timestamp)) return { id, label: id, date: new Date(0) }; // Fallback
      const date = new Date(timestamp);
      return {
        id,
        label: `${date.toLocaleDateString([], {day: '2-digit', month: '2-digit', year: '2-digit'})} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        date: date
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime()); // Turnos más nuevos primero en el dropdown
});

// Propiedad computada: Determina el título a mostrar encima de la lista de tareas.
const listTitle = computed(() => {
  if (selectedShiftToView.value === 'current') {
    if (currentShiftId.value) {
      return ''; // No se muestra título para el turno actual activo.
    }
    return ''; // No se muestra título si no hay turno activo y se está viendo "actual".
  }
  const selectedShift = availableShifts.value.find(s => s.id === selectedShiftToView.value);
  // Muestra el título del turno anterior que se está viendo.
  return selectedShift ? `Viendo Turno: ${selectedShift.label}` : '';
});

// Exporta todas las tareas actuales a un archivo JSON.
const exportTasksToJson = () => {
  if (allTasks.value.length === 0) {
    notifyWarning('Exportación Vacía', 'No hay tareas para exportar.');
    return;
  }

  const dataStr = JSON.stringify(allTasks.value, null, 2); // null, 2 para formatear el JSON con indentación
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

  const exportFileDefaultName = `notifica-tareas-${new Date().toISOString().slice(0,10)}.json`;

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
  notifyInfo('Tareas Exportadas', `Archivo "${exportFileDefaultName}" generado.`);
  // No es necesario revocar el objeto URL con data URIs.
}

// Dispara el click en el input de tipo "file" (oculto) para la importación de tareas.
const triggerFileImport = () => {
  fileImportInputRef.value?.click(); // Simula un clic en el input de archivo oculto
}

// Procesa el archivo JSON seleccionado para importar tareas.
const importTasksFromJson = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  if (!fileInput.files || fileInput.files.length === 0) {
    notifyWarning('Importación Fallida', 'No se seleccionó ningún archivo.');
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const content = e.target?.result as string;
      const importedTasks = JSON.parse(content) as Task[];

      // Validar y transformar las tareas importadas (especialmente las fechas)
      const validatedTasks = importedTasks.map(task => {
        if (!task.id || !task.description || !task.startTime) {
          throw new Error('Formato de tarea inválido. Faltan campos requeridos.');
        }
        return {
          ...task,
          startTime: new Date(task.startTime),
          endTime: task.endTime ? new Date(task.endTime) : undefined,
          isNotified: task.isNotified === true, // Asegurar que sea booleano
        };
      });

      allTasks.value = validatedTasks;
      // Establecer el turno actual al más reciente de las tareas importadas si tienen shiftId
      if (validatedTasks.length > 0) {
        const shiftsFromImport = validatedTasks
          .filter(t => t.shiftId)
          .map(t => ({ id: t.shiftId!, date: new Date(parseInt(t.shiftId!.replace('shift-', ''))) }))
          .sort((a,b) => b.date.getTime() - a.date.getTime());
        
        if (shiftsFromImport.length > 0) {
          currentShiftId.value = shiftsFromImport[0].id;
          selectedShiftToView.value = 'current';
        } else {
          // Si ninguna tarea importada tiene shiftId, pero hay tareas,
          // podríamos limpiar currentShiftId o iniciar uno nuevo.
          // Por ahora, si no hay shiftIds en la importación, limpiamos el currentShiftId.
          currentShiftId.value = null;
          selectedShiftToView.value = 'current'; // Para que intente mostrar tareas sin shiftId
        }
      } else {
        currentShiftId.value = null;
        selectedShiftToView.value = 'current';
      }
      notifyInfo('Importación Exitosa', `${validatedTasks.length} tareas importadas correctamente.`);
    } catch (error) {
      notifyError('Error de Importación', `Al procesar el archivo: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      // Resetear el input de archivo para permitir importar el mismo archivo de nuevo si es necesario
      if (fileInput) fileInput.value = '';
    }
  };

  reader.onerror = () => {
    notifyError('Error de Lectura', 'Ocurrió un problema al leer el archivo seleccionado.');
    if (fileInput) fileInput.value = '';
  };

  reader.readAsText(file);
}

// Elimina todas las tareas de la aplicación, con opción de deshacer.
const deleteAllTasks = () => {
  if (window.confirm('¿Estás seguro de que quieres borrar TODAS las tareas? Esta acción no se puede deshacer.')) {
    const tasksBeforeDelete = JSON.parse(JSON.stringify(allTasks.value)); // Copia profunda de las tareas

    allTasks.value = []; // Limpia la lista de tareas en la aplicación

    const toastId = notifyError(
      'Borrado Completo',
      'Todas las tareas han sido eliminadas.',
      {
        action: {
          label: 'Deshacer',
          onClick: async () => { // Hacer la función onClick asíncrona
            allTasks.value = tasksBeforeDelete; // Restaurar las tareas (revertimos al método de reemplazo)
            // Convertir cadenas de fecha de vuelta a objetos Date
            allTasks.value = allTasks.value.map(task => ({
              ...task,
              startTime: new Date(task.startTime),
              endTime: task.endTime ? new Date(task.endTime) : undefined,
            }));            
            await nextTick(); // Esperar al siguiente ciclo de actualización del DOM

            // Mostrar notificación de restauración y recargar la página cuando esta se cierre.
            notifyInfo('Tareas Restauradas', 'Todas las tareas han sido restauradas.', {
              onDismiss: () => {
                window.location.reload(); // Forzar la recarga de la página cuando el toast se cierre
              }
            });
            dismissToast(toastId); // Cerrar el toast de "Deshacer"
          },
        },
        duration: 7000, // 7 segundos para reaccionar
      }
    );
  } else {
    notifyInfo('Acción Cancelada', 'El borrado de tareas fue cancelado.');
  }
};

// Hook onMounted: Carga el ID del turno actual y las tareas desde localStorage al iniciar la aplicación.
onMounted(() => {
  // Cargar currentShiftId
  const storedShiftId = localStorage.getItem(CURRENT_SHIFT_ID_KEY);
  if (storedShiftId) {
    currentShiftId.value = storedShiftId;
    selectedShiftToView.value = 'current'; // Por defecto, ver el turno actual al cargar
  } else {
    selectedShiftToView.value = 'current'; // Asegurarse de que está en 'current' si no hay shiftId guardado
  }

  // Cargar tareas
  const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (storedTasks) {
    try {
      const parsedTasks = JSON.parse(storedTasks) as Task[]
      // Es importante convertir las cadenas de fecha de vuelta a objetos Date
      allTasks.value = parsedTasks.map(task => ({
        ...task,
        startTime: new Date(task.startTime),
        endTime: task.endTime ? new Date(task.endTime) : undefined,
        // shiftId ya es string, isNotified ya es boolean (o debería serlo desde la importación)
      }))
    } catch (error) {
      notifyError('Error de Carga', 'No se pudieron cargar las tareas guardadas. Podrían estar corruptas.');
      console.error('Error al parsear tareas desde localStorage:', error);
    }
  }
})

// Watcher: Guarda todas las tareas en localStorage cada vez que el array `allTasks` cambia.
watch(allTasks, (newTasks) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks))
}, { deep: true }) // deep: true es crucial para observar cambios dentro de los objetos del array

// Watcher: Guarda el ID del turno actual en localStorage cada vez que `currentShiftId` cambia.
watch(currentShiftId, (newShiftId) => {
  if (newShiftId) localStorage.setItem(CURRENT_SHIFT_ID_KEY, newShiftId);
  else localStorage.removeItem(CURRENT_SHIFT_ID_KEY); // Si no hay turno activo, quitarlo
})

// Cambia la vista para mostrar las tareas del turno actual.
const returnToCurrentShift = () => {
  selectedShiftToView.value = 'current';
}

// Propiedad computada: Indica si el usuario está actualmente viendo un turno pasado.
const isViewingPastShift = computed(() => {
  return selectedShiftToView.value !== 'current';
});

// Alterna la visibilidad del dropdown de selección de turno.
const toggleShiftDropdown = () => {
  isShiftDropdownOpen.value = !isShiftDropdownOpen.value;
};

// Selecciona un turno para visualizar y cierra el dropdown.
const selectShift = (shiftId: string | 'current') => {
  selectedShiftToView.value = shiftId;
  isShiftDropdownOpen.value = false;
  // Opcional: devolver el foco al botón si es necesario para la accesibilidad
  // shiftDropdownButtonRef.value?.focus(); 
};

// Maneja los clics fuera del dropdown de turnos para cerrarlo.
const handleClickOutsideShiftDropdown = (event: MouseEvent) => {
  if (isShiftDropdownOpen.value) {
    const target = event.target as Node;
    const isClickOnButton = shiftDropdownButtonRef.value?.contains(target);
    const isClickOnMenu = shiftDropdownMenuRef.value?.contains(target);

    if (!isClickOnButton && !isClickOnMenu) {
      isShiftDropdownOpen.value = false;
    }
  }
};

// Watcher: Añade o elimina el event listener para clics fuera del dropdown según su estado de apertura.
watch(isShiftDropdownOpen, (isOpen) => {
  if (isOpen) {
    document.addEventListener('mousedown', handleClickOutsideShiftDropdown);
  } else {
    document.removeEventListener('mousedown', handleClickOutsideShiftDropdown);
  }
});

// Hook onUnmounted: Limpia el event listener al desmontar el componente.
onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutsideShiftDropdown);
});

// Formatea una tarea individual como una cadena de texto plano para compartir.
const formatTaskForPlainText = (task: Task): string => {
  const taskEmoji = '📝'; // Emoji de tarea
  const technicianEmoji = '👷';
  const notifiedEmoji = '✅';

  const description = task.description;
  const startTimeStr = task.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const endTimeStr = task.endTime ? task.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--';
  
  let durationStr = '';
  if (task.endTime) {
    let endTimeMs = task.endTime.getTime();
    const startTimeMs = task.startTime.getTime();
    // Manejar tareas que cruzan la medianoche (si endTimeMs es menor, pero el día es el mismo o siguiente)
    // Esta lógica asume que si endTime es anterior a startTime, es del día siguiente si la duración es positiva.
    // Para simplificar, si la fecha de endTime es la misma que startTime pero la hora es menor, se asume día siguiente.
    // O si la fecha de endTime es un día después.
    if (task.endTime.getDate() > task.startTime.getDate() || (task.endTime.getDate() === task.startTime.getDate() && endTimeMs < startTimeMs)) {
      endTimeMs += 24 * 60 * 60 * 1000;
    }
    const durationMs = endTimeMs - startTimeMs;
    const durationHours = durationMs / (1000 * 60 * 60);
    const roundedHours = Math.ceil(durationHours / 0.5) * 0.5;
    durationStr = `(${roundedHours.toFixed(1)} h)`;
  }

  let taskString = `${taskEmoji} ${description} ${startTimeStr} a ${endTimeStr}${durationStr ? ' ' + durationStr : ''}`;

  if (task.isNotified) {
    taskString += `\nNotificado SAP ${notifiedEmoji}`;
  }
  if (task.technician) {
    taskString += `\n${task.technician} ${technicianEmoji}`;
  }
  return taskString;
}

// Prepara y comparte (vía API Web Share o portapapeles) las tareas del turno seleccionado.
const shareShiftTasks = async () => {
  let shiftIdToShare: string | null | undefined = undefined;
  let shiftLabel = "Turno Actual";

  if (selectedShiftToView.value === 'current') {
    shiftIdToShare = currentShiftId.value;
    if (currentShiftId.value) {
      const ts = parseInt(currentShiftId.value.replace('shift-', ''));
      const date = new Date(ts);
      shiftLabel = `Turno del ${date.toLocaleDateString([], {
        day: '2-digit', 
        month: '2-digit', 
        year: '2-digit'
      })} ${date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`;
    }
  } else {
    shiftIdToShare = selectedShiftToView.value;
    const foundShift = availableShifts.value.find(s => s.id === shiftIdToShare);
    if (foundShift) shiftLabel = `Turno del ${foundShift.label}`;
  }

  if (!shiftIdToShare) {
    notifyWarning('Error al Compartir', 'No hay un turno seleccionado o activo para compartir.');
    return;
  }

  const tasksOfShift = allTasks.value.filter(task => task.shiftId === shiftIdToShare)
                                   .sort((a,b) => a.startTime.getTime() - b.startTime.getTime());
  if (tasksOfShift.length === 0) {
    notifyWarning('Nada que Compartir', `No hay tareas en el ${shiftLabel} para compartir.`);
    return;
  }

  const title = `_*📋 Notificaciones del ${shiftLabel}*:_\n\n`; // Título sin guiones, con doble salto de línea
  const tasksText = tasksOfShift.map(formatTaskForPlainText).join('\n\n'); // Doble salto de línea entre tareas
  const fullText = title + tasksText;

  try {
    if (navigator.share) {
      await navigator.share({
        title: `Notificaciones del ${shiftLabel}`,
        text: fullText,
      });
      notifyInfo('Tareas Compartidas', 'Contenido enviado a la aplicación de compartir.');
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(fullText);
      notifyInfo('Tareas Copiadas', 'Contenido copiado al portapapeles.');
    } else {
      notifyError('Error al Compartir', 'Tu navegador no soporta la función de compartir o copiar.');
    }
  } catch (err) {
    notifyError('Error al Compartir', 'Ocurrió un error al intentar la acción.');
  }
}

// Abre el menú lateral.
const openSideMenu = () => {
  isSideMenuOpen.value = true;
};

// Cierra el menú lateral.
const closeSideMenu = () => {
  isSideMenuOpen.value = false;
};

// Maneja las acciones emitidas desde el SideMenu.
const handleMenuAction = (actionName: string) => {
  switch (actionName) {
    case 'newShift':
      startNewShift();
      break;
    case 'importTasks':
      triggerFileImport();
      break;
    case 'exportTasks':
      exportTasksToJson();
      break;
    case 'shareTasks':
      shareShiftTasks();
      break;
    case 'deleteAll':
      deleteAllTasks();
      break;
    default:
      notifyWarning('Acción Desconocida', `La acción de menú "${actionName}" no está implementada.`);
  }
  closeSideMenu(); // Cerrar el menú después de ejecutar la acción
};


</script>

<template>
  <SideMenu 
    :is-open="isSideMenuOpen" 
    @close="closeSideMenu"
    @action="handleMenuAction" />
  
    <header class="relative w-full max-w-lg mx-auto flex items-center justify-center pt-4 pb-3 px-4 md:px-0"> <!-- Añadido pb-4 -->
    <button
      @click="openSideMenu"
      class="absolute left-4 top-4.5 p-1 rounded-md border border-slate-300 hover:bg-slate-200 focus:outline-none transition-all duration-150 ease-in-out active:scale-95"
      aria-label="Abrir menú"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-text-main">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>
    
    <!-- Contenedor del título y logo, centrado -->
    <div class="flex items-center gap-x-2"> <!-- Reducido el gap de 3 a 2 -->
      <img src="/assets/logo-header.png" alt="Logo Notifica" class="h-8 w-auto"> <!-- Logo con extensión corregida -->
      <h1 class="text-4xl font-extrabold tracking-tight text-text-main">Notifica</h1> <!-- Título agrandado -->
    </div>
  </header>
  
    <main class="min-h-screen bg-app-bg text-text-main flex flex-col items-center pt-4 px-4"> <!-- pt aún más reducido -->

    <!-- Sección para añadir nueva tarea -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-[160px]" 
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 max-h-[160px]"
      leave-to-class="opacity-0 max-h-0"
    >
      <div 
        v-if="!isViewingPastShift" 
        class="bg-white rounded-xl p-3 shadow-sm w-full max-w-lg mb-4 border border-gray-200 overflow-hidden"
      > 
        <div class="flex space-x-4 items-start"> 
          <div class="flex-grow">
            <textarea
              ref="descriptionTextareaRef"
              id="task-description"
              v-model="newTaskDescription"
              @keyup.enter.prevent="startNewTask"
              placeholder="Nuevo aviso"
              rows="2"
              class="p-3 bg-white border border-slate-300 rounded-md shadow-sm 
                    focus:ring-2 focus:ring-accent-main focus:border-accent-main 
                    w-full text-base resize-none placeholder-text-main/70
                    transition-all duration-300 ease-in-out">
              </textarea>
          </div>
          <div class="w-1/3 flex flex-col gap-2"> 
            <input 
              type="text" 
              id="task-technician" 
              v-model="newTaskTechnician"
              @keyup.enter="startNewTask"
              placeholder="Técnico(s)"            
              class="p-1 
                    bg-white border border-slate-300 rounded-md shadow-sm 
                    focus:ring-2 focus:ring-accent-main focus:border-accent-main 
                    transition-all duration-300 ease-in-out
                    w-full text-sm placeholder-text-main/70"
            />
            <button 
              @click="startNewTask" 
              class="w-full px-3 py-1.5 
                    bg-accent-main text-text-on-pastel font-semibold 
                    rounded-md shadow-sm hover:bg-accent-main/80 
                    focus:outline-none active:scale-95
                    transition-all duration-300 ease-in-out 
                    flex items-center justify-center gap-2 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" 
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07
                  a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 
                  0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
              Iniciar
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Botón para volver al turno actual si se está viendo uno pasado -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-[80px]" 
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 max-h-[80px]"
      leave-to-class="opacity-0 max-h-0"
    >
      <div 
        v-if="isViewingPastShift" 
        class="w-full max-w-lg mb-4 overflow-hidden"
      > 
        <button 
          @click="returnToCurrentShift" 
          class="w-full min-h-[44px] px-4 py-2 
                bg-status-active text-text-on-pastel text-sm font-semibold
                rounded-md shadow-sm hover:bg-yellow-300
                focus:outline-none focus:ring-2 focus:ring-status-active focus:ring-offset-2
                transition-all duration-300 ease-in-out
                flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          Volver al Turno Actual
        </button>
      </div>
    </Transition>

    <!-- Selector de Turno -->
    <!-- Este div se moverá debajo de TaskList -->

    <!-- Lista de Tareas (ahora filtrada y ordenada) -->
    <TaskList 
      :key="taskListKey" 
      :tasks="filteredAndSortedTasks" 
      :title="listTitle" 
      @finish-task="finishTask" 
      @update-task="updateTask" 
      @reactivate-task="reactivateTask" 
      @delete-task="deleteTask" />

    <!-- Separador Visual -->
    <hr class="w-5/6 max-w-md border-gray-200 my-6" /> <!-- Ancho porcentual para que sea más corta en móviles, centrada por items-center del main -->

    <!-- Contenedor para Selector de Turno y Filtros -->
    <div class="bg-white rounded-xl p-4 shadow-sm w-full max-w-lg mb-4 border border-gray-200 flex flex-wrap items-center justify-between gap-x-1 gap-y-3"> <!-- mt-4 eliminado, mb-4 mantenido -->
      <!-- Selector de Turno -->
      <div class="relative flex-shrink-0"> <!-- Contenedor relativo para el dropdown -->
        <button
          ref="shiftDropdownButtonRef"
          @click="toggleShiftDropdown"
          type="button"
          class="inline-flex items-center justify-center w-[72px] 
                rounded-md border border-slate-300 bg-white px-2 py-2 text-xs font-medium text-text-main shadow-sm hover:bg-slate-50
                focus:outline-none transition-all duration-300 ease-in-out active:scale-95"
          aria-haspopup="true"
          :aria-expanded="isShiftDropdownOpen"
        >
          Turno
          <svg class="ml-0.5 h-3 w-3 text-text-main/70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
          </svg>
        </button>

        <div
          v-if="isShiftDropdownOpen"
          ref="shiftDropdownMenuRef"
          class="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="shift-selector-button" 
        >
          <div class="py-1" role="none">
            <button 
              @click="selectShift('current')" 
              class="text-text-main block w-full text-left min-h-[44px] px-4 py-2 text-sm 
                    hover:bg-slate-100 hover:text-text-main transition-colors duration-150 ease-in-out" 
              role="menuitem">Turno Actual</button>
            <button 
              v-for="shift in availableShifts" 
              :key="shift.id" 
              @click="selectShift(shift.id)" 
              class="text-text-main block w-full text-left min-h-[44px] px-4 py-2 text-sm 
                    hover:bg-slate-100 hover:text-text-main transition-colors duration-150 ease-in-out" 
              role="menuitem">
              {{ shift.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- Filtros -->
      <div class="flex items-center space-x-2"> <!-- Grupo de filtros, space-x-2 para separar los dos filtros -->
        <!-- Toggle Mostrar solo activas -->
        <div class="flex items-center space-x-1"> <!-- space-x-1 entre texto y toggle -->
          <span class="text-xs font-medium text-text-main">Activas</span>
          <button 
            @click="showOnlyActive = !showOnlyActive" 
            :class="{'bg-accent-main': showOnlyActive, 'bg-slate-300': !showOnlyActive}"
            class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
                  transition-colors ease-in-out duration-200 focus:outline-none"
            role="switch" 
            :aria-checked="showOnlyActive"
          >
            <span class="sr-only">Mostrar solo tareas activas</span>
            <span :class="{'translate-x-5': showOnlyActive, 'translate-x-0': !showOnlyActive}" class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ease-in-out duration-200">
              <span :class="{'opacity-0 ease-out duration-100': showOnlyActive, 'opacity-100 ease-in duration-200': !showOnlyActive}" class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity" aria-hidden="true"></span>
              <span :class="{'opacity-100 ease-in duration-200': showOnlyActive, 'opacity-0 ease-out duration-100': !showOnlyActive}" class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity" aria-hidden="true"></span>
            </span>
          </button>
        </div>

        <!-- Toggle Mostrar solo sin notificar -->
        <div class="flex items-center space-x-1"> <!-- space-x-1 entre texto y toggle -->
          <span class="text-xs font-medium text-text-main">Sin Notificar</span>
          <button 
            @click="showOnlyNotNotified = !showOnlyNotNotified" 
            :class="{'bg-accent-main': showOnlyNotNotified, 'bg-slate-300': !showOnlyNotNotified}"
            class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
                  transition-colors ease-in-out duration-200 focus:outline-none"
            role="switch" 
            :aria-checked="showOnlyNotNotified"
          >
            <span class="sr-only">Mostrar solo tareas sin notificar</span>
            <span :class="{'translate-x-5': showOnlyNotNotified, 'translate-x-0': !showOnlyNotNotified}" class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ease-in-out duration-200">
              <span :class="{'opacity-0 ease-out duration-100': showOnlyNotNotified, 'opacity-100 ease-in duration-200': !showOnlyNotNotified}" class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity" aria-hidden="true"></span>
              <span :class="{'opacity-100 ease-in duration-200': showOnlyNotNotified, 'opacity-0 ease-out duration-100': !showOnlyNotNotified}" class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity" aria-hidden="true"></span>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Los botones de acción ahora están en el SideMenu -->

    <!-- Input de archivo oculto (se mantiene ya que es funcional y no visual) -->
    <input type="file" ref="fileImportInputRef" @change="importTasksFromJson" accept=".json" class="hidden" />
  </main>

  <!-- Componente Toaster para las notificaciones -->
  <!-- Movido fuera de <main> para asegurar el posicionamiento fixed correcto -->
  <Toaster
    position="bottom-center"
    closeButton
  />
</template>
