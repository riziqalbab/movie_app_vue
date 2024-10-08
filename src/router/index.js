import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import MovieView from '@/views/MovieView.vue'
import AddView from '@/views/AddView.vue'

const isLogin = false

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      component: MovieView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/add',
      component: AddView
    }
  ]
})

router.beforeEach((to, from) => {
  if (!isLogin && to.name != 'Login') {
    return {
      name: 'Login'
    }
  }
})

export default router
