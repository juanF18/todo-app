import Axios from '@/service/AxiosInterceptor'
import type { Task } from '../model'
import { TASK_ENDPOINT } from '@/constants'

// Crear una nueva tarea
export const createTask = async (formData: FormData) => {
  try {
    const response = await Axios.post<Task>(TASK_ENDPOINT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response
  } catch (error) {
    console.error('Error al crear la tarea:', error)
    throw new Error('No se pudo crear la tarea. Intenta de nuevo más tarde.')
  }
}
