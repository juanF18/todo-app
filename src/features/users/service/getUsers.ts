import Axios from '@/service/AxiosInterceptor'
import type { User } from '../model'
import { USER_ENDPOINT } from '@/constants'

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await Axios.get<User[]>(USER_ENDPOINT)
    return response.data
  } catch (error) {
    console.error('Error al obtener los usuarios:', error)
    throw new Error('No se pudieron obtener los usuarios. Intenta de nuevo más tarde.')
  }
}
