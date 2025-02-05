import Axios from '@/service/AxiosInterceptor'
import { TASK_ENDPOINT } from '@/constants'

export const deleteTask = async (id: string) => {
  try {
    const response = await Axios.delete(`${TASK_ENDPOINT}/${id}`)
    return response
  } catch (error) {
    console.error('Error al eliminar la tarea:', error)
    throw new Error('No se pudo eliminar la tarea.')
  }
}
