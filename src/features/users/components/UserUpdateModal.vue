<script setup lang="ts">
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import type { User, UpdateUserDTO } from '../model'
import { updateUser } from '../service'

const props = defineProps<{
  user: User
  visible: boolean
}>()

const emit = defineEmits(['update:visible', 'user-updated'])
const localUser = ref<User>({ ...props.user })

const handleUpdateUser = async () => {
  try {
    const updatedUser = await updateUser(localUser.value.id, {
      name: localUser.value.name,
      email: localUser.value.email,
    } as UpdateUserDTO)
    emit('user-updated', updatedUser)
    emit('update:visible', false)
  } catch (error) {
    console.error('Error al actualizar el usuario:', error)
  }
}

watch(
  () => props.user,
  (newUser) => {
    localUser.value = { ...newUser }
  },
  { immediate: true },
)
</script>

<template>
  <Dialog
    :visible="visible"
    @update:visible="(value: boolean) => emit('update:visible', value)"
    modal
    header="✏️ Editar Usuario"
    class="p-4 rounded-xl shadow-lg"
    :style="{ width: '400px' }"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
  >
    <form @submit.prevent="handleUpdateUser" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
        <InputText
          id="name"
          v-model="localUser.name"
          class="w-full"
          placeholder="Nombre completo"
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Correo</label>
        <InputText
          id="email"
          v-model="localUser.email"
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
          @click="emit('update:visible', false)"
        />
        <Button type="submit" label="Guardar" icon="pi pi-check" class="p-button-success" />
      </div>
    </form>
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
