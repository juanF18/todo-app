import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '../model'

export const useUserStore = defineStore('userStore', () => {
  const selectedUser = ref<User | null>(null)
  const isCreateModalVisible = ref(false)
  const isUpdateModalVisible = ref(false)

  const openCreateModal = () => {
    isCreateModalVisible.value = true
  }

  const closeCreateModal = () => {
    isCreateModalVisible.value = false
  }

  const openUpdateModal = (user: User) => {
    selectedUser.value = user
    isUpdateModalVisible.value = true
  }

  const closeUpdateModal = () => {
    isUpdateModalVisible.value = false
    selectedUser.value = null
  }

  return {
    selectedUser,
    isCreateModalVisible,
    isUpdateModalVisible,
    openCreateModal,
    closeCreateModal,
    openUpdateModal,
    closeUpdateModal,
  }
})
