<script setup lang="ts">
import type { Todo } from '../model';

defineProps<{todo: Todo}>();
defineEmits(['toggle', 'remove'])
</script>

<template>
  <li
    class="flex justify-between items-center p-3 bg-gray-100 rounded-md shadow-sm"
  >
    <div class="flex items-center">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="$emit('toggle', todo.id)"
        class="mr-2"
      />
      <span :class="{ 'line-through text-gray-500': todo.completed }">
        {{ todo.title }}
      </span>
    </div>
    <button
      @click="$emit('remove', todo.id)"
      class="text-red-500 hover:text-red-700"
    >
      ❌
    </button>
  </li>
</template>
