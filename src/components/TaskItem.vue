<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref, nextTick, watch } from 'vue'
import type { Task } from '../types/Task' // Importar la interfaz Task compartida

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true,
  },
})

const emit = defineEmits(['finish-task', 'update-task', 'reactivate-task', 'delete-task'])

/**
 * Emite un evento para finalizar la tarea actual.
 */
const handleFinishTask = () => {
  emit('finish-task', props.task.id) // Emitir con el ID de la tarea
};
 
// Estado y lógica para la edición de la descripción
const isEditingDescription = ref(false)
const editableDescription = ref('')
const descriptionInputRef = ref<HTMLInputElement | null>(null)

// Estado y lógica para la edición de la hora de inicio
const isEditingStartTime = ref(false)
const editableStartTime = ref('') // Formato HH:MM
const startTimeInputRef = ref<HTMLInputElement | null>(null)

// Estado y lógica para la edición de la hora de finalización
const isEditingEndTime = ref(false)
const editableEndTime = ref('') // Formato HH:MM
const endTimeInputRef = ref<HTMLInputElement | null>(null)
// Estado y lógica para la edición del técnico
const isEditingTechnician = ref(false)
const editableTechnician = ref('')
const technicianInputRef = ref<HTMLInputElement | null>(null) 
const notifiedIconBtnRef = ref<HTMLButtonElement | null>(null)
const pendingEditEndTimeAfterFinalize = ref(false)

/**
 * Inicia el modo de edición para la descripción de la tarea.
 */
const startEditDescription = () => {
  isEditingDescription.value = true
  editableDescription.value = props.task.description
  nextTick(() => {
    descriptionInputRef.value?.focus() // Enfocar el input después de que el DOM se actualice
  })
}

/**
 * Guarda la descripción editada de la tarea.
 * Emite 'update-task' si la descripción ha cambiado.
 */
const saveDescription = () => {
  const newDescription = editableDescription.value.trim()
  // Solo emitir si la descripción realmente cambió
  if (newDescription !== props.task.description) {
    emit('update-task', { ...props.task, description: newDescription })
  }
  isEditingDescription.value = false
}

const cancelEditDescription = () => { // Para la tecla Escape
  /**
   * Cancela la edición de la descripción.
   */
  isEditingDescription.value = false
  // No es necesario revertir editableDescription, se reiniciará la próxima vez
}

/**
 * Inicia el modo de edición para la hora de inicio de la tarea.
 */
const startEditStartTime = () => {
  isEditingStartTime.value = true
  // Formatear la hora actual a HH:MM para el input
  const hours = props.task.startTime.getHours().toString().padStart(2, '0')
  const minutes = props.task.startTime.getMinutes().toString().padStart(2, '0')
  editableStartTime.value = `${hours}:${minutes}`
  nextTick(() => {
    startTimeInputRef.value?.focus()
  })
}

/**
 * Guarda la hora de inicio editada de la tarea.
 * Emite 'update-task' si la hora ha cambiado.
 */
const saveStartTime = () => {
  const [hours, minutes] = editableStartTime.value.split(':').map(Number)
  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    alert('Formato de hora inválido. Use HH:MM.')
    isEditingStartTime.value = false // Salir del modo edición
    return
  }

  const newStartTime = new Date(props.task.startTime) // Clonar para no mutar la prop directamente
  newStartTime.setHours(hours, minutes, 0, 0) // Establecer nueva hora y minutos, segundos y ms a 0

  // Comprobar si la hora realmente cambió (comparando timestamps)
  if (newStartTime.getTime() !== props.task.startTime.getTime()) {
    emit('update-task', { ...props.task, startTime: newStartTime })
  }
  isEditingStartTime.value = false
}

/**
 * Inicia el modo de edición para el técnico de la tarea.
 */
const startEditTechnician = () => {
  isEditingTechnician.value = true
  editableTechnician.value = props.task.technician || '' // Usar '' si es undefined
  nextTick(() => {
    technicianInputRef.value?.focus() // Enfocar el input del técnico
  })
}

/**
 * Guarda el técnico editado de la tarea.
 * Emite 'update-task' si el técnico ha cambiado.
 */
const saveTechnician = () => {
  const newTechnician = editableTechnician.value.trim() || undefined // undefined si está vacío
  // Solo emitir si el técnico realmente cambió
  if (newTechnician !== props.task.technician) {
    emit('update-task', { ...props.task, technician: newTechnician })
  }
  isEditingTechnician.value = false
}

/**
 * Inicia el modo de edición para la hora de finalización de la tarea.
 */
const startEditEndTime = () => {
  if (!props.task.endTime) return // Solo editar si ya hay una hora de fin
  isEditingEndTime.value = true
  // Formatear la hora actual a HH:MM para el input
  const hours = props.task.endTime.getHours().toString().padStart(2, '0')
  const minutes = props.task.endTime.getMinutes().toString().padStart(2, '0')
  editableEndTime.value = `${hours}:${minutes}`
  nextTick(() => {
    endTimeInputRef.value?.focus()
  })
}

/**
 * Guarda la hora de finalización editada de la tarea.
 * Emite 'update-task' si la hora ha cambiado.
 */
const saveEndTime = () => {
  if (!props.task.endTime) return

  const [hours, minutes] = editableEndTime.value.split(':').map(Number)
  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    alert('Formato de hora inválido. Use HH:MM.')
    isEditingEndTime.value = false // Salir del modo edición
    return
  }

  const newEndTime = new Date(props.task.endTime) // Clonar para no mutar la prop directamente
  newEndTime.setHours(hours, minutes, 0, 0) // Establecer nueva hora y minutos, segundos y ms a 0

  if (newEndTime.getTime() !== props.task.endTime.getTime()) {
    emit('update-task', { ...props.task, endTime: newEndTime })
  }
  isEditingEndTime.value = false
}

/**
 * Emite un evento para reactivar la tarea actual.
 */
const handleReactivateTask = () => {
  emit('reactivate-task', props.task.id)
}

/**
 * Inicia el proceso de finalizar la tarea y luego editar la hora de finalización.
 */
const handleFinalizeAndEditEndTime = () => {
  if (!props.task.endTime) { // Solo si la tarea no está ya finalizada
    pendingEditEndTimeAfterFinalize.value = true;
    emit('finish-task', props.task.id); // Esto hará que App.vue ponga un endTime
  }
}

/**
 * Calcula y formatea la duración de la tarea.
 * Considera tareas que cruzan la medianoche.
 */
const formattedDuration = computed(() => {
  if (!props.task.endTime || !props.task.startTime) {
    return null
  }

  let endTimeMs = props.task.endTime.getTime()
  const startTimeMs = props.task.startTime.getTime()

  // Si la hora de fin es anterior a la de inicio, asumir que es del día siguiente
  if (endTimeMs < startTimeMs) {
    endTimeMs += 24 * 60 * 60 * 1000; // Añadir 24 horas en milisegundos
  }

  const durationMs = endTimeMs - startTimeMs
  const durationHours = durationMs / (1000 * 60 * 60)

  // Redondear por exceso al siguiente múltiplo de 0.5
  const roundedHours = Math.ceil(durationHours / 0.5) * 0.5

  // Formatear a un decimal, asegurando que .0 se muestre
  const displayHours = roundedHours.toFixed(1)

  return `${displayHours} h`
});

watch(() => props.task.endTime, (newEndTime, oldEndTime) => {
  if (pendingEditEndTimeAfterFinalize.value && newEndTime && (oldEndTime === undefined || oldEndTime === null)) {
    // La tarea se acaba de finalizar (endTime pasó de nulo/undefined a tener valor)
    // y estábamos esperando para editar.
    startEditEndTime();
    pendingEditEndTimeAfterFinalize.value = false;
  }
});

/**
 * Cambia el estado de 'notificado' de la tarea.
 */
const toggleNotifiedStatus = () => {
  // Asumimos que la interfaz Task tendrá un campo isNotified
  emit('update-task', { ...props.task, isNotified: !props.task.isNotified })
  // Quitar el foco del botón después del clic para evitar el outline persistente
  // Es posible que necesite un nextTick si el DOM no se actualiza a tiempo, pero probemos sin él primero.
  notifiedIconBtnRef.value?.blur()
}

/**
 * Pide confirmación y emite un evento para eliminar la tarea actual.
 */
const handleDeleteTask = () => {
  if (window.confirm(`¿Estás seguro de que quieres eliminar la tarea "${props.task.description}"?`)) {
    emit('delete-task', props.task.id);
  }
}


</script>

<template>
  <li class="bg-white p-4 rounded-lg shadow-sm mb-3 flex items-start">
    <!-- Columna de Descripción y Técnico (si no está finalizada) -->
    <div class="flex-grow pr-4 min-w-0"> <!-- Añadido min-w-0 -->
      <div class="mb-1">
        <template v-if="isEditingDescription">
          <input
            ref="descriptionInputRef"
            type="text"
            v-model="editableDescription"
            @keyup.enter="saveDescription"
            @blur="saveDescription"
            @keyup.esc="cancelEditDescription"
            class="font-semibold text-lg text-gray-800 p-1 border border-gray-300 rounded-md w-full"
          />
        </template>
        <template v-else>
          <p @click="startEditDescription" class="font-semibold text-lg text-gray-800 cursor-pointer hover:bg-gray-100 p-1 -m-1 rounded-md break-words">
            {{ task.description || '[Sin descripción]' }}
          </p>
        </template>
      </div>
    </div>

    <!-- Columna de Tiempos, Duración, Técnico (si está finalizada) -->
    <div class="flex-shrink-0 w-40 flex flex-col items-center space-y-1"> <!-- Centrado vertical y horizontal de los items de esta columna -->
      <!-- Línea de Tiempo: HH:MM - HH:MM -->
      <div class="flex justify-center items-center text-xs w-full"> <!-- w-full para que el justify-center funcione bien -->
        <div class="min-w-0 text-center"> <!-- text-center para el contenido del span/input -->
          <template v-if="isEditingStartTime">
            <input ref="startTimeInputRef" type="time" v-model="editableStartTime" @keyup.enter="saveStartTime" @blur="saveStartTime" class="text-gray-500 p-0.5 border border-gray-300 rounded-md w-16"/> <!-- Ancho fijo para input time -->
          </template>
          <template v-else>
            <span @click="startEditStartTime" class="text-gray-500 cursor-pointer hover:bg-gray-100 p-1 -m-1 rounded-md">{{ task.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</span>
          </template>
        </div>
        <span class="text-gray-500 mx-1"> - </span>
        <div class="min-w-0 text-center"> <!-- text-center para el contenido del span/input -->
          <template v-if="task.endTime">
            <template v-if="isEditingEndTime">
              <input ref="endTimeInputRef" type="time" v-model="editableEndTime" @keyup.enter="saveEndTime" @blur="saveEndTime" class="text-green-600 p-0.5 border border-gray-300 rounded-md w-16"/> <!-- Ancho fijo para input time -->
            </template>
            <template v-else>
              <span @click="startEditEndTime" class="text-green-600 cursor-pointer hover:bg-gray-100 p-1 -m-1 rounded-md">{{ task.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</span>
            </template>
          </template>
          <template v-else>
            <span @click="handleFinalizeAndEditEndTime" class="text-gray-400 cursor-pointer hover:bg-gray-100 p-1 -m-1 rounded-md">--:--</span>
          </template>
        </div>
      </div>

      <p v-if="formattedDuration" class="text-sm text-blue-600 font-semibold"> <!-- Aumentado a text-sm -->
        {{ formattedDuration }}
      </p>

      <!-- Mostrar técnico siempre en esta columna -->
      <div class="w-24 text-center"> <!-- Centrado el texto del técnico y quitado mb-1 ya que el checkbox se mueve -->
        <template v-if="isEditingTechnician">
          <input type="text" ref="technicianInputRef" v-model="editableTechnician" @keyup.enter="saveTechnician" @blur="saveTechnician" class="text-xs text-gray-600 p-1 border border-gray-300 rounded-md w-24"/> <!-- Ancho fijo para input text -->
        </template>
        <template v-else>
          <p @click="startEditTechnician" class="text-xs cursor-pointer hover:bg-gray-100 p-1 -m-1 rounded-md">
            <span v-if="task.technician" class="text-gray-700 break-words min-w-0">{{ task.technician }}</span>
            <span v-else class="text-gray-400 italic">---</span> 
          </p>
        </template>
      </div>

    </div>

    <!-- Columna para Botones y Checkbox Notificado -->
    <div class="ml-2 flex-shrink-0 w-20 flex flex-col items-center space-y-2">
      <button v-if="!task.endTime" @click="handleFinishTask" class="w-full px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-md hover:bg-red-600 text-center">
        Finalizar
      </button>
      <button v-else @click="handleReactivateTask" class="w-full px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-md hover:bg-yellow-600 text-center">
        Reabrir
      </button>
      <!-- Contenedor para iconos de Notificado y Eliminar en la misma línea -->
      <div class="flex justify-center space-x-2 mt-1"> <!-- mt-1 para separarlo del botón de arriba si space-y-2 no es suficiente -->
        <!-- Icono Notificado -->
        <button 
          ref="notifiedIconBtnRef"
          @click="toggleNotifiedStatus" 
          :title="task.isNotified ? 'Marcar como No Notificado' : 'Marcar como Notificado'"
          class="p-0.5 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 active:ring-0 active:ring-offset-0"
          aria-label="Estado de notificación"
        >
          <template v-if="task.isNotified">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </template>
          <template v-else>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </template>
        </button>
        <!-- Botón Eliminar Tarea -->
        <button
          @click="handleDeleteTask"
          title="Eliminar Tarea"
          class="p-0.5 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 active:ring-0 active:ring-offset-0"
          aria-label="Eliminar tarea"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </li>
</template>
