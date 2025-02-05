<script setup lang="ts">
import { ref, watch } from 'vue'
import Dropdown from 'primevue/dropdown'
import DatePicker from 'primevue/datepicker' // ✅ Importar DatePicker
import Button from 'primevue/button'
import { useTaskFilterStore } from '../store/taskFilterStore'

const filterStore = useTaskFilterStore()

const statusOptions = [
  { label: 'Todos', value: null },
  { label: '⏳ Pendiente', value: false },
  { label: '✅ Completada', value: true },
]

// ✅ Fechas individuales para inicio y fin
const startDate = ref<Date | null>(null)
const endDate = ref<Date | null>(null)

// ✅ Reactividad para las fechas
watch([startDate, endDate], ([start, end]) => {
  filterStore.setDateRange(start, end)
})
</script>

<template>
  <div class="flex gap-4 items-center p-4 bg-gray-100 rounded-md shadow-sm">
    <!-- Filtro por Estado -->
    <Dropdown
      v-model="filterStore.status"
      :options="statusOptions"
      optionLabel="label"
      optionValue="value"
      placeholder="Filtrar por estado"
      class="w-48"
    />

    <!-- ✅ Filtro por Fecha de Inicio -->
    <DatePicker
      v-model="startDate"
      dateFormat="yy-mm-dd"
      placeholder="Fecha de inicio"
      class="w-40"
    />

    <!-- ✅ Filtro por Fecha de Fin -->
    <DatePicker v-model="endDate" dateFormat="yy-mm-dd" placeholder="Fecha de fin" class="w-40" />

    <!-- Botón para Resetear Filtros -->
    <Button
      label="Restablecer"
      icon="pi pi-filter-slash"
      class="p-button-secondary"
      @click="
        () => {
          filterStore.resetFilters()
          startDate = null
          endDate = null
        }
      "
    />
  </div>
</template>
