<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import TaskList from './components/TaskList.vue'
import TaskCreateModal from './components/TaskCreateModal.vue'
import TaskUpdateModal from './components/TaskUpdateModal.vue'
import TaskFilters from './components/TaskFilter.vue'
import { getTasks, createTask, updateTask, deleteTask } from './service'
import type { Task } from './model'
import { showToast } from '@/utils/toastUtil'
import { useTaskFilterStore } from './store/taskFilterStore'

const tasks = ref<Task[]>([])
const isCreateModalVisible = ref(false)
const isUpdateModalVisible = ref(false)
const selectedTask = ref<Task | null>(null)
const filterStore = useTaskFilterStore()

const fetchTasks = async () => {
  try {
    const headers: Record<string, string> = {}

    if (filterStore.status !== null) {
      headers['x-status'] = filterStore.status.toString()
    }
    if (filterStore.startDate && filterStore.endDate) {
      headers['x-start-date'] = filterStore.startDate
      headers['x-end-date'] = filterStore.endDate
    }

    tasks.value = await getTasks(headers)
  } catch (error) {
    showToast({ type: 'error', message: '❌ Error al obtener las tareas.' })
    console.error('Error al obtener tareas:', error)
  }
}

onMounted(fetchTasks)

// 🔄 Reactividad para los filtros
watch(() => [filterStore.status, filterStore.startDate, filterStore.endDate], fetchTasks)

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

const handleAddTask = async (formData: FormData) => {
  try {
    const response = await createTask(formData)

    if (response.status === 201) {
      showToast({ message: '✅ Tarea creada exitosamente.' })
      await fetchTasks()
      closeCreateModal()
    }
  } catch (error) {
    showToast({
      type: 'error',
      message: '❌ No se pudo crear la tarea. Intenta de nuevo más tarde.',
    })
    console.error('Error al agregar la tarea:', error)
  }
}

const handleUpdateTask = async (formData: FormData) => {
  try {
    const id = formData.get('id') as string
    const response = await updateTask(id, formData)

    if (response.status === 200) {
      showToast({ message: '✅ Tarea actualizada exitosamente.' })
      await fetchTasks()
      closeUpdateModal()
    }
  } catch (error) {
    showToast({
      type: 'error',
      message: '❌ No se pudo actualizar la tarea. Intenta de nuevo más tarde.',
    })
    console.error('Error al actualizar la tarea:', error)
  }
}

const handleDeleteTask = async (id: string) => {
  try {
    const response = await deleteTask(id)

    if (response.status === 200 || response.status === 204) {
      showToast({ message: '🗑️ Tarea eliminada exitosamente.' })
      await fetchTasks()
    }
  } catch (error) {
    showToast({
      type: 'error',
      message: '❌ No se pudo eliminar la tarea. Intenta de nuevo más tarde.',
    })
    console.error('Error al eliminar la tarea:', error)
  }
}
</script>

<template>
  <div class="p-6 mx-auto">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">📋 Lista de Tareas</h1>
      <button
        class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        @click="openCreateModal"
      >
        ➕ Nueva Tarea
      </button>
    </div>
    <TaskFilters />

    <TaskList :tasks="tasks" @edit="openUpdateModal" @delete="handleDeleteTask" />

    <TaskCreateModal
      :visible="isCreateModalVisible"
      @close="closeCreateModal"
      @add="handleAddTask"
    />

    <TaskUpdateModal
      v-if="selectedTask"
      :visible="isUpdateModalVisible"
      :task="selectedTask"
      @close="closeUpdateModal"
      @update="handleUpdateTask"
    />
  </div>
</template>
