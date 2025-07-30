<script setup lang="ts">
// src/App.vue
// Componente principal de la aplicación Notifica. Gestiona el estado global, la lógica de negocio y la renderización de los componentes UI.
import { ref, computed, onMounted, watch, nextTick } from 'vue' // Añadido onUnmounted
import TaskList from './components/TaskList.vue' // Importar el nuevo componente
import SideMenu from './components/SideMenu.vue' // Importar el menú lateral
import ShiftSelector from './components/ShiftSelector.vue'
import TaskFilters from './components/TaskFilters.vue'
import NewTaskForm from './components/NewTaskForm.vue'
import Toast from './components/Toast.vue'
import { useToast } from './composables/useToast'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';
import dayjs from 'dayjs'
import 'dayjs/locale/es' // si usas español
dayjs.locale('es')
import type { Task } from './types/Task' // Importar la interfaz Task compartida
import { shiftIcons as icons } from './icons/shifts'
import { useLogoAnimation } from './composables/useLogoAnimation'
import { useDarkMode } from './composables/useDarkMode'
const { isDark } = useDarkMode()

const allTaskShiftIds = computed(() =>
  [...new Set(allTasks.value.map(t => t.shiftId).filter((id): id is string => typeof id === 'string'))]
)

// --- Composable para la animación del logo ---
const { logoBlockRef, animateLogo } = useLogoAnimation()

// Ref para la lista reactiva de toasts y la función de eliminación
const { toasts, remove, add } = useToast()

// --- Estado para la creación de nuevas tareas ---
const newTaskDescription = ref('')
const newTaskTechnician = ref('')
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
const shiftTitleId = computed(() =>
  selectedShiftToView.value !== 'current'
    ? selectedShiftToView.value
    : currentShiftId.value ?? ''
)
const filtersAreActive = computed(() => showOnlyActive.value || showOnlyNotNotified.value)

interface Shift {
  id: string
  label: string
  date: Date
}

// --- Estado para el menú lateral ---
const isSideMenuOpen = ref(false) // Controla la visibilidad del menú lateral.
const taskListKey = ref(0); // Key para forzar la re-renderización de TaskList, útil tras ciertas operaciones.

// Crea y añade una nueva tarea a la lista.
const startNewTask = () => {
  if (newTaskDescription.value.trim() === '') {
    add({
      title: 'Campo Requerido',
      description: 'Por favor, introduce una descripción para la tarea.',
      type: 'warning'
    });
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
  add({
    title: 'Tarea Iniciada',
    description: `"${newTask.description}" comenzada.`,
    type: 'success'
  })

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
    add({
      title: 'Tarea Finalizada',
      description: `"${task.description}" completada a las ${task.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`,
      type: 'success'
    })
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
        add({
          title: 'Tarea Notificada',
          description: `"${updatedTask.description}" marcada como notificada.`,
          type: 'success'
        })
      } else {
        add({
          title: 'Notificación Anulada',
          description: `"${updatedTask.description}" ya no está notificada.`,
        })
      }
    } else if (oldIsNotifiedState === updatedTask.isNotified) { // Si no cambió el estado de notificación, pero otros campos sí
      add({
        title: 'Tarea Actualizada',
        description: `"${updatedTask.description}" ha sido actualizada.`,
      })
    }
  } else {
    add({
      title: 'Error al Actualizar',
      description: `No se encontró la tarea con ID: ${updatedTask.id}.`,
    })
  }
}

// Reactiva una tarea que había sido finalizada, eliminando su hora de finalización.
const reactivateTask = (taskId: string) => {
  const task = allTasks.value.find(t => t.id === taskId)
  if (task) {
    delete task.endTime
    add({
      title: 'Tarea Reactivada',
      description: `"${task.description}" ha sido reabierta.`,
      type: 'warning'
    });
  }
}

// Elimina una tarea de la lista, con opción de deshacer la acción.
const deleteTask = (taskId: string) => {
  const taskIndex = allTasks.value.findIndex(t => t.id === taskId);
  if (taskIndex !== -1) {
    const taskToDelete = { ...allTasks.value[taskIndex] }; // Guardar una copia completa de la tarea

    // Mostrar toast con opción de Deshacer usando el sistema de notificaciones propio
    // Se usa type: 'error' para mostrar el toast en rojo
    // El botón de deshacer se define mediante la propiedad action del objeto toast
    const toastId = add(
      {
        title: 'Tarea Eliminada',
        description: `"${taskToDelete.description}" ha sido eliminada.`,
        type: 'error',
        delayClose: true,
        actions: [
          {
            label: 'Deshacer',
            onClick: () => {
              // Restaurar la tarea en su posición original tras un leve retardo
              setTimeout(() => {
                allTasks.value.splice(taskIndex, 0, taskToDelete);
              }, 300);

              // Cerrar el toast original con pequeño retardo para permitir animación
              setTimeout(() => {
                remove(toastId);
              }, 500);

              // Mostrar el toast de restauración ligeramente después
              setTimeout(() => {
                add({
                  title: 'Tarea Restaurada',
                  description: `"${taskToDelete.description}" ha sido restaurada.`
                });
              }, 550);
            }
          }
        ]
      },
      7000 // Asegurar duración larga para el toast con "Deshacer"
    );

    // Eliminar la tarea tras un breve retardo para suavizar la interacción
    setTimeout(() => {
      allTasks.value.splice(taskIndex, 1);
    }, 300);
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
      add({
        title: 'Acción Cancelada',
        description: 'Inicio de nuevo turno cancelado por el usuario.',
        type: 'error'
      });
      return;
    }
  }
  const newShiftId = `shift-${Date.now()}`;

  currentShiftId.value = newShiftId;
  selectedShiftToView.value = 'current';

  animateLogo()

  const toastId = add(
    {
      title: 'Nuevo Turno Iniciado',
      description: `Turno comenzado a las ${shiftStartTimeFormatted}.`,
      type: 'success',
      delayClose: true,
      actions: [
        {
          label: 'Deshacer',
          onClick: async () => {
            // Restaurar el estado anterior del turno
            currentShiftId.value = previousCurrentShiftId;
            selectedShiftToView.value = previousSelectedShiftToView;

            // Eliminar tareas y notas que se hayan podido crear en el newShiftId que se está deshaciendo
            allTasks.value = allTasks.value.filter(task => task.shiftId !== newShiftId);
            deleteNotesForShift(newShiftId)

            await nextTick(); // Esperar a que la UI se actualice

            setTimeout(() => {
              remove(toastId);
            }, 500);

            setTimeout(() => {
              add({
                title: 'Acción Deshecha',
                description: 'Se restauró el estado anterior al nuevo turno.',
                type: 'info'
              });
            }, 550);
          }
        }
      ]
    },
    7000 // 7 segundos para reaccionar
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
const availableShifts = computed<Shift[]>(() => {
  const shiftIds = new Set<string>();

  // Añadir shiftIds desde tareas
  allTasks.value.forEach(task => {
    if (task.shiftId) {
      shiftIds.add(task.shiftId);
    }
  });

  // Añadir shiftIds desde notas
  Object.keys(notesMap.value).forEach(id => {
    if (id && !shiftIds.has(id)) {
      shiftIds.add(id);
    }
  });

  return Array.from(shiftIds)
    .map(id => {
      const timestamp = parseInt(id.replace('shift-', ''));
      if (isNaN(timestamp)) return { id, label: id, date: new Date(0) };
      const date = new Date(timestamp);
      return {
        id,
        label: `${date.toLocaleDateString([], {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        })} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        date
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
});

// Propiedad computada: Determina el título a mostrar encima de la lista de tareas.
const listTitle = computed(() => {
  if (selectedShiftToView.value === 'current') {
    return ''
  }
  // selectedShiftToView contiene directamente el shiftId que queremos mostrar
  return getShiftLabel(selectedShiftToView.value)
})

import { getShiftLabel, getShiftIcon, getShiftColor } from './composables/useShifts'
import {
  getAllNotes,
  deleteNotesForShift,
  deleteAllNotes,
  setAllNotes,
  notesMap
} from '@/composables/useNotes'

// Exporta todas las tareas actuales a un archivo JSON.
const exportTasksToJson = async () => {
  if (allTasks.value.length === 0) {
    add({
      title: 'Exportación Vacía',
      description: 'No hay tareas para exportar.',
      type: 'warning'
    });
    return;
  }

  const fileName = `notifica-tareas-${new Date().toISOString().slice(0, 10)}.json`;

  // Nuevo objeto combinado
  const exportData = {
    tasks: allTasks.value,
    notesByShiftId: getAllNotes()
  };

  const dataStr = JSON.stringify(exportData, null, 2);

  if (Capacitor.isNativePlatform()) {
    try {
      // 1. Guardar archivo en caché
      const writeResult = await Filesystem.writeFile({
        path: fileName,
        data: dataStr,
        directory: Directory.Cache,
        encoding: Encoding.UTF8,
      });

      // 2. Obtener URI accesible al sistema
      const fileUri = await Filesystem.getUri({
        path: fileName,
        directory: Directory.Cache,
      });

      // 3. Lanzar diálogo de compartir archivo
      await Share.share({
        title: 'Exportar tareas',
        text: 'Archivo de tareas exportado desde Notifica.',
        files: [fileUri.uri],
        dialogTitle: `Compartir archivo ${fileName}`,
      });

      add({
        title: 'Tareas exportadas',
        description: `Archivo "${fileName}" listo para compartir.`,
      })
    } catch (err) {
      console.error('Error al exportar archivo JSON:', err);
      add({
        title: 'Error al exportar',
        description: 'No se pudo generar el archivo.',
      })
    }
  } else {
    // Web / PWA: descarga directa
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', fileName);
    linkElement.click();
    add({
      title: 'Tareas Exportadas',
      description: `Archivo "${fileName}" generado.`,
    })
  }
}

  // Dispara el click en el input de tipo "file" (oculto) para la importación de tareas.
  const triggerFileImport = () => {
    fileImportInputRef.value?.click(); // Simula un clic en el input de archivo oculto
  }

  // Procesa el archivo JSON seleccionado para importar tareas.
  const importTasksFromJson = (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) {
      add({
        title: 'Importación Fallida',
        description: 'No se seleccionó ningún archivo.',
        type: 'warning'
      });
      return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);

        // Detectar si es formato antiguo (array de tareas) o nuevo (objeto con claves)
        const importedTasks: Task[] = Array.isArray(parsed)
          ? parsed
          : parsed.tasks;

        if (!Array.isArray(importedTasks)) {
          throw new Error('El archivo no contiene una lista válida de tareas.');
        }

        // Si existen notas en el JSON, restaurarlas (nuevo formato)
        if (parsed.notesByShiftId && typeof parsed.notesByShiftId === 'object') {
          setAllNotes(parsed.notesByShiftId);
        }

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
        // Establecer el turno actual al más reciente considerando tareas y notas
        const shiftIdsFromTasks = validatedTasks
          .filter(t => t.shiftId)
          .map(t => t.shiftId!) // seguro porque se filtró por existencia

        const shiftIdsFromNotes = parsed.notesByShiftId
          ? Object.keys(parsed.notesByShiftId)
          : []

        const allShiftIds = Array.from(new Set([...shiftIdsFromTasks, ...shiftIdsFromNotes]))

        const shiftsWithDates = allShiftIds
          .map(id => {
            const ts = parseInt(id.replace('shift-', ''))
            return isNaN(ts) ? null : { id, date: new Date(ts) }
          })
          .filter((s): s is { id: string, date: Date } => s !== null)
          .sort((a, b) => b.date.getTime() - a.date.getTime())

        if (shiftsWithDates.length > 0) {
          currentShiftId.value = shiftsWithDates[0].id
          selectedShiftToView.value = 'current'
        } else {
          currentShiftId.value = null
          selectedShiftToView.value = 'current'
        }
        add({
          title: 'Importación Exitosa',
          description: `${validatedTasks.length} tareas importadas correctamente.`,
          type: 'info'
        });
      } catch (error) {
        add({
          title: 'Error de Importación',
          description: `Al procesar el archivo: ${error instanceof Error ? error.message : 'Error desconocido'}`,
          type: 'error'
        });
      } finally {
        // Resetear el input de archivo para permitir importar el mismo archivo de nuevo si es necesario
        if (fileInput) fileInput.value = '';
      }
    };

    reader.onerror = () => {
      add({
        title: 'Error de Lectura',
        description: 'Ocurrió un problema al leer el archivo seleccionado.',
        type: 'error'
      });
      if (fileInput) fileInput.value = '';
    };

    reader.readAsText(file);
  }

  // Elimina todas las tareas de la aplicación, con opción de deshacer.
  const deleteAllTasks = () => {
    if (window.confirm('¿Estás seguro de que quieres borrar TODAS las tareas de la aplicación? No podrán ser recuperadas.')) {
      const tasksBeforeDelete = JSON.parse(JSON.stringify(allTasks.value)); // Copia profunda de las tareas

      allTasks.value = []; // Limpia la lista de tareas en la aplicación
      deleteAllNotes()

      const toastId = add(
        {
          title: 'Borrado Completo',
          description: 'Todas las tareas y notas han sido eliminadas.',
          type: 'error',
          delayClose: true,
          actions: [
            {
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

                setTimeout(() => {
                  remove(toastId);
                }, 500);

                // Mostrar notificación de restauración y recargar la página cuando esta se cierre.
                setTimeout(() => {
                  add({
                    title: 'Tareas Restauradas',
                    description: 'Todas las tareas han sido restauradas.',
                    type: 'info'
                  });
                }, 550);
              }
            }
          ]
        },
        7000 // 7 segundos para reaccionar
      );
    } else {
      add({
        title: 'Acción Cancelada',
        description: 'El borrado de tareas fue cancelado.',
        type: 'info'
      });
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
        add({
          title: 'Error de Carga',
          description: 'No se pudieron cargar las tareas guardadas. Podrían estar corruptas.',
          type: 'error'
        });
        console.error('Error al parsear tareas desde localStorage:', error);
      }
    }
    // Toast de prueba al cargar la app para tests
    /* add({
      title: 'Notificación de prueba',
      description: 'Esto es una prueba del sistema de toasts propio.',
      actions: [
        {
          label: 'Cerrar Todo',
          onClick: () => {
            setTimeout(() => {
              toasts.value = []
            }, 500)
          }
        }
      ]
    }, 6000) */
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

  // Selecciona un turno para visualizar y cierra el dropdown.
  const selectShift = (shiftId: string | 'current') => {
    selectedShiftToView.value = shiftId
  }

  // Formatea una tarea individual como una cadena de texto plano para compartir.
  const formatTaskForPlainText = (task: Task): string => {
    const taskEmoji = '📝';
    const technicianEmoji = '👷';
    const notifiedEmoji = '✅';

    const description = task.description;
    const startTimeStr = task.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTimeStr = task.endTime ? task.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--';

    let durationStr = '';
    if (task.endTime) {
      let endTimeMs = task.endTime.getTime();
      const startTimeMs = task.startTime.getTime();
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
      taskString += `\n${notifiedEmoji} Notificado`;
    }
    if (task.technician) {
      taskString += `\n    ${technicianEmoji} ${task.technician}`;
    }
    return taskString;
  };

  // Prepara y comparte (vía plugin nativo, API Web Share o portapapeles) las tareas del turno seleccionado.
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
      add({
        title: 'Error al Compartir',
        description: 'No hay un turno seleccionado o activo para compartir.',
        type: 'warning'
      });
      return;
    }

    const tasksOfShift = allTasks.value
      .filter(task => task.shiftId === shiftIdToShare)
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

    if (tasksOfShift.length === 0) {
      add({
        title: 'Nada que Compartir',
        description: `No hay tareas en el ${shiftLabel} para compartir.`,
        type: 'warning'
      });
      return;
    }

    const title = `_*📋 Notificaciones del ${shiftLabel}*:_\n\n`;
    const tasksText = tasksOfShift.map(formatTaskForPlainText).join('\n\n');
    const fullText = title + tasksText;

    try {
      const { Share } = await import('@capacitor/share');
      const canShare = await Share.canShare();

      if (canShare.value) {
        await Share.share({
          title: `Notificaciones del ${shiftLabel}`,
          text: fullText,
          dialogTitle: 'Compartir Tareas'
        });
        add({
          title: 'Tareas Compartidas',
          description: 'Contenido enviado mediante sistema nativo.',
          type: 'info'
        });
        return;
      }
    } catch (e) {
      console.warn('Capacitor Share no disponible o falló, se usará fallback web.');
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: `Notificaciones del ${shiftLabel}`,
          text: fullText,
        });
        add({
          title: 'Tareas Compartidas',
          description: 'Contenido enviado a la aplicación de compartir.',
          type: 'info'
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(fullText);
        add({
          title: 'Tareas Copiadas',
          description: 'Contenido copiado al portapapeles.',
          type: 'info'
        });
      } else {
        add({
          title: 'Error al Compartir',
          description: 'Tu navegador no soporta la función de compartir o copiar.',
          type: 'error'
        });
      }
    } catch (err) {
      // Toast de error silenciado: el usuario puede haber cancelado la acción de compartir voluntariamente
    }
  };

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
        add({
          title: 'Acción Desconocida',
          description: `La acción de menú "${actionName}" no está implementada.`,
          type: 'warning'
        });
    }
  };

</script>

<template>
  <SideMenu :is-open="isSideMenuOpen" @close="closeSideMenu" @action="handleMenuAction" />

  <header class="sticky top-0 z-50 bg-surface-1 dark:bg-surface-1-dark shadow-sm w-full will-change-transform">
    <div class="relative w-full max-w-lg mx-auto flex items-center justify-center pt-4 pb-3 px-4 md:px-0 select-none">
      <button @click="openSideMenu"
        class="absolute left-4 top-4.5 btn-close md:hover:bg-surface-hover dark:md:hover:bg-surface-hover-dark"
        aria-label="Abrir menú">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-7 h-7 text-text-main dark:text-main-dark">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      <!-- Contenedor animado conjunto -->
      <div ref="logoBlockRef"
        class="flex items-center gap-x-2 transition-all duration-300 ease-in-out md:hover:scale-105 md:hover:drop-shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            class="h-8 w-8 text-text-main dark:text-main-dark"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
            aria-hidden="true">
          <g id="#000000ff">
            <path d="M122.92 32.93C130.66 26.93 140.09 22.98 149.9 22.28C157.33 21.75 164.86 22.26 172.11 24.01C175.34 24.9 179.27 26.37 180.1 30.03C180.92 33.08 178.62 35.64 176.65 37.63C169.95 44.27 163.35 51.02 156.55 57.55C155.03 58.96 153.56 60.7 154.1 62.93C154.76 67.83 154.75 73.69 158.86 77.15C161.28 79.49 164.76 79.94 167.97 80.04C170.48 80.12 173.41 80.28 175.33 78.34C183.54 70.56 191.13 62.14 199.23 54.26C202.14 51 207.89 53.16 208.76 57.2C213.07 71.97 212.77 88.61 205.46 102.41C202.79 107.97 198.53 112.52 194.11 116.73C206.17 124.6 215.98 136.34 219.88 150.36C223.69 163.57 222.55 178.21 216.63 190.65C208.98 206.98 193.35 219.56 175.47 222.66C160.05 226.02 143.45 221.43 131.03 211.92C116.5 201.06 108.17 182.94 108.47 164.9C106.82 165.69 105.23 166.64 103.94 167.95C94.06 177.72 84.36 187.69 74.43 197.42C65.68 205.83 51.03 206.85 41.14 199.86C30.98 192.76 26.5 178.51 30.84 166.89C32.39 161.69 36.14 157.63 39.96 153.96C59.91 133.91 79.92 113.92 99.88 93.89C101.65 91.93 103.73 89.76 103.71 86.94C103.76 82.62 103.08 78.32 103.2 74C102.95 58.26 110.36 42.48 122.92 32.93ZM120.36 51.36C115.25 59.19 113.27 68.79 113.97 78.04C114.26 82.29 115.09 86.56 114.49 90.82C113.94 94.21 111.74 97.01 109.4 99.41C88.95 119.95 68.75 140.75 48.02 161.03C44.56 164.25 41.13 168.07 40.7 173.01C39.24 180.47 42.88 188.8 49.98 191.95C56.09 194.79 63.67 193.11 68.36 188.37C82.52 174.19 96.62 159.94 110.65 145.64C112.53 143.79 114.04 141.61 115.25 139.29C122.54 125.53 135.62 114.84 150.72 110.88C161.6 107.88 173.23 108.72 183.94 112.04C189.37 107.03 194.67 101.51 197.52 94.58C201.06 86.52 201.27 77.49 200.53 68.86C195.66 71.7 192.39 76.52 188.27 80.27C184.03 84.18 180.29 89.87 174.02 90.35C169.35 90.61 164.64 90.47 159.97 90.26C157.28 90.25 155.51 87.96 153.67 86.34C150.06 82.61 145.18 79.21 144.55 73.63C143.99 68.27 142.78 62.81 143.6 57.43C145.69 52.61 150.29 49.54 153.72 45.72C157.17 41.9 161.54 38.77 164.01 34.16C147.83 29.33 129.22 37.2 120.36 51.36ZM157.32 122.19C144.36 124.41 132.71 132.85 126.37 144.34C120.79 154.42 119.27 166.63 122.09 177.79C124.93 189.74 133.13 200.27 143.98 206.01C152.93 210.94 163.63 212.37 173.64 210.54C188.42 207.69 201.55 197.01 206.88 182.87C209.85 175.46 210.41 167.28 209.42 159.41C207.14 143.42 195.38 129.25 180.15 123.93C172.86 121.35 164.91 120.92 157.32 122.19Z"/>
            <path d="M162.41 135.41C165.51 133.66 169.94 135.68 170.64 139.16C171.47 146.94 170.04 154.89 171.31 162.6C175.78 166.25 181.34 168.48 185.41 172.62C188.51 176.22 184.93 182.58 180.24 181.64C176.73 180.57 173.92 178.03 170.8 176.2C167.14 173.56 162.63 171.86 159.74 168.31C158.4 161.34 159.53 154.09 159.14 147.01C159.36 143.07 157.99 137.54 162.41 135.41Z"/>
          </g>
        </svg>
        <h1 class="text-4xl font-extrabold tracking-tight text-text-main dark:text-main-dark">Notifica</h1>
      </div>
    </div>
  </header>

  <main class="min-h-[calc(100svh-68px)] bg-app-bg dark:bg-app-bg-dark text-text-main dark:text-main-dark flex flex-col items-center pt-4 px-4 select-none overflow-hidden">

    <!-- Sección para añadir nueva tarea -->
    <NewTaskForm
      v-if="!isViewingPastShift"
      :model-value-description="newTaskDescription"
      :model-value-technician="newTaskTechnician"
      @update:model-value-description="newTaskDescription = $event"
      @update:model-value-technician="newTaskTechnician = $event"
      @submit="startNewTask"
      />

    <!-- Selector de Turno -->
    <!-- Este div se moverá debajo de TaskList -->

    <!-- Lista de Tareas (ahora filtrada y ordenada) -->
    <TaskList
      :key="taskListKey"
      :tasks="filteredAndSortedTasks"
      :title="listTitle"
      :title-id="shiftTitleId"
      :title-icon="icons[getShiftIcon(shiftTitleId)]"
      :filters-active="filtersAreActive"
      :current-shift-id="currentShiftId"
      :all-task-shift-ids="allTaskShiftIds"
      :active-shift-id="currentShiftId"
      @finish-task="finishTask"
      @update-task="updateTask"
      @reactivate-task="reactivateTask"
      @delete-task="deleteTask"
    />

    <!-- Separador Visual -->
    <hr class="w-5/6 max-w-md border-divider dark:border-divider-dark my-6" />
    <!-- Ancho porcentual para que sea más corta en móviles, centrada por items-center del main -->

        <!-- Botón para volver al turno actual si se está viendo uno pasado -->
    <Transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-[80px]" leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 max-h-[80px]" leave-to-class="opacity-0 max-h-0">
      <div v-if="isViewingPastShift" class="w-full max-w-lg mb-4 overflow-hidden">
        <button @click="returnToCurrentShift" class="w-full min-h-[44px] px-4 py-2 
                bg-status-active dark:bg-status-active-dark
                text-active-strong dark:text-active-strong-dark text-sm font-semibold
                rounded-md shadow-sm hover:bg-status-active/80 dark:hover:bg-status-active/70
                focus:outline-none focus:ring-2 focus:ring-status-active dark:focus:ring-status-active-dark focus:ring-offset-2
                transition-all duration-300 ease-in-out
                flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-5 h-4">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          Volver al Turno Actual
        </button>
      </div>
    </Transition>

    <!-- Contenedor para Selector de Turno y Filtros -->
    <div
      class="bg-surface-1 dark:bg-surface-1-dark rounded-xl p-4 shadow-sm w-full max-w-lg mb-4 border border-divider dark:border-divider-dark flex flex-wrap items-center justify-between gap-x-1 gap-y-3">
      <!-- Selector de Turno -->
      <ShiftSelector
        :availableShifts="availableShifts"
        :currentShiftId="currentShiftId"
        :selectedShiftToView="selectedShiftToView"
        @select="selectShift"
      />

      <!-- Filtros -->
      <TaskFilters
      v-model:showOnlyActive="showOnlyActive"
      v-model:showOnlyNotNotified="showOnlyNotNotified"
      />
    </div>
    
    <!-- Espacio final para evitar elementos del SO -->
    <div class="h-6 md:h-8" />

    <!-- Input de archivo oculto (se mantiene ya que es funcional y no visual) -->
    <input type="file" ref="fileImportInputRef" @change="importTasksFromJson" accept=".json" class="hidden" />

  </main>

  <!-- Sistema propio de notificaciones -->
  <Teleport to="body">
    <TransitionGroup tag="div" name="toast" class="fixed bottom-8 inset-x-0 flex flex-col items-center space-y-2 z-[9999] overflow-hidden pointer-events-none">
      <Toast v-for="toast in toasts" :key="toast.id" v-bind="toast" @onClose="remove(toast.id)" />
    </TransitionGroup>
  </Teleport>
</template>
