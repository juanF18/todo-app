import type { User } from '@/features/users/model'

export interface Task {
  id: string
  title: string
  description: string
  status: boolean
  user: User
  files: string[]
}

export interface CreateTaskDTO {
  title: string
  description: string
  status?: boolean
  user_id: string
  files?: File[]
}

export interface UpdateTaskDTO {
  id: string
  title?: string
  description?: string
  status?: boolean
  user_id: string
  files?: File[]
}
