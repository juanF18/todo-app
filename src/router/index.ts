import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '@/features/todo/components/TodoList.vue'
import UsersContainer from '@/features/users/components/UsersContainer.vue'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardView,
      children: [
        {
          path: '',
          name: 'todo',
          component: TodoList,
        },
        {
          path: 'users',
          name: 'users',
          component: UsersContainer,
        },
      ],
    },
  ],
})

export default router
