import Axios from '@/service/AxiosInterceptor'
import type { User } from '../model'
import { USER_ENDPOINT } from '@/constants'

export const getUsers = async () => {
  try {
    const { data, status } = await Axios.get<User[]>(USER_ENDPOINT)
    console.log('repuesta server', data)
    const users = data ?? []
    return { users, status }
  } catch (error) {
    console.log(error)
  }
}
