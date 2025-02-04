<script setup lang="ts">
import type { User } from '../model'
import { defineProps, defineEmits, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Paginator from 'primevue/paginator'
import type { PageState } from 'primevue/paginator' // Importamos el tipo PageState

defineProps<{ users: User[] }>()
const emit = defineEmits(['delete', 'edit'])

// Lógica de paginación
const first = ref(0) // Índice del primer elemento en la página actual
const rows = ref(5) // Número de filas por página

// Función para obtener los usuarios de la página actual
const paginatedUsers = (users: User[]) => {
  return users.slice(first.value, first.value + rows.value)
}
</script>

<template>
  <div class="w-full rounded-lg shadow-md overflow-hidden bg-white">
    <!-- Tabla -->
    <DataTable
      :value="paginatedUsers(users)"
      stripedRows
      responsiveLayout="scroll"
      class="p-datatable-sm"
    >
      <!-- Columna de Nombre -->
      <Column field="name" header="Nombre" sortable class="font-semibold"></Column>

      <!-- Columna de Correo -->
      <Column field="email" header="Correo" sortable class="text-gray-600"></Column>

      <!-- Columna de Acciones -->
      <Column header="Acciones" style="width: 160px">
        <template #body="slotProps">
          <div class="flex space-x-4">
            <!-- Botón de Editar -->
            <Button
              icon="pi pi-pencil"
              class="p-button-warning p-button-sm bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              @click="emit('edit', slotProps.data.id)"
            />

            <!-- Botón de Eliminar -->
            <Button
              icon="pi pi-trash"
              class="p-button-danger p-button-sm bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              @click="emit('delete', slotProps.data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>

    <!-- Paginación -->
    <Paginator
      :first="first"
      :rows="rows"
      :totalRecords="users.length"
      :rowsPerPageOptions="[5, 10, 20]"
      @page="(event: PageState) => (first = event.first)"
      class="bg-gray-50 border-t border-gray-200 p-4"
    ></Paginator>
  </div>
</template>
