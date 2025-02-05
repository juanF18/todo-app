import { USER_ENDPOINT } from '@/constants'
import Axios from '@/service/AxiosInterceptor'
import type { CreateUserDTO, User } from '../model'

export const createUser = async (userData: CreateUserDTO) => {
  try {
    const response = await Axios.post<User>(USER_ENDPOINT, userData, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })
    return response
  } catch (error) {
    console.error('Error al crear el usuario:', error)
    throw new Error('No se pudo crear el usuario. Intenta de nuevo más tarde.')
  }
}
