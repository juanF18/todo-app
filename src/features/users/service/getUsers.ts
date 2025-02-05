import Axios from '@/service/AxiosInterceptor'
import type { User } from '../model'
import { USER_ENDPOINT } from '@/constants'

export const getUsers = async () => {
  try {
    const response = await Axios.get<User[]>(USER_ENDPOINT)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
