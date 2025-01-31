<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['close', 'create']);

const newTask = ref('');

const createTask = () => {
  if (newTask.value.trim()) {
    emit('create', newTask.value);
    newTask.value = '';
    emit('close'); // Cierra el modal después de agregar
  }
};
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-xl font-bold mb-4">Crear Nueva Tarea</h2>

      <input
        v-model="newTask"
        placeholder="Escribe la tarea..."
        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
      />

      <div class="flex justify-end mt-4 gap-2">
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
        >
          Cancelar
        </button>

        <button
          @click="createTask"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Agregar
        </button>
      </div>
    </div>
  </div>
</template>
