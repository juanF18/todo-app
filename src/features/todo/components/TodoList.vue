<script setup lang="ts">
import type { Todo } from '../model';
import TodoItem from './TodoItem.vue';

defineProps<{
  todos: Todo[];
}>();

const emit = defineEmits(['toggle', 'remove']);

</script>

<template>
  <ul class="space-y-2">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle="(id) => emit('toggle', id)"
      @remove="(id) => emit('remove', id)"
    />
  </ul>
</template>
