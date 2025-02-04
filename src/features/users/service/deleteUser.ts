import { USER_ENDPOINT } from '@/constants'
import Axios from '@/service/AxiosInterceptor'

export const deleteUser = async (id: string): Promise<void> => {
  await Axios.delete(`${USER_ENDPOINT}/${id}`)
}
