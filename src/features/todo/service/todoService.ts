import { getTodos } from '../api'
import { useTodoStore } from '../store'

export const loadTodos = async () => {
  const store = useTodoStore()
  store.todos = await getTodos()
}
