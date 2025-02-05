<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserList from './components/UserList.vue'
import UserCreateModal from './components/UserCreateModal.vue'
import UserUpdateModal from './components/UserUpdateModal.vue'
import { getUsers, createUser, updateUser, deleteUser } from './service'
import type { User, CreateUserDTO, UpdateUserDTO } from './model'
import { useUserStore } from './store/userStore'
import { showToast } from '@/utils/toastUtil'

const users = ref<User[]>([])
const userStore = useUserStore()

const fetchUsers = async () => {
  try {
    const response = await getUsers()
    users.value = response ?? []
  } catch (error) {
    showToast({
      type: 'error',
      message: 'Error al obtener los usuarios.',
    })
    console.error('Error al obtener los usuarios:', error)
  }
}

onMounted(fetchUsers)

const handleAddUser = async (userData: CreateUserDTO) => {
  try {
    const response = await createUser(userData)

    if (response.status === 201) {
      showToast({ message: '✅ Usuario creado exitosamente.' })
      await fetchUsers()
      userStore.closeCreateModal()
      return
    }
  } catch (error) {
    showToast({
      type: 'error',
      message: '❌ No se pudo crear el usuario. Intenta de nuevo más tarde.',
    })
    console.error('Error al crear el usuario:', error)
  }
}

const handleUpdateUser = async (id: string, userData: UpdateUserDTO) => {
  try {
    const response = await updateUser(id, userData)

    if (response.status === 200) {
      showToast({ message: '✅ Usuario actualizado exitosamente.' })
      await fetchUsers()
      userStore.closeUpdateModal()
      return
    }
  } catch (error) {
    showToast({
      type: 'error',
      message: '❌ No se pudo actualizar el usuario. Intenta de nuevo más tarde.',
    })
    console.error('Error al actualizar el usuario:', error)
  }
}

const handleDeleteUser = async (id: string) => {
  try {
    const response = await deleteUser(id)

    if (response.status === 200 || response.status === 204) {
      await fetchUsers()
      showToast({ message: '🗑️ Usuario eliminado exitosamente.' })
      return
    }
  } catch (error) {
    showToast({
      type: 'error',
      message: '❌ No se pudo eliminar el usuario. Intenta de nuevo más tarde.',
    })
    console.error('Error al eliminar el usuario:', error)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6 max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-3xl font-bold">Gestión de Usuarios</h1>
      <button
        @click="userStore.openCreateModal"
        class="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition duration-300"
      >
        ➕ Crear Usuario
      </button>
    </div>

    <UserList
      :key="users.length"
      :users="users"
      @edit="userStore.openUpdateModal"
      @delete="handleDeleteUser"
    />

    <UserCreateModal
      :visible="userStore.isCreateModalVisible"
      @close="userStore.closeCreateModal"
      @add="handleAddUser"
    />

    <UserUpdateModal
      v-if="userStore.selectedUser"
      :user="userStore.selectedUser"
      :visible="userStore.isUpdateModalVisible"
      @close="userStore.closeUpdateModal"
      @update="handleUpdateUser"
    />
  </div>
</template>
