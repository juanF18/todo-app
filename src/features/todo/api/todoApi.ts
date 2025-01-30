import type { Todo } from '../model'

export const getTodos = async (): Promise<Todo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Aprender Vue 3', completed: false },
        { id: 2, title: 'Dominar pinia', completed: true },
      ])
    }, 1000)
  })
}
