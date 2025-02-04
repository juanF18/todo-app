import { USER_ENDPOINT } from '@/constants'
import Axios from '@/service/AxiosInterceptor'
import type { CreateUserDTO, User } from '../model'

export const createUser = async (userData: CreateUserDTO): Promise<User> => {
  const response = await Axios.post<User>(USER_ENDPOINT, userData)
  return response.data
}
