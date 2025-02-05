<script setup lang="ts">
import type { User } from '../model'
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Paginator from 'primevue/paginator'
import type { PageState } from 'primevue/paginator'
import { useUserStore } from '../store/userStore'

const props = defineProps<{ users: User[] }>()
const userStore = useUserStore()

const first = ref(0)
const rows = ref(5)

const paginatedUsers = (users: User[]) => {
  return users.slice(first.value, first.value + rows.value)
}

const handleEdit = (user: User) => {
  userStore.openUpdateModal(user) // Usamos el store para abrir el modal
}

const emit = defineEmits(['delete'])
</script>

<template>
  <div class="w-full rounded-lg shadow-md overflow-hidden bg-white">
    <DataTable
      :value="paginatedUsers(props.users)"
      stripedRows
      responsiveLayout="scroll"
      class="p-datatable-sm"
    >
      <Column field="name" header="Nombre" sortable class="font-semibold"></Column>
      <Column field="email" header="Correo" sortable class="text-gray-600"></Column>

      <Column header="Acciones" style="width: 160px">
        <template #body="slotProps">
          <div class="flex space-x-4">
            <!-- Botón de Editar -->
            <Button
              icon="pi pi-pencil"
              class="p-button-warning p-button-sm bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              @click="handleEdit(slotProps.data)"
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

    <Paginator
      :first="first"
      :rows="rows"
      :totalRecords="props.users.length"
      :rowsPerPageOptions="[5, 10, 20]"
      @page="(event: PageState) => (first = event.first)"
      class="bg-gray-50 border-t border-gray-200 p-4"
    ></Paginator>
  </div>
</template>
