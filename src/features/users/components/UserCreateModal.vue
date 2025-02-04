<script setup lang="ts">
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import type { CreateUserDTO } from '../model'

const props = defineProps<{ visible: boolean }>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'add', user: CreateUserDTO): void
}>()

const newUser = ref<CreateUserDTO>({ name: '', email: '' })

const addUser = () => {
  if (newUser.value.name && newUser.value.email) {
    emit('add', { ...newUser.value })
    newUser.value = { name: '', email: '' }
    emit('close')
  }
}
</script>

<template>
  <Dialog
    modal
    header="👤 Agregar Usuario"
    :visible="props.visible"
    @update:visible="(value: boolean) => !value && emit('close')"
    class="p-4 rounded-xl shadow-xl"
    :style="{ width: '400px' }"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
  >
    <div class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
        <InputText id="name" v-model="newUser.name" class="w-full" placeholder="Nombre completo" />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Correo</label>
        <InputText
          id="email"
          v-model="newUser.email"
          class="w-full"
          placeholder="Correo electrónico"
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
        <Button label="Agregar" icon="pi pi-user-plus" class="p-button-success" @click="addUser" />
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
