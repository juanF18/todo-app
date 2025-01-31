<script setup lang="ts">
import { ref } from 'vue'

const users = ref([
  { id: '1', name: 'Juan Pérez', email: 'juan@example.com' },
  { id: '2', name: 'Ana Gómez', email: 'ana@example.com' },
])

const newUser = ref({ name: '', email: '' })

const addUser = () => {
  if (newUser.value.name && newUser.value.email) {
    users.value.push({
      id: String(Date.now()),
      name: newUser.value.name,
      email: newUser.value.email,
    })
    newUser.value = { name: '', email: '' }
  }
}
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
    <h2 class="text-2xl font-bold mb-4">Usuarios</h2>

    <!-- Formulario de Usuario -->
    <div class="flex gap-2 mb-4">
      <input
        v-model="newUser.name"
        placeholder="Nombre"
        class="px-4 py-2 border rounded-md flex-1"
      />
      <input
        v-model="newUser.email"
        placeholder="Correo"
        class="px-4 py-2 border rounded-md flex-1"
      />
      <button @click="addUser" class="px-4 py-2 bg-blue-500 text-white rounded-md">
        ➕
      </button>
    </div>

    <!-- Lista de Usuarios -->
    <ul class="space-y-2">
      <li
        v-for="user in users"
        :key="user.id"
        class="p-3 bg-gray-100 rounded-md shadow-sm flex justify-between"
      >
        <span>{{ user.name }} - {{ user.email }}</span>
      </li>
    </ul>
  </div>
</template>
