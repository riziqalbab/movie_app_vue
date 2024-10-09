<script setup>
import env from '@/config/env'
import axios from 'axios'
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleSubmit = () => {
  // Handle form submission

  axios({
    method: 'POST',
    url: `${env('VITE_API_ENDPOINT')}user/login`,
    withCredentials: true,
    params: {
      email: email.value,
      password: password.value
    }
  })
    .then(() => {
      location.href = '/'
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-[#0e3a4f]">
    <div class="w-full max-w-md p-8">
      <h1 class="text-4xl font-bold text-white text-center mb-8">Sign in</h1>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            class="w-full px-3 py-2 bg-[#1a4d66] text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
            class="w-full px-3 py-2 bg-[#1a4d66] text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <button
            type="submit"
            class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="fixed -z-10 bottom-0 left-0 right-0">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full">
      <path
        fill="#1a4d66"
        fill-opacity="1"
        d="M0,96L80,106.7C160,117,320,139,480,133.3C640,128,800,96,960,90.7C1120,85,1280,107,1360,117.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      ></path>
    </svg>
  </div>
</template>
