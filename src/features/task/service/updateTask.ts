import Axios from '@/service/AxiosInterceptor'
import type { Task } from '../model'
import { TASK_ENDPOINT } from '@/constants'

export const updateTask = async (id: string, formData: FormData): Promise<Task> => {
  const response = await Axios.put<Task>(`${TASK_ENDPOINT}/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
