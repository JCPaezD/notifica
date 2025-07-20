<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 max-h-0"
    enter-to-class="opacity-100 max-h-[160px]"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 max-h-[160px]"
    leave-to-class="opacity-0 max-h-0"
  >
    <div
      v-if="!isHidden"
      class="bg-white rounded-xl p-3 shadow-sm w-full max-w-lg mb-4 border border-gray-200 overflow-hidden"
    >
      <div class="flex space-x-4 items-start">
        <div class="flex-grow">
          <textarea
            id="task-description"
            :value="modelValueDescription"
            @input="$emit('update:modelValueDescription', ($event.target as HTMLTextAreaElement).value)"
            @keyup.enter.prevent="$emit('submit')"
            placeholder="Nuevo aviso"
            rows="2"
            class="p-3 bg-white border border-slate-300 rounded-md shadow-sm 
                   focus:ring-2 focus:ring-accent-main focus:border-accent-main 
                   w-full text-base resize-none placeholder-text-main/70
                   transition-all duration-300 ease-in-out"
          ></textarea>
        </div>
        <div class="w-1/3 flex flex-col gap-2">
          <input
            type="text"
            id="task-technician"
            :value="modelValueTechnician"
            @input="$emit('update:modelValueTechnician', ($event.target as HTMLInputElement).value)"
            @keyup.enter="$emit('submit')"
            placeholder="Técnico(s)"
            class="p-1 
                   bg-white border border-slate-300 rounded-md shadow-sm 
                   focus:ring-2 focus:ring-accent-main focus:border-accent-main 
                   transition-all duration-300 ease-in-out
                   w-full text-sm placeholder-text-main/70"
          />
          <button
            @click="$emit('submit')"
            class="w-full px-3 py-1.5 
                   bg-accent-main text-text-on-pastel font-semibold 
                   rounded-md shadow-sm hover:bg-accent-main/80 
                   focus:outline-none active:scale-95
                   transition-all duration-300 ease-in-out 
                   flex items-center justify-center gap-2 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                 class="w-4 h-4">
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
</template>

<script setup lang="ts">
defineProps<{
  modelValueDescription: string
  modelValueTechnician: string
  isHidden?: boolean
}>()

defineEmits<{
  (e: 'update:modelValueDescription', value: string): void
  (e: 'update:modelValueTechnician', value: string): void
  (e: 'submit'): void
}>()
</script>
