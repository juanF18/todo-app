<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['close', 'add'])
const newUser = ref({ name: '', email: '' })

const addUser = () => {
  if (newUser.value.name && newUser.value.email) {
    emit('add', { ...newUser.value, id: String(Date.now()) })
    newUser.value = { name: '', email: '' }
    emit('close') // Cierra el modal
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-xl font-bold mb-4">Agregar Usuario</h2>

      <input
        v-model="newUser.name"
        placeholder="Nombre"
        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 mb-2"
      />
      <input
        v-model="newUser.email"
        placeholder="Correo"
        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
      />

      <div class="flex justify-end mt-4 gap-2">
        <button @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
          Cancelar
        </button>
        <button @click="addUser" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Agregar
        </button>
      </div>
    </div>
  </div>
</template>
