<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import FileUpload, { type FileUploadSelectEvent } from 'primevue/fileupload'
import Button from 'primevue/button'
import { getUsers } from '@/features/users/service'
import type { UpdateTaskDTO, Task } from '../model'
import type { User } from '@/features/users/model'

const props = defineProps<{ visible: boolean; task: Task }>()
const emit = defineEmits(['close', 'update'])

const updatedTask = ref<UpdateTaskDTO>({
  id: props.task.id,
  title: props.task.title,
  description: props.task.description,
  status: props.task.status,
  user_id: props.task.user.id,
  files: [],
})

const users = ref<User[]>([])

onMounted(async () => {
  try {
    users.value = (await getUsers()) ?? []
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
  }
})

watch(
  () => props.task,
  (newTask) => {
    updatedTask.value = {
      id: newTask.id,
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      user_id: newTask.user.id,
      files: [],
    }
  },
  { immediate: true },
)

const handleFileUpload = (event: FileUploadSelectEvent) => {
  updatedTask.value.files = Array.isArray(event.files) ? event.files : [event.files]
}

const updateTask = () => {
  if (updatedTask.value.title && updatedTask.value.description && updatedTask.value.user_id) {
    const formData = new FormData()
    formData.append('id', updatedTask.value.id)
    formData.append('title', updatedTask.value.title)
    formData.append('description', updatedTask.value.description)
    formData.append('status', (updatedTask.value.status ?? false).toString())
    formData.append('user_id', updatedTask.value.user_id)

    if (updatedTask.value.files && updatedTask.value.files.length > 0) {
      updatedTask.value.files.forEach((file) => {
        formData.append('files', file)
      })
    }

    emit('update', formData)
    emit('close')
  }
}
</script>

<template>
  <Dialog
    modal
    header="✏️ Editar Tarea"
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
          v-model="updatedTask.title"
          class="w-full"
          placeholder="Título de la tarea"
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
        <Textarea
          id="description"
          v-model="updatedTask.description"
          class="w-full"
          placeholder="Descripción de la tarea"
        />
      </div>

      <div>
        <label for="user" class="block text-sm font-medium text-gray-700">Asignar a:</label>
        <Dropdown
          id="user"
          v-model="updatedTask.user_id"
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
      </div>

      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          class="p-button-outlined p-button-secondary"
          @click="emit('close')"
        />
        <Button label="Guardar" icon="pi pi-check" class="p-button-success" @click="updateTask" />
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
