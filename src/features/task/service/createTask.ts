import Axios from '@/service/AxiosInterceptor'
import type { Task } from '../model'
import { TASK_ENDPOINT } from '@/constants'

// Crear una nueva tarea
export const createTask = async (formData: FormData): Promise<Task> => {
  const response = await Axios.post<Task>(TASK_ENDPOINT, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
