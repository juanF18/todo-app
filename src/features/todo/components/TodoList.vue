<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTodoStore } from '../store';
import { loadTodos } from '../service/todoService';
import TodoItem from './TodoItem.vue';
import TaskModal from './TaskModal.vue';

const store = useTodoStore();
const showModal = ref(false); // Estado del modal

const addTodo = (taskTitle: string) => {
  store.addTodo(taskTitle);
  showModal.value = false; // Cierra el modal después de agregar
};

onMounted(loadTodos);
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
    <h2 class="text-2xl font-bold text-center mb-4">Lista de Tareas</h2>

    <!-- Botón para abrir el modal -->
    <div class="flex justify-end mb-4">
      <button
        @click="showModal = true"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        + Nueva Tarea
      </button>
    </div>

    <!-- Modal de Creación de Tareas -->
    <TaskModal v-if="showModal" @close="showModal = false" @create="addTodo" />

    <ul class="space-y-2">
      <TodoItem
        v-for="todo in store.todos"
        :key="todo.id"
        :todo="todo"
        @toggle="store.toggleTodo"
        @remove="store.removeTodo"
      />
    </ul>
  </div>
</template>
