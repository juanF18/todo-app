<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isCollapsed = ref(false)

const navigate = (path: string) => {
  router.push(path)
}
</script>

<template>
  <aside
    :class="[
      'bg-gray-900 text-white h-{90vh} transition-all duration-300 shadow-xl rounded-xl',
      isCollapsed ? 'w-16' : 'w-64',
    ]"
    class="flex flex-col p-4 m-4"
  >
    <!-- Botón de colapsar -->
    <button
      @click="isCollapsed = !isCollapsed"
      class="mb-6 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex justify-center items-center transition-all"
    >
      ☰
    </button>

    <!-- Menú -->
    <nav class="flex flex-col space-y-2">
      <button
        @click="navigate('/')"
        class="p-3 rounded-lg hover:bg-gray-700 flex items-center justify-start transition-all"
        :class="isCollapsed ? 'justify-center' : 'justify-start'"
      >
        <span class="text-xl w-8 flex justify-center">📝</span>
        <span v-if="!isCollapsed" class="ml-4 text-base">Tareas</span>
      </button>
      <button
        @click="navigate('/users')"
        class="p-3 rounded-lg hover:bg-gray-700 flex items-center transition-all"
        :class="isCollapsed ? 'justify-center' : 'justify-start'"
      >
        <span class="text-xl w-8 flex justify-center">👤</span>
        <span v-if="!isCollapsed" class="ml-4 text-base">Usuarios</span>
      </button>
      <button
        @click="navigate('/about')"
        class="p-3 rounded-lg hover:bg-gray-700 flex items-center transition-all"
        :class="isCollapsed ? 'justify-center' : 'justify-start'"
      >
        <span class="text-xl w-8 flex justify-center">ℹ️</span>
        <span v-if="!isCollapsed" class="ml-4 text-base">Acerca de</span>
      </button>
    </nav>
  </aside>
</template>
