import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import MovieView from '@/views/MovieView.vue'
import AddView from '@/views/AddView.vue'
import axios from 'axios'
import env from '@/config/env'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MovieView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/add',
      component: AddView
    }
  ]
})

router.beforeEach(async (to, from) => {
  axios({
    method: 'GET',
    url: `${env('VITE_API_ENDPOINT')}user/get`,
    withCredentials: true
  })
    .then(() => {
      if (to.name == 'login') {
        router.push('/')
      }
    })
    .catch(() => {
      router.push('Login')
    })
})

export default router
