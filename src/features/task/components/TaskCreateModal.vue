<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import FileUpload, { type FileUploadSelectEvent } from 'primevue/fileupload'
import Button from 'primevue/button'
import Chip from 'primevue/chip'
import { getUsers } from '@/features/users/service'
import type { CreateTaskDTO } from '../model'
import type { User } from '@/features/users/model'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits(['close', 'add'])

const newTask = ref<CreateTaskDTO>({
  title: '',
  description: '',
  status: false,
  user_id: '',
  files: [],
})

const users = ref<User[]>([])

onMounted(async () => {
  try {
    users.value = (await getUsers()) ?? []
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    users.value = []
  }
})

const handleFileUpload = (event: FileUploadSelectEvent) => {
  const selectedFiles = Array.isArray(event.files) ? event.files : [event.files]
  newTask.value.files = [...(newTask.value.files ?? []), ...selectedFiles] // ✅ Corrige la operación de esparcimiento
}

const removeFile = (index: number) => {
  newTask.value.files = (newTask.value.files ?? []).filter((_, i) => i !== index) // ✅ Previene errores
}

const addTask = () => {
  if (newTask.value.title && newTask.value.description && newTask.value.user_id) {
    const formData = new FormData()
    formData.append('title', newTask.value.title)
    formData.append('description', newTask.value.description)
    formData.append('status', (newTask.value.status ?? false).toString())
    formData.append('user_id', newTask.value.user_id)

    ;(newTask.value.files ?? []).forEach((file: File) => {
      formData.append('files', file)
    })

    emit('add', formData)
    emit('close')
  }
}
</script>

<template>
  <Dialog
    modal
    header="📝 Crear Tarea"
    :visible="props.visible"
    @update:visible="(value: boolean) => !value && emit('close')"
    class="p-4 rounded-xl shadow-xl"
    :style="{ width: '400px' }"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
  >
    <div class="space-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Título</label>
        <InputText
          id="title"
          v-model="newTask.title"
          class="w-full"
          placeholder="Título de la tarea"
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
        <Textarea
          id="description"
          v-model="newTask.description"
          class="w-full"
          placeholder="Descripción de la tarea"
        />
      </div>

      <div>
        <label for="user" class="block text-sm font-medium text-gray-700">Asignar a:</label>
        <Dropdown
          id="user"
          v-model="newTask.user_id"
          :options="users"
          optionLabel="name"
          optionValue="id"
          placeholder="Seleccionar usuario"
          class="w-full"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Archivos</label>
        <FileUpload
          mode="basic"
          name="files"
          multiple
          auto
          chooseLabel="Seleccionar archivos"
          @select="handleFileUpload"
          class="w-full border p-2 rounded"
        />

        <!-- ✅ Chips para mostrar archivos seleccionados -->
        <div class="flex flex-wrap gap-2 mt-2">
          <Chip
            v-for="(file, index) in newTask.files"
            :key="index"
            :label="file.name"
            removable
            @remove="removeFile(index)"
            class="bg-blue-100 text-blue-800 px-2 py-1 rounded-md"
          />
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          class="p-button-outlined p-button-secondary"
          @click="emit('close')"
        />
        <Button label="Agregar" icon="pi pi-check" class="p-button-success" @click="addTask" />
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.p-button-success {
  background-color: #22c55e;
  border-color: #22c55e;
}
.p-button-success:hover {
  background-color: #16a34a;
  border-color: #16a34a;
}
</style>
