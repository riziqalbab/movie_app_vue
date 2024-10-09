<script setup>
import { ref } from 'vue'
import axios from 'axios'
import env from '@/config/env'

const movie = ref(null)
const url = ref(env('VITE_IMAGE_ENDPOINT'))

axios({
  method: 'GET',
  withCredentials: true,
  url: `${env('VITE_API_ENDPOINT')}movie`
}).then((res) => {
  movie.value = res.data

  console.log(res.data)
})
</script>

<template>
  <div class="min-h-screen bg-[#0e3a4f] text-white p-8">
    <div class="max-w-6xl mx-auto">
      <header class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">My movies</h1>
        <button class="text-gray-400 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </header>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="i in movie.data" :key="i" class="bg-[#1a4d66] rounded-lg overflow-hidden">
          <img :src="`${url}${i.img}`" alt="Movie thumbnail" class="w-full h-40 object-cover" />
          <div class="p-4">
            <h3 class="font-semibold">Movie {{ i.title }}</h3>
            <p class="text-sm text-gray-400">{{ i.year }}</p>
          </div>
        </div>
      </div>

      <div class="mt-8 gap-4 flex justify-center items-center">
        <div v-for="link in movie.links" v-bind:key="link">
          <a
            :href="link.url"
            class="bg-green-500 h-6 px-3 py-4 items-center justify-center flex rounded-lg"
          >
            {{ link.label.replaceAll('&amp;laquo;', '').replaceAll('&amp;raquo;', '') }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
