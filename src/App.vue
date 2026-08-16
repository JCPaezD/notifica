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
import AppLogo from './components/AppLogo.vue'
import SettingsModal from './components/SettingsModal.vue'
import Toast from './components/Toast.vue'
import { useToast } from './composables/useToast'
import type { Task } from './types/Task' // Importar la interfaz Task compartida
import { shiftIcons as icons } from './icons/shifts'
import { useLogoAnimation } from './composables/useLogoAnimation'
import { useDarkMode } from './composables/useDarkMode'
import { getShiftLabel, getShiftIcon, getShiftColor } from './composables/useShifts'
import {
  getAllNotes,
  deleteNotesForShift,
  deleteAllNotes,
  setAllNotes,
  notesMap,
  getNotesForShift
} from '@/composables/useNotes'
import { createTaskBackup, normalizeImportedTaskBackup } from '@/domain/taskImportExport'
import { buildShiftShareText } from '@/domain/shareText'
import { buildAvailableShifts, filterAndSortTasks } from '@/domain/taskFilters'
import {
  loadCurrentShiftId,
  loadTasksFromStorage,
  saveCurrentShiftId,
  saveTasksToStorage,
} from '@/services/taskPersistence'
import {
  createStartedTask,
  finishTaskById,
  getTaskRemovalSnapshot,
  reactivateTaskWithSnapshot,
  removeTaskAtIndex,
  replaceTaskById,
  restoreTaskAtIndex,
  reviveTaskDates,
} from '@/domain/taskLifecycle'
import { exportJsonBackup, isNativePlatform, sharePlainText } from '@/adapters/shareExportAdapters'

import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

type LocaleMode = 'es' | 'en' | 'system'

// --- Dark mode ---
const { preferredMode, setPreferredMode } = useDarkMode()

// --- Idioma ---
const selectedLocale = ref<LocaleMode>((localStorage.getItem('locale') || 'system') as LocaleMode)
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

function setLocale(lang: LocaleMode) {
  selectedLocale.value = lang
}

const allTaskShiftIds = computed(() =>
  [...new Set(allTasks.value.map(t => t.shiftId).filter((id): id is string => typeof id === 'string'))]
)

// --- Composable para la animación del logo ---
const { logoBlockRef, animateLogo } = useLogoAnimation()

// Ref para la lista reactiva de toasts y la función de eliminación
const { toasts, remove, add } = useToast()
const isNativeApp = isNativePlatform()
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

  const newTask = createStartedTask({
    id: Date.now().toString(),
    description: newTaskDescription.value,
    startTime: new Date(),
    technician: newTaskTechnician.value.trim() || undefined,
    shiftId: currentShiftId.value || undefined,
  })

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
  const endTime = new Date()
  const task = finishTaskById(allTasks.value, taskId, endTime)
  if (task) {
    add({
      title: t('toast.task.finished'),
      description: t('toast.task.finishedDetail', { description: task.description, endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }),
      type: 'success'
    })
  }
}

// Actualiza los datos de una tarea existente.
const updateTask = (updatedTask: Task) => {
  const result = replaceTaskById(allTasks.value, updatedTask)
  if (result) {
    const oldIsNotifiedState = result.previousTask.isNotified; // Guardar el estado anterior

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
  const result = reactivateTaskWithSnapshot(allTasks.value, taskId)
  if (result) {
    const { task, previousTask } = result
    const toastId = add({
      title: t('toast.task.reopened'),
      description: t('toast.task.reopenedDetail', { description: task.description }),
      type: 'warning',
      delayClose: true,
      actions: [
        {
          label: t('toast.action.undo'),
          onClick: () => {
            replaceTaskById(allTasks.value, previousTask)

            setTimeout(() => {
              remove(toastId)
            }, 500)

            setTimeout(() => {
              add({
                title: t('toast.task.restored'),
                description: t('toast.task.restoredDetail', { description: previousTask.description }),
                type: 'info',
              })
            }, 550)
          },
        },
      ],
    }, 7000)
  }
}

// Elimina una tarea de la lista, con opción de deshacer la acción.
const deleteTask = (taskId: string) => {
  const removalSnapshot = getTaskRemovalSnapshot(allTasks.value, taskId);
  if (removalSnapshot) {
    const { taskIndex, task: taskToDelete } = removalSnapshot;

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
                restoreTaskAtIndex(allTasks.value, taskIndex, taskToDelete);
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
      removeTaskAtIndex(allTasks.value, taskIndex);
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

  try {
    const exportResult = await exportJsonBackup({
      fileName,
      data: dataStr,
      title: t('dialog.export.title'),
      text: t('dialog.export.message'),
    })

    if (exportResult === 'native-share' || exportResult === 'web-share') {
      add({
        title: t('toast.export.success'),
        description: t('toast.share.readyFile', { fileName }),
      })
      return
    }

    if (exportResult === 'cancelled') {
      add({
        title: t('toast.action.cancelled'),
        type: 'info',
      })
      return
    }

    add({
      title: t('toast.export.success'),
      description: t('toast.export.generatedFile', { fileName }),
    })
  } catch (err) {
    console.error('Error al exportar archivo JSON:', err);
    add({
      title: t('toast.export.error'),
      description: t('toast.export.errorDetail'),
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
                allTasks.value = reviveTaskDates(allTasks.value);
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

    const shareResult = await sharePlainText({
      nativeTitle: t('dialog.share.titleShift', { shift: shiftLabel }),
      webTitle: t('dialog.share.titleShiftFallback', { shift: shiftLabel }),
      dialogTitle: t('dialog.share.title'),
      text: fullText,
    })

    if (shareResult === 'native-share') {
        add({
          title: t('toast.share.success'),
          description: t('toast.share.detail'),
          type: 'info'
        });
        return;
    }

    if (shareResult === 'web-share') {
        add({
          title: t('toast.share.successFallback'),
          description: t('toast.share.detailFallback'),
          type: 'info'
        });
      return
    }

    if (shareResult === 'clipboard') {
        add({
          title: t('toast.clipboard.success'),
          description: t('toast.clipboard.detail'),
          type: 'info'
        });
      return
    }

    if (shareResult === 'unsupported') {
        add({
          title: t('toast.share.errorFallback'),
          description: t('toast.share.unsupported'),
          type: 'error'
        });
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
        <AppLogo class="h-8 w-8 text-text-main dark:text-main-dark" />
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

  

  <SettingsModal
    v-model:modelValue="isSettingsOpen"
    :preferred-mode="preferredMode"
    :selected-locale="selectedLocale"
    @set-preferred-mode="setPreferredMode"
    @set-locale="setLocale"
  />

  <!-- Sistema propio de notificaciones -->
  <Teleport to="body">
    <TransitionGroup tag="div" name="toast" class="fixed bottom-8 inset-x-0 flex flex-col items-center space-y-2 z-[9999] overflow-hidden pointer-events-none">
      <Toast v-for="toast in toasts" :key="toast.id" v-bind="toast" @onClose="remove(toast.id)" />
    </TransitionGroup>
  </Teleport>
</template>
