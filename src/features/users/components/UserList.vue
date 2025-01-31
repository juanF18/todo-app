<script setup lang="ts">
import type { User } from '../model'

defineProps<{ users: User[] }>()
</script>

<template>
  <ul class="space-y-2">
    <li
      v-for="user in users"
      :key="user.id"
      class="p-3 bg-gray-100 rounded-md shadow-sm flex justify-between"
    >
      <span>{{ user.name }} - {{ user.email }}</span>
    </li>
  </ul>
</template>
