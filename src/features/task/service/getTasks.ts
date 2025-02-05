import Axios from '@/service/AxiosInterceptor'
import type { Task } from '../model'
import { TASK_ENDPOINT } from '@/constants'

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await Axios.get<Task[]>(TASK_ENDPOINT)
    return response.data
  } catch (error) {
    console.error('Error al obtener las tareas:', error)
    throw new Error('No se pudieron obtener las tareas.')
  }
}
