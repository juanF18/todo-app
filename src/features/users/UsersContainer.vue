<script setup lang="ts">
import { ref } from 'vue'
import UserList from './components/UserList.vue'
import UserModal from './components/UserModal.vue'

const users = ref([
  { id: '1', name: 'Juan Pérez', email: 'juan@example.com' },
  { id: '2', name: 'Ana Gómez', email: 'ana@example.com' },
])

const showModal = ref(false)

const addUser = (user: { id: string; name: string; email: string }) => {
  users.value.push(user)
  showModal.value = false
}
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
    <h2 class="text-2xl font-bold mb-4">Usuarios</h2>

    <!-- Botón para abrir el modal -->
    <div class="flex justify-end mb-4">
      <button
        @click="showModal = true"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        + Nuevo Usuario
      </button>
    </div>

    <!-- Modal de Creación de Usuarios -->
    <UserModal v-if="showModal" @close="showModal = false" @add="addUser" />

    <!-- Lista de Usuarios -->
    <UserList :users="users" />
  </div>
</template>
