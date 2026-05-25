<script setup lang="ts">
// src/App.vue
// Componente principal de la aplicación Notifica. Gestiona el estado global, la lógica de negocio y la renderización de los componentes UI.
import { ref, computed, onMounted, watch, nextTick } from 'vue' // Añadido onUnmounted
import TaskList from './components/TaskList.vue' // Importar el nuevo componente
import SideMenu from './components/SideMenu.vue' // Importar el menú lateral
import ShiftSelector from './components/ShiftSelector.vue'
import TaskFilters from './components/TaskFilters.vue'
import NewTaskForm from './components/NewTaskForm.vue'
import ReleaseNoticeBanner from './components/ReleaseNoticeBanner.vue'
import Modal from './components/ui/Modal.vue'
import { DialogTitle } from '@headlessui/vue'
import Toast from './components/Toast.vue'
import { useToast } from './composables/useToast'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';
import type { Task } from './types/Task' // Importar la interfaz Task compartida
import { shiftIcons as icons } from './icons/shifts'
import { useLogoAnimation } from './composables/useLogoAnimation'
import { useDarkMode } from './composables/useDarkMode'
import { createTaskBackup, normalizeImportedTaskBackup } from '@/domain/taskImportExport'
import { buildShiftShareText } from '@/domain/shareText'
import { buildAvailableShifts, filterAndSortTasks } from '@/domain/taskFilters'
import {
  loadCurrentShiftId,
  loadTasksFromStorage,
  saveCurrentShiftId,
  saveTasksToStorage,
} from '@/services/taskPersistence'

import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

// --- Dark mode ---
const { isDark, preferredMode, setPreferredMode } = useDarkMode()

// --- Idioma ---
const selectedLocale = ref(localStorage.getItem('locale') || 'system')
const RELEASE_NOTICE_DISMISSED_KEY = 'notifica-release-notice-dismissed'
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.jcpaezd.notifica'

watch(selectedLocale, (newVal) => {
  if (newVal === 'system') {
    const browserLocale = navigator.language.split('-')[0]
    const resolved = ['es', 'en'].includes(browserLocale) ? browserLocale : 'en'
    locale.value = resolved
    localStorage.setItem('locale', 'system')
  } else {
    locale.value = newVal
    localStorage.setItem('locale', newVal)
  }
})

function setLocale(lang: 'es' | 'en' | 'system') {
  selectedLocale.value = lang
}

const allTaskShiftIds = computed(() =>
  [...new Set(allTasks.value.map(t => t.shiftId).filter((id): id is string => typeof id === 'string'))]
)

// --- Composable para la animación del logo ---
const { logoBlockRef, animateLogo } = useLogoAnimation()

// Ref para la lista reactiva de toasts y la función de eliminación
const { toasts, remove, add } = useToast()
const isNativeApp = Capacitor.isNativePlatform()
const isIosLike = (() => {
  const userAgent = navigator.userAgent
  const matchesIos = /iPad|iPhone|iPod/.test(userAgent)
  const matchesTouchMac = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
  return matchesIos || matchesTouchMac
})()
const releaseNoticeDismissed = ref(localStorage.getItem(RELEASE_NOTICE_DISMISSED_KEY) === 'true')
const shouldShowReleaseNotice = computed(() => !isNativeApp && !releaseNoticeDismissed.value)
const shouldShowReleaseStoreCta = computed(() => !isNativeApp && !isIosLike)

// --- Estado para la creación de nuevas tareas ---
const newTaskDescription = ref('')
const newTaskTechnician = ref('')
const fileImportInputRef = ref<HTMLInputElement | null>(null) // Ref para el input de importación de archivos

// --- Estado principal de las tareas ---
const allTasks = ref<Task[]>([]) // Almacena todas las tareas de la aplicación.

// --- Estados para los filtros de visualización de tareas ---
const showOnlyActive = ref(false) // Toggle: Mostrar solo activas
const showOnlyNotNotified = ref(false) // Toggle: Mostrar solo sin notificar

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

// --- Estado para el menú de ajustes ---
const isSettingsOpen = ref(false)

const openSettings = () => {
  isSettingsOpen.value = true
}
const closeSettings = () => {
  isSettingsOpen.value = false
}

const dismissReleaseNotice = () => {
  releaseNoticeDismissed.value = true
  localStorage.setItem(RELEASE_NOTICE_DISMISSED_KEY, 'true')
}

const reopenReleaseNotice = () => {
  releaseNoticeDismissed.value = false
  localStorage.setItem(RELEASE_NOTICE_DISMISSED_KEY, 'false')
}

const openReleaseStore = () => {
  window.open(PLAY_STORE_URL, '_blank', 'noopener,noreferrer')
}

// Crea y añade una nueva tarea a la lista.
const startNewTask = () => {
  if (newTaskDescription.value.trim() === '') {
    add({
      title: t('toast.validation.required'),
      description: t('toast.validation.description'),
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
    title: t('toast.task.started'),
    description: t('toast.task.startedDetail', { description: newTask.description }),
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
      title: t('toast.task.finished'),
      description: t('toast.task.finishedDetail', { description: task.description, endTime: task.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }),
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
          title: t('toast.task.registered'),
          description: t('toast.task.registeredDetail', { description: updatedTask.description }),
          type: 'success'
        })
      } else {
        add({
          title: t('toast.task.unregistered'),
          description: t('toast.task.unregisteredDetail', { description: updatedTask.description }),
        })
      }
    } else if (oldIsNotifiedState === updatedTask.isNotified) { // Si no cambió el estado de notificación, pero otros campos sí
      add({
        title: t('toast.task.updated'),
        description: t('toast.task.updatedDetail', { description: updatedTask.description }),
      })
    }
  } else {
    add({
      title: t('toast.error.update'),
      description: t('toast.task.notFound', { id: updatedTask.id }),
    })
  }
}

// Reactiva una tarea que había sido finalizada, eliminando su hora de finalización.
const reactivateTask = (taskId: string) => {
  const task = allTasks.value.find(t => t.id === taskId)
  if (task) {
    delete task.endTime
    add({
      title: t('toast.task.reopened'),
      description: t('toast.task.reopenedDetail', { description: task.description }),
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
        title: t('toast.task.deleted'),
        description: t('toast.task.deletedDetail', { description: taskToDelete.description }),
        type: 'error',
        delayClose: true,
        actions: [
          {
            label: t('toast.action.undo'),
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
                  title: t('toast.task.restored'),
                  description: t('toast.task.restoredDetail', { description: taskToDelete.description }),
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
      t('toast.shift.starting', { time: shiftStartTimeFormatted }) + '\n\n' +
      t('dialog.shift.confirmArchive')
    );
    if (!confirmed) {
      add({
        title: t('toast.action.cancelled'),
        description: t('toast.shift.cancelled'),
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
      title: t('toast.shift.started'),
      description: t('toast.shift.startedDetail', { time: shiftStartTimeFormatted }),
      type: 'success',
      delayClose: true,
      actions: [
        {
          label: t('toast.action.undo'),
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
                title: t('toast.action.undone'),
                description: t('toast.shift.rollback'),
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
  return filterAndSortTasks(allTasks.value, {
    selectedShiftToView: selectedShiftToView.value,
    currentShiftId: currentShiftId.value,
    showOnlyActive: showOnlyActive.value,
    showOnlyNotNotified: showOnlyNotNotified.value,
  })
});

// Propiedad computada: Genera una lista de turnos disponibles basados en los `shiftId` de las tareas.
const availableShifts = computed<Shift[]>(() => {
  return buildAvailableShifts(allTasks.value, notesMap.value, [])
});

// Propiedad computada: Determina el título a mostrar encima de la lista de tareas.
const listTitle = computed(() => {
  if (selectedShiftToView.value === 'current') {
    return ''
  }
  // selectedShiftToView contiene directamente el shiftId que queremos mostrar
  return t('title.taskList', { shift: getShiftLabel(selectedShiftToView.value) })
})

import { getShiftLabel, getShiftIcon, getShiftColor } from './composables/useShifts'
import {
  getAllNotes,
  deleteNotesForShift,
  deleteAllNotes,
  setAllNotes,
  notesMap,
  getNotesForShift
} from '@/composables/useNotes'

// Exporta todas las tareas actuales a un archivo JSON.
const exportTasksToJson = async () => {
  if (allTasks.value.length === 0) {
    add({
      title: t('toast.export.empty'),
      description: t('toast.export.noTasks'),
      type: 'warning'
    });
    return;
  }

  const fileName = t('export.filename', { date: new Date().toISOString().slice(0, 10) });

  // Nuevo objeto combinado
  const exportData = createTaskBackup(allTasks.value, getAllNotes());

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
        title: t('dialog.export.title'),
        text: t('dialog.export.message'),
        files: [fileUri.uri],
        dialogTitle: t('dialog.export.title'),
      });

      add({
        title: t('toast.export.success'),
        description: t('toast.share.readyFile', { fileName }),
      })
    } catch (err) {
      console.error('Error al exportar archivo JSON:', err);
      add({
        title: t('toast.export.error'),
        description: t('toast.export.errorDetail'),
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
      title: t('toast.export.success'),
      description: t('toast.export.generatedFile', { fileName }),
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
        title: t('toast.import.failed'),
        description: t('toast.import.noFile'),
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

        const normalizedBackup = normalizeImportedTaskBackup(parsed);

        deleteAllNotes();
        setAllNotes(normalizedBackup.notesByShiftId);

        allTasks.value = normalizedBackup.tasks;
        currentShiftId.value = normalizedBackup.currentShiftId;
        selectedShiftToView.value = 'current';
        add({
          title: t('toast.import.success'),
          description: t('toast.import.count', { count: normalizedBackup.tasks.length }),
          type: 'info'
        });
      } catch (error) {
        add({
          title: t('toast.import.error'),
          description: t('toast.import.errorDetail', { errorMessage: error instanceof Error ? error.message : 'Error desconocido' }),
          type: 'error'
        });
      } finally {
        // Resetear el input de archivo para permitir importar el mismo archivo de nuevo si es necesario
        if (fileInput) fileInput.value = '';
      }
    };

    reader.onerror = () => {
      add({
        title: t('toast.import.readError'),
        description: t('toast.import.readErrorDetail'),
        type: 'error'
      });
      if (fileInput) fileInput.value = '';
    };

    reader.readAsText(file);
  }

  // Elimina todas las tareas de la aplicación, con opción de deshacer.
  const deleteAllTasks = () => {
    if (window.confirm(t('dialog.deleteAll.confirm'))) {
      const tasksBeforeDelete = JSON.parse(JSON.stringify(allTasks.value)); // Copia profunda de las tareas
      const notesBeforeDelete = JSON.parse(JSON.stringify(notesMap.value)); // Copia profunda de las notas

      allTasks.value = [];
      deleteAllNotes();

      const toastId = add(
        {
          title: t('toast.deleteAll.done'),
          description: t('toast.deleteAll.detail'),
          type: 'error',
          delayClose: true,
          actions: [
            {
              label: t('toast.action.undo'),
              onClick: async () => { // Hacer la función onClick asíncrona
                allTasks.value = tasksBeforeDelete; // Restaurar las tareas (revertimos al método de reemplazo)
                // Convertir cadenas de fecha de vuelta a objetos Date
                allTasks.value = allTasks.value.map(task => ({
                  ...task,
                  startTime: new Date(task.startTime),
                  endTime: task.endTime ? new Date(task.endTime) : undefined,
                }));
                setAllNotes(notesBeforeDelete); // Restaurar las notas
                await nextTick(); // Esperar al siguiente ciclo de actualización del DOM

                setTimeout(() => {
                  remove(toastId);
                }, 500);

                // Mostrar notificación de restauración y recargar la página cuando esta se cierre.
                setTimeout(() => {
                  add({
                    title: t('toast.deleteAll.restored'),
                    description: t('toast.deleteAll.restoredDetail'),
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
        title: t('toast.action.cancelled'),
        description: t('toast.deleteAll.cancelled'),
        type: 'info'
      });
    }
  };

  // Hook onMounted: Carga el ID del turno actual y las tareas desde localStorage al iniciar la aplicación.
  onMounted(() => {
    // Cargar currentShiftId
    const storedShiftId = loadCurrentShiftId();
    if (storedShiftId) {
      currentShiftId.value = storedShiftId;
      selectedShiftToView.value = 'current'; // Por defecto, ver el turno actual al cargar
    } else {
      selectedShiftToView.value = 'current'; // Asegurarse de que está en 'current' si no hay shiftId guardado
    }

    // Cargar tareas
    try {
      allTasks.value = loadTasksFromStorage()
    } catch (error) {
      add({
        title: t('toast.load.error'),
        description: t('toast.load.errorDetail'),
        type: 'error'
      });
      console.error('Error al parsear tareas desde localStorage:', error);
    }
    // Toast de prueba al cargar la app para tests
    /* add({
      title: t('toast.demo.title'),
      description: t('toast.demo.detail'),
      actions: [
        {
          label: t('toast.action.closeAll'),
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
    saveTasksToStorage(newTasks)
  }, { deep: true }) // deep: true es crucial para observar cambios dentro de los objetos del array

  // Watcher: Guarda el ID del turno actual en localStorage cada vez que `currentShiftId` cambia.
  watch(currentShiftId, (newShiftId) => {
    saveCurrentShiftId(newShiftId);
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

  // Prepara y comparte (vía plugin nativo, API Web Share o portapapeles) las tareas del turno seleccionado.
  const shareShiftTasks = async () => {
    let shiftIdToShare: string | null | undefined = undefined;
    let shiftLabel = t('shift.current');

    if (selectedShiftToView.value === 'current') {
      shiftIdToShare = currentShiftId.value;
      if (currentShiftId.value) {
        const ts = parseInt(currentShiftId.value.replace('shift-', ''));
        const date = new Date(ts);

        const dateStr = `${date.toLocaleDateString(locale.value, {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        })} ${date.toLocaleTimeString(locale.value, {
          hour: '2-digit',
          minute: '2-digit'
        })}`;

        shiftLabel = t('shift.ofDate', { date: dateStr });
      }
    } else {
      shiftIdToShare = selectedShiftToView.value;
      const foundShift = availableShifts.value.find(s => s.id === shiftIdToShare);
      if (foundShift) shiftLabel = t('shift.ofLabel', { label: foundShift.label });
    }

    if (!shiftIdToShare) {
      add({
        title: t('toast.share.error'),
        description: t('toast.share.noShift'),
        type: 'warning'
      });
      return;
    }

    const tasksOfShift = allTasks.value
      .filter(task => task.shiftId === shiftIdToShare)
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

    if (tasksOfShift.length === 0) {
      add({
        title: t('toast.share.empty'),
        description: t('toast.share.noTasks', { shift: shiftLabel }),
        type: 'warning'
      });
      return;
    }

    const notes = getNotesForShift(shiftIdToShare);
    const fullText = buildShiftShareText(tasksOfShift, notes, shiftLabel, t, locale.value);

    try {
      const { Share } = await import('@capacitor/share');
      const canShare = await Share.canShare();

      if (canShare.value) {
        await Share.share({
          title: t('dialog.share.titleShift', { shift: shiftLabel }),
          text: fullText,
          dialogTitle: t('dialog.share.title')
        });
        add({
          title: t('toast.share.success'),
          description: t('toast.share.detail'),
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
          title: t('dialog.share.titleShiftFallback', { shift: shiftLabel }),
          text: fullText,
        });
        add({
          title: t('toast.share.successFallback'),
          description: t('toast.share.detailFallback'),
          type: 'info'
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(fullText);
        add({
          title: t('toast.clipboard.success'),
          description: t('toast.clipboard.detail'),
          type: 'info'
        });
      } else {
        add({
          title: t('toast.share.errorFallback'),
          description: t('toast.share.unsupported'),
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
      case 'returnToCurrent':
        setTimeout(() => {
          selectedShiftToView.value = 'current'
        }, 350)
        break;
      case 'settings':
        openSettings();
        break;
      case 'releaseNotes':
        reopenReleaseNotice();
        break;
      default:
        add({
          title: t('toast.action.unknown'),
          description: t('toast.menu.unimplemented', { action: actionName }),
          type: 'warning'
        });
    }
  };

  const handleAction = (actionName: string) => {
    handleMenuAction(actionName)
  }

</script>

<template>
  <SideMenu
    :is-open="isSideMenuOpen"
    :show-release-notes-entry="!isNativeApp"
    @close="closeSideMenu"
    @action="handleMenuAction"
  />

  <header
    class="sticky top-0 z-50 bg-surface-1 dark:bg-surface-1-dark shadow-sm w-full will-change-transform"
    :class="{ 'pointer-events-none': isSettingsOpen }"
  >
    <div class="relative w-full max-w-lg mx-auto flex items-center justify-center pt-4 pb-3 px-4 md:px-0 select-none">
      <button @click="openSideMenu"
        class="absolute left-4 top-4.5 btn-close md:hover:bg-surface-hover dark:md:hover:bg-surface-hover-dark"
        :aria-label="t('aria.menu.open')">
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

  <main
    style="min-height: calc(100svh - 68px);"
    class="bg-app-bg dark:bg-app-bg-dark text-text-main dark:text-main-dark flex flex-col items-center pt-4 px-4 select-none overflow-hidden"
    :class="{ 'pointer-events-none': isSettingsOpen }"
  >

    <ReleaseNoticeBanner
      :visible="shouldShowReleaseNotice"
      :show-store-cta="shouldShowReleaseStoreCta"
      @close="dismissReleaseNotice"
      @open-store="openReleaseStore"
    />

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
        <button v-cancel-touch-click @click="handleAction('returnToCurrent')" class="btn-shift">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-5 h-4">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          {{ t('nav.shift.returnCurrent') }}
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

  

  <!-- Modal de Configuración -->
  <Modal v-model:modelValue="isSettingsOpen">
    <!-- Franja de cabecera -->
    <div class="bg-surface-hover dark:bg-surface-hover-dark rounded-t-xl px-4 py-2 text-left">
      <DialogTitle as="h2" id="modal-title" class="flex justify-between items-center text-xl font-semibold">
        <span class="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          {{ t('menu.options') }}
        </span>
        <button 
          v-cancel-touch-click
          @click="isSettingsOpen = false" 
          :aria-label="t('aria.menu.close')"
          class="focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
            class="w-7 h-7 text-text-main dark:text-main-dark transition-colors duration-150 hover:text-subtle dark:hover:text-subtle-dark active:text-accent-main">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </DialogTitle>
    </div>

    <!-- Zona de contenido -->
    <div class="bg-surface-1 dark:bg-surface-1-dark rounded-b-xl px-6 py-6 text-left">

      <!-- Bloque Apariencia -->
      <div class="mb-6">
        <p class="flex items-center gap-2 text-base font-semibold text-subtle dark:text-subtle-dark mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
          </svg>
          {{ t('menu.appearance') }}
        </p>
        <div class="grid grid-cols-3 gap-2">
          <!-- Botón Sistema -->
          <button v-cancel-touch-click @click="setPreferredMode('system')" :class="[
            'h-10 w-full flex items-center gap-1 px-2 md:px-3 md:gap-2 py-2 rounded-md transition-all duration-150',
            preferredMode === 'system'
              ? 'bg-accent-main text-white font-semibold'
              : 'bg-surface-1 dark:bg-surface-1-dark text-subtle dark:text-subtle-dark border border-divider hover:bg-surface-hover dark:hover:bg-surface-hover-dark'
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
            </svg>
            {{ t('menu.theme.system') }}
          </button>

          <!-- Botón Claro -->
          <button v-cancel-touch-click @click="setPreferredMode('light')" :class="[
            'h-10 w-full flex items-center gap-1 px-2 md:px-3 md:gap-2 py-2 rounded-md transition-all duration-150',
            preferredMode === 'light'
              ? 'bg-accent-main text-white font-semibold'
              : 'bg-surface-1 dark:bg-surface-1-dark text-subtle dark:text-subtle-dark border border-divider hover:bg-surface-hover dark:hover:bg-surface-hover-dark'
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 3v1.5m0 15V21m9-9h-1.5M4.5 12H3m16.95 4.95l-1.061-1.061M6.111 6.111 5.05 5.05m0 13.9 1.061-1.061m12.728-12.728-1.061 1.061M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ t('menu.theme.light') }}
          </button>

          <!-- Botón Oscuro -->
          <button v-cancel-touch-click @click="setPreferredMode('dark')" :class="[
            'h-10 w-full flex items-center gap-1 px-2 md:px-3 md:gap-2 py-2 rounded-md transition-all duration-150',
            preferredMode === 'dark'
              ? 'bg-accent-main text-white font-semibold'
              : 'bg-surface-1 dark:bg-surface-1-dark text-subtle dark:text-subtle-dark border border-divider hover:bg-surface-hover dark:hover:bg-surface-hover-dark'
          ]">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
            {{ t('menu.theme.dark') }}
          </button>
        </div>
      </div>

      <hr class="my-4 border-divider dark:border-divider-dark mx-3" />

      <!-- Bloque Idioma -->
      <div>
        <p class="flex items-center gap-2 text-base font-semibold text-subtle dark:text-subtle-dark mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
          </svg>
          {{ t('menu.language') }}
        </p>
        <div class="grid grid-cols-3 gap-2">
          <!-- Botón Sistema/Auto -->
          <button v-cancel-touch-click @click="setLocale('system')" :class="[
            'flex-1 h-10 flex items-center justify-center rounded-md transition-all duration-150',
            selectedLocale === 'system'
              ? 'bg-accent-main text-white font-semibold'
              : 'bg-surface-1 dark:bg-surface-1-dark text-subtle dark:text-subtle-dark border border-divider hover:bg-surface-hover dark:hover:bg-surface-hover-dark'
          ]">
            AUTO
          </button>
          <button v-cancel-touch-click @click="setLocale('es')" :class="[
            'flex-1 h-10 flex items-center justify-center rounded-md transition-all duration-150',
            selectedLocale === 'es'
              ? 'bg-accent-main text-white font-semibold'
              : 'bg-surface-1 dark:bg-surface-1-dark text-subtle dark:text-subtle-dark border border-divider hover:bg-surface-hover dark:hover:bg-surface-hover-dark'
          ]">
            ES
          </button>
          <button v-cancel-touch-click @click="setLocale('en')" :class="[
            'flex-1 h-10 flex items-center justify-center rounded-md transition-all duration-150',
            selectedLocale === 'en'
              ? 'bg-accent-main text-white font-semibold'
              : 'bg-surface-1 dark:bg-surface-1-dark text-subtle dark:text-subtle-dark border border-divider hover:bg-surface-hover dark:hover:bg-surface-hover-dark'
          ]">
            EN
          </button>
        </div>
      </div>
    </div>
  </Modal>

  <!-- Sistema propio de notificaciones -->
  <Teleport to="body">
    <TransitionGroup tag="div" name="toast" class="fixed bottom-8 inset-x-0 flex flex-col items-center space-y-2 z-[9999] overflow-hidden pointer-events-none">
      <Toast v-for="toast in toasts" :key="toast.id" v-bind="toast" @onClose="remove(toast.id)" />
    </TransitionGroup>
  </Teleport>
</template>
