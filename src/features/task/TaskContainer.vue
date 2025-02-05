<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TaskList from './components/TaskList.vue'
import TaskCreateModal from './components/TaskCreateModal.vue'
import TaskUpdateModal from './components/TaskUpdateModal.vue'
import { getTasks, createTask, updateTask, deleteTask } from './service'
import type { Task } from './model'

const tasks = ref<Task[]>([])
const isCreateModalVisible = ref(false)
const isUpdateModalVisible = ref(false)
const selectedTask = ref<Task | null>(null)

const fetchTasks = async () => {
  try {
    tasks.value = await getTasks()
  } catch (error) {
    console.error('Error al obtener tareas:', error)
  }
}

onMounted(fetchTasks)

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
    await createTask(formData)
    await fetchTasks()
  } catch (error) {
    console.error('Error al agregar la tarea:', error)
  }
}

const handleUpdateTask = async (formData: FormData) => {
  try {
    const id = formData.get('id') as string
    await updateTask(id, formData)
    await fetchTasks()
  } catch (error) {
    console.error('Error al actualizar la tarea:', error)
  }
}

const handleDeleteTask = async (id: string) => {
  try {
    await deleteTask(id)
    await fetchTasks()
  } catch (error) {
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
