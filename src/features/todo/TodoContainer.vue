<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTodoStore } from './store';
import { loadTodos } from './service/todoService';
import TaskModal from './components/TaskModal.vue';
import TodoOptions from './components/TodoOptions.vue';
import TodoList from './components/TodoList.vue';

const store = useTodoStore();
const showModal = ref(false);

const addTodo = (taskTitle: string) => {
  store.addTodo(taskTitle);
  showModal.value = false;
};

onMounted(loadTodos);
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
    <h2 class="text-2xl font-bold text-center mb-4">Lista de Tareas</h2>

    <!-- Opciones de Tareas (Botón para abrir el modal) -->
    <TodoOptions @openModal="showModal = true" />

    <!-- Modal de Creación de Tareas -->
    <TaskModal v-if="showModal" @close="showModal = false" @create="addTodo" />

    <!-- Lista de Tareas -->
    <TodoList
      :todos="store.todos"
      @toggle="store.toggleTodo"
      @remove="store.removeTodo"
    />
  </div>
</template>
