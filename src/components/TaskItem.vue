<script setup lang="ts">
// src/components/TaskItem.vue
// Componente que representa un único elemento de tarea en la lista.
// Permite la visualización, edición y gestión de estados de una tarea individual.
import type { PropType } from 'vue'
import { computed, ref, nextTick, watch } from 'vue'
import type { Task } from '../types/Task' // Importar la interfaz Task compartida
import { applyClockValueToDate, formatTaskDuration } from '@/domain/taskTime'

import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

// Props del componente.
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

// Emits para comunicar acciones al componente padre (TaskList.vue).
const emit = defineEmits(['finish-task', 'update-task', 'reactivate-task', 'delete-task'])

/**
 * Emite un evento para finalizar la tarea actual.
 */
const handleFinishTask = () => {
  emit('finish-task', props.task.id)
};
 
// --- Estados y refs para la edición en línea de los campos de la tarea ---
// Descripción
const isEditingDescription = ref(false)
const editableDescription = ref('')
const descriptionInputRef = ref<HTMLInputElement | null>(null)

// Hora de inicio
const isEditingStartTime = ref(false)
const editableStartTime = ref('') // Formato HH:MM
const startTimeInputRef = ref<HTMLInputElement | null>(null)

// Hora de finalización
const isEditingEndTime = ref(false)
const editableEndTime = ref('') // Formato HH:MM
const endTimeInputRef = ref<HTMLInputElement | null>(null)

// Técnico
const isEditingTechnician = ref(false)
const editableTechnician = ref('')
const technicianInputRef = ref<HTMLInputElement | null>(null) 
const notifiedIconBtnRef = ref<HTMLButtonElement | null>(null)
const pendingEditEndTimeAfterFinalize = ref(false)

/**
 * --- Funciones de Edición (Continuación) ---
 * --- Funciones de Edición ---
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

/**
 * Cancela la edición de la descripción (usado, por ejemplo, con la tecla Escape).
 */
const cancelEditDescription = () => {
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
  const newStartTime = applyClockValueToDate(props.task.startTime, editableStartTime.value)
  if (!newStartTime) {
    alert('Formato de hora inválido. Use HH:MM.')
    isEditingStartTime.value = false // Salir del modo edición
    return
  }

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

  const newEndTime = applyClockValueToDate(props.task.endTime, editableEndTime.value)
  if (!newEndTime) {
    alert('Formato de hora inválido. Use HH:MM.')
    isEditingEndTime.value = false // Salir del modo edición
    return
  }

  if (newEndTime.getTime() !== props.task.endTime.getTime()) {
    emit('update-task', { ...props.task, endTime: newEndTime })
  }
  isEditingEndTime.value = false
}

/**
 * --- Otras Funciones de Tarea ---
 * Emite un evento para reactivar la tarea actual.
 */
const handleReactivateTask = () => {
  emit('reactivate-task', props.task.id)
}

/**
 * Inicia el proceso de finalizar la tarea. Si la tarea se finaliza con éxito,
 * se activará el modo de edición para la hora de finalización a través de un watcher.
 */
const handleFinalizeAndEditEndTime = () => {
  if (!props.task.endTime) { // Solo si la tarea no está ya finalizada
    pendingEditEndTimeAfterFinalize.value = true;
    emit('finish-task', props.task.id); // Esto hará que App.vue ponga un endTime
  }
}

/**
 * --- Propiedades Computadas ---
 * Calcula y formatea la duración de la tarea.
 * Considera tareas que cruzan la medianoche.
 */
const formattedDuration = computed(() => {
  return formatTaskDuration(props.task.startTime, props.task.endTime, locale.value)
});

/**
 * Determina la clase de color de fondo para la barra de estado según el estado de la tarea.
 */
const statusColorClass = computed(() => {
  if (props.task.isNotified) {
    return 'bg-status-success dark:bg-status-success-dark'
  }
  if (props.task.endTime) {
    return 'bg-status-active dark:bg-status-active-dark'
  }
  return 'bg-status-inprogress dark:bg-status-inprogress-dark'
})

/**
 * Genera las clases dinámicas para la barra de estado vertical,
 * aplicando bordes redondeados si es el primer o último elemento de la lista.
 */
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

/**
 * --- Watchers ---
 * Observa cambios en `props.task.endTime`. Si la tarea se acaba de finalizar
 * y se había indicado `pendingEditEndTimeAfterFinalize`, inicia la edición de la hora de finalización.
 */
watch(() => props.task.endTime, (newEndTime, oldEndTime) => {
  if (pendingEditEndTimeAfterFinalize.value && newEndTime && (oldEndTime === undefined || oldEndTime === null)) {
    // La tarea se acaba de finalizar (endTime pasó de nulo/undefined a tener valor)
    // y estábamos esperando para editar.
    startEditEndTime();
    pendingEditEndTimeAfterFinalize.value = false;
  }
});

/**
 * --- Funciones de Interacción Adicionales ---
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
  if (window.confirm(t('dialog.task.confirmDelete', { description: props.task.description }))) {
    emit('delete-task', props.task.id);
  }
}


</script>

<template>
  <li class="flex flex-row text-sm relative overflow-hidden">
    <!-- Barra de estado vertical -->
    <div :class="['w-1 shrink-0 z-10', ...statusBarDynamicClasses]"></div>

    <!-- Contenido de la tarea -->
    <div class="flex-grow grid grid-cols-[1fr_auto_auto] items-center gap-x-2 py-1 px-3">

      <!-- Fila 1 / Celda 1: Descripción -->
      <div class="min-w-0 col-start-1 row-start-1 self-end">
          <div class="py-0.5">
            <template v-if="isEditingDescription">
              <input
                ref="descriptionInputRef"
                type="text"
                v-model="editableDescription"
                @keyup.enter="saveDescription"
                @blur="saveDescription"
                @keyup.esc="cancelEditDescription"
                class="font-semibold text-sm text-text-main dark:text-main-dark p-1 border border-divider dark:border-divider-dark rounded-md w-full 
                       focus:ring-1 focus:ring-accent-main focus:border-accent-main transition-all duration-300 ease-in-out
                       bg-surface-1 dark:bg-surface-1-dark"
              />
            </template>
            <template v-else>
              <p v-cancel-touch-click @click="startEditDescription" class="font-medium text-sm text-text-main dark:text-main-dark cursor-pointer hover:bg-surface-hover dark:hover:bg-surface-hover-dark p-1 -m-1 rounded-md break-words leading-tight">
                {{ task.description || t('task.noDescription') }}
              </p>
            </template>
          </div>
      </div>

      <!-- Fila 1 / Celda 2: Horas -->
      <div class="col-start-2 row-start-1 self-end justify-self-end grid grid-cols-[auto_min-content_auto] items-center gap-x-1 text-xs">
          <div class="min-w-[32px] text-center">
            <template v-if="isEditingStartTime">
              <input ref="startTimeInputRef" type="time" v-model="editableStartTime" @keyup.enter="saveStartTime" @blur="saveStartTime" 
                     class="text-text-main/90 dark:text-main-dark p-0.5 border border-divider dark:border-divider-dark rounded-md w-[68px] text-xs 
                            focus:ring-1 focus:ring-accent-main focus:border-accent-main transition-all duration-300 ease-in-out
                            bg-surface-1 dark:bg-surface-1-dark"/>
            </template>
            <template v-else>
              <span v-cancel-touch-click @click="startEditStartTime" class="text-text-main/90 dark:text-main-dark cursor-pointer hover:bg-surface-hover dark:hover:bg-surface-hover-dark p-1 -m-1 rounded-md">
                {{ task.startTime.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }) }}
              </span>
            </template>
          </div>
          <span class="text-text-subtle dark:text-subtle-dark"> - </span>
          <div class="min-w-[32px] text-center">
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
                           class="text-success-strong p-0.5 border border-divider dark:border-divider-dark rounded-md w-[68px] text-xs 
                                  focus:ring-1 focus:ring-accent-main focus:border-accent-main transition-all duration-300 ease-in-out
                                  bg-surface-1 dark:bg-surface-1-dark"/>
                  </template>
                  <template v-else>
                    <span v-cancel-touch-click @click="startEditEndTime"
                          class="text-success-strong dark:text-success-strong-dark cursor-pointer hover:bg-surface-hover dark:hover:bg-surface-hover-dark p-1 -m-1 rounded-md">
                      {{ task.endTime.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }) }}
                    </span>
                  </template>
                </template>
                <template v-else>
                  <span v-cancel-touch-click @click="handleFinalizeAndEditEndTime" class="text-icon-muted dark:text-icon-muted-dark cursor-pointer hover:bg-surface-hover dark:hover:bg-surface-hover-dark p-1 -m-1 rounded-md">--:--</span>
                </template>
              </div>
            </Transition>
          </div>
      </div>

      <!-- Fila 1 / Celda 3: Botón Acción Principal -->
      <div class="col-start-3 row-start-1 self-end w-[88px]"> <!-- Ancho fijo para el botón para consistencia -->
          <Transition
            name="button-swap"
            mode="out-in"
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-50 scale-90"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-50 scale-90"
          >
            <button v-if="!task.endTime" v-cancel-touch-click @click="handleFinishTask" 
                    class="w-full px-2 py-0.5 
                          text-icon-alert dark:text-icon-alert-dark text-xs font-semibold
                          rounded-md
                          focus:outline-none
                          transition-all duration-300 ease-in-out active:scale-95 transform [-webkit-tap-highlight-color:transparent]
                          flex items-center justify-center gap-1
                          bg-status-alert dark:bg-status-alert-dark
                          active:bg-status-alert-hover dark:active:bg-status-alert-dark-hover
                          md:hover:bg-status-alert-hover dark:md:hover:bg-status-alert-dark-hover">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                <path d="M3.5 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-4.392l1.657-.348a6.723 6.723 0 016.271 1.719 2.25 2.25 0 003.914 0 6.723 6.723 0 016.271-1.719l1.657.348A.75.75 0 0018 12.25v-2.5a.75.75 0 00-.501-.712l-1.657-.348a6.723 6.723 0 01-6.271-1.719A2.25 2.25 0 005.657 5.25a6.723 6.723 0 01-2.157-.442V2.75z" />
              </svg>
              <span>{{ t('task.action.finish') }}</span>
            </button>
            <button v-else v-cancel-touch-click @click="handleReactivateTask" 
                    class="w-full px-2 py-0.5 
                          text-icon-active dark:text-icon-active-dark text-xs font-semibold
                          rounded-md
                          focus:outline-none focus:ring-1 
                          focus:ring-status-active dark:focus:ring-status-active-dark focus:ring-offset-1
                          transition-all duration-300 ease-in-out active:scale-95 transform
                          flex items-center justify-center gap-1
                          bg-status-active dark:bg-status-active-dark
                          active:bg-status-active-hover dark:active:bg-status-active-dark-hover
                          md:hover:bg-status-active-hover dark:md:hover:bg-status-active-dark-hover">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                <path fill-rule="evenodd" d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h6.128a5.5 5.5 0 110 11H5.75a.75.75 0 010-1.5h3.999a4 4 0 100-8H3.622l4.146 4.023a.75.75 0 11-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z" clip-rule="evenodd" />
              </svg>
              <span>{{ t('task.action.reopen') }}</span>
            </button>
          </Transition>
      </div>

      <!-- Fila 2 / Celda 1: Técnico -->
      <div class="min-w-0 col-start-1 row-start-2 text-xs self-start pt-1">
          <!-- Técnico -->
          <div class="min-w-0">
            <template v-if="isEditingTechnician">
              <input type="text" ref="technicianInputRef" v-model="editableTechnician" @keyup.enter="saveTechnician" @blur="saveTechnician" 
                     class="text-xs text-text-main dark:text-main-dark p-0.5 border border-divider dark:border-divider-dark rounded-md w-full 
                            focus:ring-1 focus:ring-accent-main focus:border-accent-main transition-all duration-300 ease-in-out
                            bg-surface-1 dark:bg-surface-1-dark"/>
            </template>
            <template v-else>
              <p v-cancel-touch-click @click="startEditTechnician" class="cursor-pointer hover:bg-surface-hover dark:hover:bg-surface-hover-dark p-1 -m-0.5 rounded-md truncate">
                <span v-if="task.technician" class="text-text-subtle dark:text-subtle-dark">{{ task.technician }}</span>
                <span v-else class="text-icon-muted dark:text-icon-muted-dark italic">{{ t('task.assignee.add') }}</span>
              </p>
            </template>
          </div>
      </div>

      <!-- Fila 2 / Celda 2: Duración -->
      <div class="col-start-2 row-start-2 justify-self-end self-start pt-1">
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
               class="text-xs font-semibold text-text-main/70 dark:text-main-dark/70
                      bg-surface-hover dark:bg-surface-hover-dark border border-divider dark:border-divider-dark rounded px-2 py-0.5 whitespace-nowrap">
              {{ formattedDuration }}
            </p>
          </Transition>
      </div>
      <!-- Fila 2 / Celda 3: Botones Secundarios -->
      <div class="col-start-3 row-start-2 flex items-center justify-evenly w-full self-start pt-1">
          <!-- Icono Notificado -->
          <button 
            ref="notifiedIconBtnRef"
            v-cancel-touch-click
            @click="toggleNotifiedStatus" 
            :title="task.isNotified ? t('tooltip.task.unregistered') : t('tooltip.task.registered')"
            class="btn-icon-success"
            :aria-label="t('aria.task.state')"
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
                   class="h-5 w-5 text-icon-success dark:text-icon-success-dark" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <svg v-else 
                   key="unnotified-icon" 
                   xmlns="http://www.w3.org/2000/svg" 
                   class="h-5 w-5 text-icon-muted dark:text-icon-muted-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Transition>
          </button>
          <!-- Botón Eliminar Tarea -->
          <button
            v-cancel-touch-click
            @click="handleDeleteTask"
            :title="t('tooltip.task.delete')"
            class="btn-icon-alert"
            :aria-label="t('aria.task.delete')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-status-alert dark:text-status-alert-dark" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
      </div>
    </div>
  </li>
</template>
