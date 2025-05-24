<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref, nextTick, watch } from 'vue'
import type { Task } from '../types/Task' // Importar la interfaz Task compartida

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true,
  },
  isFirst: {
    type: Boolean,
    default: false,
  },
  isLast: {
    type: Boolean,
    default: false,
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

  const startHours = props.task.startTime.getHours();
  const startMinutes = props.task.startTime.getMinutes();
  const endHours = props.task.endTime.getHours();
  const endMinutes = props.task.endTime.getMinutes();

  let startTotalMinutes = startHours * 60 + startMinutes;
  let endTotalMinutes = endHours * 60 + endMinutes;

  // Manejar el cruce de medianoche
  // Si la hora de finalización (en minutos desde la medianoche) es menor que la hora de inicio,
  // y las fechas son diferentes (o asumimos que si es menor, cruzó la medianoche si la fecha es la misma o posterior)
  // Para simplificar y enfocarnos solo en la diferencia horaria como si fuera en un lapso de <24h o cruzando una medianoche:
  if (endTotalMinutes < startTotalMinutes) {
    endTotalMinutes += 24 * 60; // Añadir 24 horas en minutos
  }

  const durationMinutes = endTotalMinutes - startTotalMinutes;
  const durationHours = durationMinutes / 60;

  // Redondear por exceso al siguiente múltiplo de 0.5
  const roundedHours = Math.ceil(durationHours / 0.5) * 0.5

  // Formatear a un decimal, asegurando que .0 se muestre
  const displayHours = roundedHours.toFixed(1)

  return `${displayHours} h`
});

const statusColorClass = computed(() => {
  if (props.task.isNotified) {
    return 'bg-emerald-300'; // Notificada
  }
  if (props.task.endTime) {
    return 'bg-yellow-300'; // Finalizada (y no notificada)
  }
  return 'bg-slate-300'; // En curso (ni finalizada ni notificada)
});

const statusBarDynamicClasses = computed(() => {
  const classes = [statusColorClass.value];
  if (props.isFirst) {
    classes.push('rounded-tl-md');
  }
  if (props.isLast) {
    classes.push('rounded-bl-md');
  }
  // Si es el único item (isFirst y isLast son true), ambas clases se aplicarán.
  // Si no es ni el primero ni el último, no se añaden redondeos verticales.
  return classes;
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
  <li class="flex flex-row text-sm relative overflow-hidden">
    <!-- Barra de estado vertical -->
    <div :class="['w-1', ...statusBarDynamicClasses]"></div>

    <!-- Contenido de la tarea -->
    <div class="flex-grow py-1 px-3 flex flex-col">
      <!-- Fila 1: Descripción, Horas, Botón Acción Principal -->
      <div class="flex items-center justify-between gap-x-2">
        <!-- Descripción -->
        <div class="flex-grow min-w-0">
          <div class="py-0.5">
            <template v-if="isEditingDescription">
              <input
                ref="descriptionInputRef"
                type="text"
                v-model="editableDescription"
                @keyup.enter="saveDescription"
                @blur="saveDescription"
                @keyup.esc="cancelEditDescription"
                class="font-semibold text-sm text-text-main p-1 border border-slate-300 rounded-md w-full 
                       focus:ring-1 focus:ring-accent-main focus:border-accent-main transition-all duration-300 ease-in-out"
              />
            </template>
            <template v-else>
              <p @click="startEditDescription" class="font-medium text-sm text-text-main cursor-pointer hover:bg-slate-100 p-1 -m-1 rounded-md break-words leading-tight">
                {{ task.description || '[Sin descripción]' }}
              </p>
            </template>
          </div>
        </div>

        <!-- Horas -->
        <div class="flex-shrink-0 grid grid-cols-[auto_min-content_auto] items-center gap-x-1 text-xs">
          <div class="min-w-[32px] text-center"> <!-- Ancho mínimo aún más reducido -->
            <template v-if="isEditingStartTime">
              <input ref="startTimeInputRef" type="time" v-model="editableStartTime" @keyup.enter="saveStartTime" @blur="saveStartTime" 
                     class="text-text-main/90 p-0.5 border border-slate-300 rounded-md w-[68px] text-xs 
                            focus:ring-1 focus:ring-accent-main focus:border-accent-main transition-all duration-300 ease-in-out"/>
            </template>
            <template v-else>
              <span @click="startEditStartTime" class="text-text-main/90 cursor-pointer hover:bg-slate-100 p-1 -m-1 rounded-md">{{ task.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</span>
            </template>
          </div>
          <span class="text-text-main/80"> - </span> <!-- mx-0.5 eliminado ya que gap-x-1 lo maneja -->
          <div class="min-w-[32px] text-center"> <!-- Ancho mínimo aún más reducido -->
            <Transition
              name="endtime-display-swap"
              mode="out-in"
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div :key="task.endTime ? 'time-value' : 'placeholder'" class="inline-block">
                <template v-if="task.endTime">
                  <template v-if="isEditingEndTime">
                    <input ref="endTimeInputRef" type="time" v-model="editableEndTime" @keyup.enter="saveEndTime" @blur="saveEndTime" 
                           class="text-emerald-600 p-0.5 border border-slate-300 rounded-md w-[68px] text-xs 
                                  focus:ring-1 focus:ring-accent-main focus:border-accent-main transition-all duration-300 ease-in-out"/>
                  </template>
                  <template v-else>
                    <span @click="startEditEndTime" 
                          class="text-emerald-600 cursor-pointer hover:bg-slate-100 p-1 -m-1 rounded-md">
                      {{ task.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                    </span>
                  </template>
                </template>
                <template v-else>
                  <span @click="handleFinalizeAndEditEndTime" class="text-text-main/50 cursor-pointer hover:bg-slate-100 p-1 -m-1 rounded-md">--:--</span>
                </template>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Botón Acción Principal -->
        <div class="flex-shrink-0 w-[88px]"> <!-- Ancho fijo para el botón para consistencia -->
          <Transition
            name="button-swap"
            mode="out-in"
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 scale-90"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-90"
          >
            <button v-if="!task.endTime" @click="handleFinishTask" 
                    class="w-full px-2 py-0.5 
                           bg-status-alert text-text-on-pastel text-xs font-semibold 
                           rounded-md hover:bg-red-400 
                           focus:outline-none focus:ring-1 focus:ring-status-alert focus:ring-offset-1 
                           transition-all duration-300 ease-in-out
                           active:scale-95 transform
                           flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                <path d="M3.5 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-4.392l1.657-.348a6.723 6.723 0 016.271 1.719 2.25 2.25 0 003.914 0 6.723 6.723 0 016.271-1.719l1.657.348A.75.75 0 0018 12.25v-2.5a.75.75 0 00-.501-.712l-1.657-.348a6.723 6.723 0 01-6.271-1.719A2.25 2.25 0 005.657 5.25a6.723 6.723 0 01-2.157-.442V2.75z" />
              </svg>
              <span>Finalizar</span>
            </button>
            <button v-else @click="handleReactivateTask" 
                    class="w-full px-2 py-0.5 
                           bg-status-active text-text-on-pastel text-xs font-semibold 
                           rounded-md hover:bg-yellow-300 
                           focus:outline-none focus:ring-1 focus:ring-status-active focus:ring-offset-1 
                           transition-all duration-300 ease-in-out 
                           active:scale-95 transform
                           flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                <path fill-rule="evenodd" d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h6.128a5.5 5.5 0 110 11H5.75a.75.75 0 010-1.5h3.999a4 4 0 100-8H3.622l4.146 4.023a.75.75 0 11-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z" clip-rule="evenodd" />
              </svg>
              <span>Reabrir</span>
            </button>
          </Transition>
        </div>
      </div>

      <!-- Fila 2: Técnico, Duración, Botones Secundarios -->
      <div class="flex items-center justify-between gap-x-2 mt-1"> <!-- mt reducido -->
        <!-- Técnico y Duración -->
        <!-- Técnico + Duración en misma fila con alineación opuesta -->
        <div class="flex-grow flex justify-between items-center min-w-0 text-xs">
          <!-- Técnico -->
          <div class="min-w-0">
            <template v-if="isEditingTechnician">
              <input type="text" ref="technicianInputRef" v-model="editableTechnician" @keyup.enter="saveTechnician" @blur="saveTechnician" 
                     class="text-xs text-text-main p-0.5 border border-slate-300 rounded-md w-full 
                            focus:ring-1 focus:ring-accent-main focus:border-accent-main transition-all duration-300 ease-in-out"/>
            </template>
            <template v-else>
              <p @click="startEditTechnician" class="cursor-pointer hover:bg-slate-100 p-0.5 -m-0.5 rounded-md truncate">
                <span v-if="task.technician" class="text-text-main/80">{{ task.technician }}</span>
                <span v-else class="text-gray-400 italic">Añadir técnico</span> 
              </p>
            </template>
          </div>

          <!-- Duración alineada derecha -->
          <Transition
            name="duration-fade"
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <p v-if="formattedDuration" 
               class="text-xs font-semibold text-text-main/70 
                      bg-slate-100 border border-slate-200 rounded 
                      px-2 py-0.5 ml-4 whitespace-nowrap mt-0.5">
              {{ formattedDuration }}
            </p>
          </Transition>
        </div>


        <!-- Botones Secundarios (Notificado y Eliminar) -->
        <div class="ml-auto flex items-center gap-2 flex-shrink-0"> <!-- ml-auto para empujar a la derecha, gap-2 -->
          <!-- Icono Notificado -->
          <button 
            ref="notifiedIconBtnRef"
            @click="toggleNotifiedStatus" 
            :title="task.isNotified ? 'Marcar como No Notificado' : 'Marcar como Notificado'"
            class="p-0.5 rounded-full hover:bg-slate-100 
                   focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-accent-main active:bg-slate-200 
                   transition-all duration-300 ease-in-out active:scale-95 transform"
            aria-label="Estado de notificación"
          >
            <Transition
              name="notified-icon-swap"
              mode="out-in"
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 scale-50"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-50"
            >
              <svg v-if="task.isNotified" 
                   key="notified-icon" 
                   xmlns="http://www.w3.org/2000/svg" 
                   class="h-5 w-5 text-status-success" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <svg v-else 
                   key="unnotified-icon" 
                   xmlns="http://www.w3.org/2000/svg" 
                   class="h-5 w-5 text-text-main/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Transition>
          </button>
          <!-- Botón Eliminar Tarea -->
          <button
            @click="handleDeleteTask"
            title="Eliminar Tarea"
            class="p-0.5 rounded-full hover:bg-slate-100 
                   focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-status-alert active:bg-slate-200 
                   transition-all duration-300 ease-in-out active:scale-95 transform"
            aria-label="Eliminar tarea"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-status-alert" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  </li>
</template>
