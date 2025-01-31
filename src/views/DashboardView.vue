<script setup lang="ts">
import SideMenu from '@/components/SideMenu.vue'
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <SideMenu />
    <main class="flex-1 bg-gray-100 p-6 overflow-auto">
      <router-view />
    </main>
  </div>
</template>
