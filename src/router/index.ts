import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import UsersContainer from '@/features/users/UsersContainer.vue'
import TaskContainer from '@/features/task/TaskContainer.vue'

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
          name: 'task',
          component: TaskContainer,
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
