import { USER_ENDPOINT } from '@/constants'
import type { UpdateUserDTO, User } from '../model'
import Axios from '@/service/AxiosInterceptor'

export const updateUser = async (id: string, userData: UpdateUserDTO) => {
  try {
    const response = await Axios.put<User>(`${USER_ENDPOINT}/${id}`, userData, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })
    return response
  } catch (error) {
    console.error('Error al actualizar el usuario:', error)
    throw new Error('No se pudo actualizar el usuario. Intenta de nuevo más tarde.')
  }
}
