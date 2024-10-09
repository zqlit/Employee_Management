import { createRouter, createWebHistory } from 'vue-router'
import Employee from '@/views/Employee.vue'
import Login from '@/views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Employee 
    },
    {
      path: '/employee',
      name: 'employee',
      component: Employee
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router