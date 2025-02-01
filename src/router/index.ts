import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import UsersContainer from '@/features/users/UsersContainer.vue'
import TodoContainer from '@/features/todo/TodoContainer.vue'

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
          component: TodoContainer,
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
