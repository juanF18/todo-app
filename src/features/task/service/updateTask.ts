import Axios from '@/service/AxiosInterceptor'
import type { Task } from '../model'
import { TASK_ENDPOINT } from '@/constants'

export const updateTask = async (id: string, formData: FormData) => {
  try {
    const response = await Axios.put<Task>(`${TASK_ENDPOINT}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response
  } catch (error) {
    console.error('Error al actualizar la tarea:', error)
    throw new Error('No se pudo actualizar la tarea. Intenta de nuevo más tarde.')
  }
}
