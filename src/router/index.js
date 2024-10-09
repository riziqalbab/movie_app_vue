import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import MovieView from '@/views/MovieView.vue'
import AddView from '@/views/AddView.vue'
import axios from 'axios'
import env from '@/config/env'
import EditMovieView from '@/views/EditMovieView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(),
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
      name: 'add', // Menambahkan nama untuk rute add
      component: AddView
    },
    {
      path: '/register',
      name: 'register', // Menambahkan nama untuk rute add
      component: RegisterView
    },
    {
      path: '/movie/edit/:id', // Menambahkan rute untuk edit film
      name: 'edit',
      component: EditMovieView // Mengimpor komponen edit film
    }
  ]
})

// Middleware untuk memeriksa autentikasi
router.beforeEach(async (to) => {
  try {
    await axios.get(`${env('VITE_API_ENDPOINT')}user/get`, {
      withCredentials: true
    })

    if (to.name === 'login' || to.name === 'login') {
      return { name: 'home' }
    }
  } catch {
    if (to.name !== 'login' && to.name !== 'register') {
      return { name: 'login' }
    }
  }
})

export default router
