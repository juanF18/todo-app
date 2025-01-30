<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTodoStore } from '../store';
import { loadTodos } from '../service/todoService';
import TodoItem from './TodoItem.vue';

const store = useTodoStore()
const newTodo = ref('')

const addTodo = () => {
  if(newTodo.value.trim()){
    store.addTodo(newTodo.value)
    newTodo.value = ''
  }
}

onMounted(loadTodos)
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
    <h2 class="text-2xl font-bold text-center mb-4">Lista de Tareas</h2>
    <div class="flex gap-2 mb-4">
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="Añadir tarea..."
        class="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
      />
      <button
        @click="addTodo"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Agregar
      </button>
    </div>
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
