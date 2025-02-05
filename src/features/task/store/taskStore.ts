import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Task } from '../model'

export const useTaskStore = defineStore('taskStore', () => {
  const selectedTask = ref<Task | null>(null)
  const isCreateModalVisible = ref(false)
  const isUpdateModalVisible = ref(false)

  const openCreateModal = () => {
    isCreateModalVisible.value = true
  }

  const closeCreateModal = () => {
    isCreateModalVisible.value = false
  }

  const openUpdateModal = (task: Task) => {
    selectedTask.value = task
    isUpdateModalVisible.value = true
  }

  const closeUpdateModal = () => {
    isUpdateModalVisible.value = false
    selectedTask.value = null
  }

  return {
    selectedTask,
    isCreateModalVisible,
    isUpdateModalVisible,
    openCreateModal,
    closeCreateModal,
    openUpdateModal,
    closeUpdateModal,
  }
})
