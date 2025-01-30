import { defineStore } from 'pinia'
import type { Todo } from '../model'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[],
  }),
  actions: {
    addTodo(title: string) {
      this.todos.push({ id: Date.now(), title, completed: false })
    },
    toggleTodo(id: number) {
      const todo = this.todos.find((todo) => todo.id === id)
      if (todo) todo.completed = !todo.completed
    },
    removeTodo(id: number) {
      this.todos = this.todos.filter((todo) => todo.id !== id)
    },
  },
})
