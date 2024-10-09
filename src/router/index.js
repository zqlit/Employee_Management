import { createRouter, createWebHistory } from 'vue-router'
import Employee from '@/views/Employee.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
    },
    {
      path: '/employee',
      name: 'employee',
      component:Employee
    }
  ]
})

export default router
