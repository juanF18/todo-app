import Axios from '@/service/AxiosInterceptor'
import { TASK_ENDPOINT } from '@/constants'

export const deleteTask = async (id: string): Promise<void> => {
  try {
    await Axios.delete(`${TASK_ENDPOINT}/${id}`)
  } catch (error) {
    console.error('Error al eliminar la tarea:', error)
    throw new Error('No se pudo eliminar la tarea.')
  }
}
