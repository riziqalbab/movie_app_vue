import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import MovieView from '@/views/MovieView.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/movie',
      component: MovieView
    }
  ]
})

export default router
