<script setup lang="ts">
import { ref } from 'vue'
import type { Task } from '../model'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Paginator from 'primevue/paginator'

const props = defineProps<{ tasks: Task[] }>()
const emit = defineEmits(['edit', 'delete'])

const first = ref(0)
const rows = ref(5)

const paginatedTasks = (tasks: Task[]) => {
  return tasks.slice(first.value, first.value + rows.value)
}
</script>

<template>
  <div class="w-full rounded-lg shadow-md overflow-hidden bg-white p-3">
    <DataTable
      :value="paginatedTasks(props.tasks)"
      stripedRows
      responsiveLayout="scroll"
      class="p-datatable-sm"
    >
      <Column field="title" header="Título" sortable class="font-semibold"></Column>
      <Column field="description" header="Descripción" sortable></Column>

      <Column field="status" header="Estado">
        <template #body="slotProps">
          {{ slotProps.data.status ? '✅ Completada' : '⏳ Pendiente' }}
        </template>
      </Column>

      <Column field="user.name" header="Asignado a">
        <template #body="slotProps">
          {{ slotProps.data.user.name }}
        </template>
      </Column>

      <!-- ✅ Columna para mostrar archivos -->
      <Column header="Archivos">
        <template #body="slotProps">
          <div class="flex flex-col gap-1">
            <template v-if="slotProps.data.files.length > 0">
              <a
                v-for="(file, index) in slotProps.data.files"
                :key="index"
                :href="file"
                target="_blank"
                class="text-blue-600 hover:underline"
              >
                📎 Archivo {{ index + 1 }}
              </a>
            </template>
            <span v-else class="text-gray-400 italic">Sin archivos</span>
          </div>
        </template>
      </Column>

      <Column header="Acciones" style="width: 160px">
        <template #body="slotProps">
          <div class="flex space-x-4">
            <Button
              icon="pi pi-pencil"
              class="p-button-warning p-button-sm bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              @click="emit('edit', slotProps.data)"
            />

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
      :totalRecords="props.tasks.length"
      :rowsPerPageOptions="[5, 10, 20]"
      @page="(event) => (first = event.first)"
      class="bg-gray-50 border-t border-gray-200 p-4"
    ></Paginator>
  </div>
</template>

<style scoped>
.p-datatable-sm .p-datatable-tbody > tr:hover {
  background-color: #f0f4ff;
}
</style>
