<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <!-- Fondo semitransparente -->
      <div
        class="fixed inset-0 bg-black/50 backdrop-blur-sm"
        @click="handleClose"
      ></div>

      <!-- Contenido del modal -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          class="relative z-50 max-w-md w-full rounded-2xl bg-ui-secondary p-6 shadow-xl"
          @click.stop
        >
          <slot />
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{
  open: boolean;
  onClose: () => void;
}>();

function handleClose() {
  props.onClose();
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    props.onClose();
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>
