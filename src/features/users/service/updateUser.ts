import { USER_ENDPOINT } from '@/constants'
import type { UpdateUserDTO, User } from '../model'
import Axios from '@/service/AxiosInterceptor'

export const updateUser = async (id: string, userData: UpdateUserDTO): Promise<User> => {
  const response = await Axios.put<User>(`${USER_ENDPOINT}/${id}`, userData)
  return response.data
}
