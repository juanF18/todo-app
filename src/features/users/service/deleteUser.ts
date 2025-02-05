import { USER_ENDPOINT } from '@/constants'
import Axios from '@/service/AxiosInterceptor'

// Eliminar un usuario
export const deleteUser = async (id: string) => {
  try {
    const response = await Axios.delete(`${USER_ENDPOINT}/${id}`)
    return response
  } catch (error) {
    console.error('Error al eliminar el usuario:', error)
    throw new Error('No se pudo eliminar el usuario. Intenta de nuevo más tarde.')
  }
}
