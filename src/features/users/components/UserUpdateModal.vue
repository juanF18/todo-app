<script setup lang="ts">
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { getUsers, updateUser } from '../service'
import { useUserStore } from '../store/userStore'
import type { UpdateUserDTO } from '../model'

const userStore = useUserStore()

const localUser = ref({ name: '', email: '' })

watch(
  () => userStore.selectedUser,
  (newUser) => {
    if (newUser) {
      localUser.value = { ...newUser }
    }
  },
  { immediate: true },
)

const handleUpdateUser = async () => {
  try {
    if (userStore.selectedUser) {
      await updateUser(userStore.selectedUser.id, {
        name: localUser.value.name,
        email: localUser.value.email,
      } as UpdateUserDTO)
      await getUsers()
      userStore.closeUpdateModal()
    }
  } catch (error) {
    console.error('Error al actualizar el usuario:', error)
  }
}
</script>

<template>
  <Dialog
    :visible="userStore.isUpdateModalVisible"
    @update:visible="(value: boolean) => !value && userStore.closeUpdateModal()"
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
          @click="userStore.closeUpdateModal()"
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
