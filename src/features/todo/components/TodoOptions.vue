<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits(['openModal']);

</script>

<template>
  <div class="flex justify-end mb-4">
    <button
      @click="emit('openModal')"
      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      + Nueva Tarea
    </button>
  </div>
</template>
