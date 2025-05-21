<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue' // Añadido onMounted y watch
import TaskList from './components/TaskList.vue' // Importar el nuevo componente
import type { Task } from './types/Task' // Importar la interfaz Task compartida

const newTaskDescription = ref('')
const newTaskTechnician = ref('')
const descriptionTextareaRef = ref<HTMLTextAreaElement | null>(null) // Ref para el textarea de descripción
const fileImportInputRef = ref<HTMLInputElement | null>(null) // Ref para el input de importación de archivos
const allTasks = ref<Task[]>([]) // Renombrado de activeTasks a allTasks

// Estados para los filtros
const showOnlyActive = ref(false) // Toggle: Mostrar solo activas
const showOnlyNotNotified = ref(false) // Toggle: Mostrar solo sin notificar

const LOCAL_STORAGE_KEY = 'notifica-tasks'
const CURRENT_SHIFT_ID_KEY = 'notifica-current-shift-id'

// Gestión de Turnos
const currentShiftId = ref<string | null>(null)
const selectedShiftToView = ref<string | 'current'>('current') // 'current' o un shiftId específico

const startNewTask = () => {
  if (newTaskDescription.value.trim() === '') {
    alert('Por favor, introduce una descripción para la tarea.')
    return
  }

  if (!currentShiftId.value) {
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
  descriptionTextareaRef.value?.focus() // Devolver el foco al campo de descripción
  console.log(`Tarea iniciada: ${newTask.description} por ${newTask.technician || 'N/A'} a las ${newTask.startTime.toLocaleTimeString()}`)
}

const finishTask = (taskId: string) => {
  const task = allTasks.value.find(t => t.id === taskId)
  if (task) {
    task.endTime = new Date()
    console.log(`Tarea finalizada: ${task.description} a las ${task.endTime.toLocaleTimeString()}`)
    // Ahora se maneja con filtros
  }
}

const updateTask = (updatedTask: Task) => {
  const taskIndex = allTasks.value.findIndex(t => t.id === updatedTask.id)
  if (taskIndex !== -1) {
    allTasks.value[taskIndex] = updatedTask
    console.log(`Tarea actualizada: ${updatedTask.description} - Notificado: ${updatedTask.isNotified}`)
  } else {
    console.warn(`No se encontró la tarea con ID: ${updatedTask.id} para actualizar.`)
  }
}

const reactivateTask = (taskId: string) => {
  const task = allTasks.value.find(t => t.id === taskId)
  if (task) {
    delete task.endTime
    console.log(`Tarea reactivada: ${task.description}`)
  }
}

const deleteTask = (taskId: string) => {
  const taskIndex = allTasks.value.findIndex(t => t.id === taskId);
  if (taskIndex !== -1) {
    const deletedTaskDescription = allTasks.value[taskIndex].description;
    allTasks.value.splice(taskIndex, 1);
    console.log(`Tarea eliminada: ${deletedTaskDescription}`);
  }
}

const startNewShift = (showAlert = true) => {
  const newShiftId = `shift-${Date.now()}`; // Generar un ID simple para el nuevo turno
  currentShiftId.value = newShiftId;
  selectedShiftToView.value = 'current'; // Al iniciar un nuevo turno, asegurarse de que se está viendo el actual
  const shiftStartTimeFormatted = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (showAlert) {
    alert(`Nuevo turno iniciado a las ${shiftStartTimeFormatted}`);
  }
  console.log(`Nuevo turno iniciado con ID: ${newShiftId} a las ${shiftStartTimeFormatted}`);
}

// Propiedad calculada para las tareas filtradas y ordenadas
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

const listTitle = computed(() => {
  if (selectedShiftToView.value === 'current') {
    if (currentShiftId.value) {
      return ''; // Sin título para el turno actual
    }
    return ''; // Sin título si no hay turno activo y se ve "actual"
  }
  const selectedShift = availableShifts.value.find(s => s.id === selectedShiftToView.value);
  // Punto 3: Mostrar el título del turno anterior que se está viendo.
  return selectedShift ? `Viendo Turno: ${selectedShift.label}` : ''; // Sin título si no se encuentra el turno seleccionado
});

const exportTasksToJson = () => {
  if (allTasks.value.length === 0) {
    alert('No hay tareas para exportar.');
    return;
  }

  const dataStr = JSON.stringify(allTasks.value, null, 2); // null, 2 para formatear el JSON con indentación
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

  const exportFileDefaultName = `notifica-tareas-${new Date().toISOString().slice(0,10)}.json`;

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
  // No es necesario revocar el objeto URL con data URIs de esta manera.
  // document.body.removeChild(linkElement); // Opcional si se añade al body
}

const triggerFileImport = () => {
  fileImportInputRef.value?.click(); // Simula un clic en el input de archivo oculto
}

const importTasksFromJson = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  if (!fileInput.files || fileInput.files.length === 0) {
    alert('No se seleccionó ningún archivo.');
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
      alert(`${validatedTasks.length} tareas importadas correctamente.`);
    } catch (error) {
      console.error('Error al importar tareas:', error);
      alert(`Error al importar el archivo: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      // Resetear el input de archivo para permitir importar el mismo archivo de nuevo si es necesario
      if (fileInput) fileInput.value = '';
    }
  };

  reader.onerror = () => {
    alert('Error al leer el archivo.');
    if (fileInput) fileInput.value = '';
  };

  reader.readAsText(file);
}

const deleteAllTasks = () => {
  if (window.confirm('¿Estás seguro de que quieres borrar TODAS las tareas? Esta acción no se puede deshacer.')) {
    allTasks.value = []; // Limpia la lista de tareas en la aplicación
    // localStorage.removeItem(LOCAL_STORAGE_KEY); // Esto también se manejará por el watch, pero podemos ser explícitos.
    // El watch de allTasks se encargará de actualizar localStorage a un array vacío.
    alert('Todas las tareas han sido eliminadas.');
  }
}

// Cargar tareas desde localStorage al montar el componente
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
      console.error('Error al parsear tareas desde localStorage:', error)
      // Opcional: limpiar localStorage si los datos están corruptos
      // localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }
})

// Guardar tareas en localStorage cada vez que allTasks cambie
watch(allTasks, (newTasks) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks))
}, { deep: true }) // deep: true es crucial para observar cambios dentro de los objetos del array

// Guardar currentShiftId en localStorage cada vez que cambie
watch(currentShiftId, (newShiftId) => {
  if (newShiftId) localStorage.setItem(CURRENT_SHIFT_ID_KEY, newShiftId);
  else localStorage.removeItem(CURRENT_SHIFT_ID_KEY); // Si no hay turno activo, quitarlo
})

const returnToCurrentShift = () => {
  selectedShiftToView.value = 'current';
}

const isViewingPastShift = computed(() => {
  return selectedShiftToView.value !== 'current';
});

const formatTaskForPlainText = (task: Task): string => {
  const startTime = `⏰ ${task.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  const endTime = task.endTime ? `🏁 ${task.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : '⏳ --:--';
  let durationStr = '';
  if (task.endTime) {
    let endTimeMs = task.endTime.getTime();
    const startTimeMs = task.startTime.getTime();
    if (endTimeMs < startTimeMs) { // Manejar tareas que cruzan la medianoche
      endTimeMs += 24 * 60 * 60 * 1000;
    }
    const durationMs = endTimeMs - startTimeMs;
    const durationHours = durationMs / (1000 * 60 * 60);
    const roundedHours = Math.ceil(durationHours / 0.5) * 0.5;
    durationStr = ` ⏱️ (${roundedHours.toFixed(1)} h)`;
  }
  const technician = task.technician ? ` 👷 ${task.technician}` : '';
  const notified = task.isNotified ? ' ✅ Notificado SAP' : '';
  
  return `📝 ${startTime} a ${endTime}${durationStr}: ${task.description}${technician}${notified}`;
}

const shareShiftTasks = async () => {
  let shiftIdToShare: string | null | undefined = undefined;
  let shiftLabel = "Turno Actual";

  if (selectedShiftToView.value === 'current') {
    shiftIdToShare = currentShiftId.value;
    if (currentShiftId.value) {
      const ts = parseInt(currentShiftId.value.replace('shift-', ''));
      const date = new Date(ts);
      shiftLabel = `Turno del ${date.toLocaleDateString([], {day: '2-digit', month: '2-digit', year: '2-digit'})} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  } else {
    shiftIdToShare = selectedShiftToView.value;
    const foundShift = availableShifts.value.find(s => s.id === shiftIdToShare);
    if (foundShift) shiftLabel = `Turno del ${foundShift.label}`;
  }

  if (!shiftIdToShare) {
    alert('No hay un turno seleccionado o activo para compartir.');
    return;
  }

  const tasksOfShift = allTasks.value.filter(task => task.shiftId === shiftIdToShare)
                                   .sort((a,b) => a.startTime.getTime() - b.startTime.getTime());

  if (tasksOfShift.length === 0) {
    alert(`No hay tareas en el ${shiftLabel} para compartir.`);
    return;
  }

  const title = `_*📋 Notificaciones del ${shiftLabel}*:_\n----------------------------------------------------\n\n`; // Título con asteriscos y emoji
  const tasksText = tasksOfShift.map(formatTaskForPlainText).join('\n\n'); // Añadido un \n extra para doble salto de línea
  const fullText = title + tasksText;

  try {
    if (navigator.share) {
      await navigator.share({
        title: `Notificaciones del ${shiftLabel}`,
        text: fullText,
      });
      console.log('Tareas compartidas exitosamente.');
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(fullText);
      alert('Tareas copiadas al portapapeles.');
    } else {
      alert('No se pudo compartir ni copiar. Tu navegador podría no ser compatible.');
    }
  } catch (err) {
    console.error('Error al compartir/copiar tareas:', err);
    alert('Ocurrió un error al intentar compartir o copiar las tareas.');
  }
}


</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center pt-10 px-4">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">Notifica - Registro de Tareas</h1>

    <!-- Sección para añadir nueva tarea -->
    <div v-if="!isViewingPastShift" class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mb-8">
      <div class="flex space-x-4 mb-4 items-start"> <!-- Cambiado a items-start para alinear por arriba -->
        <div class="flex-grow">
          <!-- <label for="task-description" class="block text-sm font-medium text-gray-700 mb-1">Descripción de la Tarea:</label> -->
          <textarea 
            ref="descriptionTextareaRef"
            id="task-description" 
            v-model="newTaskDescription" 
            @keyup.enter.prevent="startNewTask"  
            placeholder="Descripción de la Tarea" 
            rows="3" 
            class="p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full text-base resize-none"></textarea>
        </div>
        <div class="w-1/3"> <!-- O un ancho fijo como w-32 o w-40 -->
          <!-- <label for="task-technician" class="block text-sm font-medium text-gray-700 mb-1">Técnico(s):</label> -->
          <input 
            type="text" 
            id="task-technician" 
            v-model="newTaskTechnician" 
            @keyup.enter="startNewTask" 
            placeholder="Técnico(s)" 
            class="p-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm placeholder-gray-400" />
        </div>
      </div>
      <button @click="startNewTask" class="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Iniciar Tarea
      </button>
    </div>

    <!-- Botón para volver al turno actual si se está viendo uno pasado -->
    <div v-if="isViewingPastShift" class="w-full max-w-lg mb-8">
      <button @click="returnToCurrentShift" class="w-full px-4 py-2 bg-orange-500 text-white font-semibold rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2">
        Volver al Turno Actual para Añadir Tareas
      </button>
    </div>

    <!-- Selector de Turno -->
    <!-- Este div se moverá debajo de TaskList -->

    <!-- Lista de Tareas (ahora filtrada y ordenada) -->
    <TaskList :tasks="filteredAndSortedTasks" :title="listTitle" @finish-task="finishTask" @update-task="updateTask" @reactivate-task="reactivateTask" @delete-task="deleteTask" />

    <!-- Selector de Turno (Punto 1: Movido aquí) -->
    <div class="w-full max-w-lg mt-4 p-4 bg-white rounded-lg shadow-md"> <!-- mt-4 para separarlo de la lista -->
      <div class="flex items-center space-x-2">
        <label for="shift-selector" class="text-sm font-medium text-gray-700">Ver Turno:</label>
        <select id="shift-selector" v-model="selectedShiftToView" class="p-2 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500 flex-grow">
          <option value="current">Turno Actual</option>
          <option v-for="shift in availableShifts" :key="shift.id" :value="shift.id">
            {{ shift.label }}
          </option>
        </select>
      </div>
    </div>

    <!-- Filtros (movidos debajo de la lista) -->
    <div class="w-full max-w-lg mt-4 p-4 bg-white rounded-lg shadow-md flex justify-around items-center text-sm font-medium text-gray-700">
      <!-- Toggle Mostrar solo activas -->
      <div class="flex items-center space-x-2">
        <span>Solo Activas</span>
        <button 
          @click="showOnlyActive = !showOnlyActive" 
          :class="{'bg-blue-600': showOnlyActive, 'bg-gray-300': !showOnlyActive}"
          class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          role="switch" 
          :aria-checked="showOnlyActive"
        >
          <span class="sr-only">Mostrar solo tareas activas</span>
          <span 
            :class="{'translate-x-5': showOnlyActive, 'translate-x-0': !showOnlyActive}"
            class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ease-in-out duration-200"
          >
            <span 
              :class="{'opacity-0 ease-out duration-100': showOnlyActive, 'opacity-100 ease-in duration-200': !showOnlyActive}"
              class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity" aria-hidden="true">
              <!-- Icono Off (vacío) -->
            </span>
            <span 
              :class="{'opacity-100 ease-in duration-200': showOnlyActive, 'opacity-0 ease-out duration-100': !showOnlyActive}"
              class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity" aria-hidden="true">
              <!-- Icono On (check) -->
            </span>
          </span>
        </button>
      </div>

      <!-- Toggle Mostrar solo sin notificar -->
      <div class="flex items-center space-x-2">
        <span>Solo Sin Notificar</span>
        <button 
          @click="showOnlyNotNotified = !showOnlyNotNotified" 
          :class="{'bg-blue-600': showOnlyNotNotified, 'bg-gray-300': !showOnlyNotNotified}"
          class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          role="switch" 
          :aria-checked="showOnlyNotNotified"
        >
          <span class="sr-only">Mostrar solo tareas sin notificar</span>
          <span 
            :class="{'translate-x-5': showOnlyNotNotified, 'translate-x-0': !showOnlyNotNotified}"
            class="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ease-in-out duration-200"
          >
            <span 
              :class="{'opacity-0 ease-out duration-100': showOnlyNotNotified, 'opacity-100 ease-in duration-200': !showOnlyNotNotified}"
              class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity" aria-hidden="true">
              <!-- Icono Off (vacío) -->
            </span>
            <span 
              :class="{'opacity-100 ease-in duration-200': showOnlyNotNotified, 'opacity-0 ease-out duration-100': !showOnlyNotNotified}"
              class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity" aria-hidden="true">
              <!-- Icono On (check) -->
            </span>
          </span>
        </button>
      </div>
    </div>

    <!-- Botones de Gestión de Datos -->
    <div class="w-full max-w-lg mt-6 mb-6 flex flex-wrap justify-between items-center gap-4"> <!-- justify-between para separar grupos -->
      <div class="flex gap-4"> <!-- Grupo para Importar/Exportar -->
        <button 
          @click="exportTasksToJson"
          title="Exportar Tareas"
          class="p-2 bg-gray-600 text-white rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </button>
        <button 
          @click="triggerFileImport"
          title="Importar Tareas"
          class="p-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
        </button>
        <!-- Botón Iniciar Nuevo Turno (movido aquí) -->
        <button @click="() => startNewShift()" class="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          Nuevo Turno
        </button>
        <button
          @click="shareShiftTasks"
          title="Compartir Tareas del Turno"
          class="p-2 bg-teal-500 text-white rounded-md shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
        </button>
      </div>
      <div> <!-- Grupo para Borrar Todo (se empujará a la derecha) -->
        <button 
          @click="deleteAllTasks"
          class="px-6 py-2 bg-red-700 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
          Borrar Todo
        </button>
      </div>
      <!-- Input de archivo oculto -->
      <input type="file" ref="fileImportInputRef" @change="importTasksFromJson" accept=".json" class="hidden" />
    </div>
  </div>
</template>
