<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserList from './components/UserList.vue'
import UserCreateModal from './components/UserCreateModal.vue'
import UserUpdateModal from './components/UserUpdateModal.vue'
import { getUsers, createUser, updateUser, deleteUser } from './service'
import type { User, CreateUserDTO, UpdateUserDTO } from './model'
import { useUserStore } from './store/userStore'

const users = ref<User[]>([])
const userStore = useUserStore()

// Función para obtener usuarios
const fetchUsers = async () => {
  try {
    const response = await getUsers()
    users.value = response?.users ?? []
  } catch (error) {
    console.error('Error al obtener los usuarios:', error)
  }
}

// Funciones para operaciones CRUD
const addUser = async (userData: CreateUserDTO) => {
  try {
    await createUser(userData)
    await fetchUsers() // Refrescar la lista después de crear
  } catch (error) {
    console.error('Error al crear el usuario:', error)
  }
}

const updateUserById = async (id: string, userData: UpdateUserDTO) => {
  try {
    await updateUser(id, userData)
    await fetchUsers() // Refrescar la lista después de actualizar
  } catch (error) {
    console.error('Error al actualizar el usuario:', error)
  }
}

const deleteUserById = async (id: string) => {
  try {
    await deleteUser(id)
    await fetchUsers() // Refrescar la lista después de eliminar
  } catch (error) {
    console.error('Error al eliminar el usuario:', error)
  }
}

onMounted(fetchUsers)
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6 max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-3xl font-bold">Gestión de Usuarios</h1>
      <button
        @click="userStore.openCreateModal"
        class="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-300"
      >
        Crear Usuario
      </button>
    </div>

    <UserList
      :key="users.length"
      :users="users"
      @edit="userStore.openUpdateModal"
      @delete="deleteUserById"
    />

    <UserCreateModal
      :visible="userStore.isCreateModalVisible"
      @close="userStore.closeCreateModal"
      @add="addUser"
    />

    <UserUpdateModal
      v-if="userStore.selectedUser"
      :user="userStore.selectedUser"
      :visible="userStore.isUpdateModalVisible"
      @close="userStore.closeUpdateModal"
      @update="updateUserById"
    />
  </div>
</template>
