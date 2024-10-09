<script setup>
import { ref } from 'vue'
import axios from 'axios'
import env from '@/config/env'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const movie = ref(null)
const url = ref(env('VITE_IMAGE_ENDPOINT'))
const router = useRouter()
const route = useRoute()

const page = route.query.page ? route.query.page : 0

// Mengambil data film
axios({
  method: 'GET',
  withCredentials: true,
  url: `${env('VITE_API_ENDPOINT')}movie?page=${page}`
}).then((res) => {
  movie.value = res.data
  console.log(res.data)
})

// Fungsi untuk navigasi ke halaman edit
const goToEditPage = (id) => {
  router.push(`/movie/edit/${id}`) // Ganti dengan path yang sesuai untuk halaman edit
}
</script>

<template>
  <div class="min-h-screen bg-[#0e3a4f] text-white p-8">
    <div class="max-w-6xl mx-auto">
      <header class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">My movies</h1>
        <a href="/add" class="text-gray-400 hover:text-white">TAMBAH</a>
      </header>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="i in movie.data"
          :key="i.id"
          class="bg-[#1a4d66] rounded-lg overflow-hidden cursor-pointer"
          @click="goToEditPage(i.id_movie)"
        >
          <img :src="`${url}${i.img}`" alt="Movie thumbnail" class="w-full h-40 object-cover" />
          <div class="p-4">
            <h3 class="font-semibold">{{ i.title }}</h3>
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
