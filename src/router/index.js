import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Buy from '../views/Buy.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/buy',
    name: 'Buy',
    component: Buy
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
