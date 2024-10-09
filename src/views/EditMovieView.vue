<script setup>
import env from '@/config/env'
import axios from 'axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const id = route.params.id

const title = ref('')
const year = ref('')
const imagePreview = ref('')
const isDragging = ref(false)
const alertMessage = ref('')
const alertType = ref('')
const showAlert = ref(false)

const handleDrop = (e) => {
  isDragging.value = false
  const file = e.dataTransfer?.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result
    }
    reader.readAsDataURL(file)
  }
}

const submit = async () => {
  try {
    const formData = new FormData()
    formData.append('title', title.value)
    formData.append('year', year.value)

    const blob = await (await fetch(imagePreview.value)).blob()
    formData.append('img', blob, 'image.png')

    const response = await axios({
      method: 'post',
      withCredentials: true,
      url: `${env('VITE_API_ENDPOINT')}movie/edit/${id}`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    // Set alert message and type
    alertMessage.value = 'Movie saved successfully!'
    alertType.value = 'success'
    showAlert.value = true

    // Reset form fields
    title.value = ''
    year.value = ''
    imagePreview.value = ''
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message)

    // Set alert message and type for error
    alertMessage.value =
      'Error saving movie: ' + (error.response?.data?.message || 'An error occurred')
    alertType.value = 'error'
    showAlert.value = true
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#0e3a4f] text-white p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Create a new movie</h1>

      <div
        v-if="showAlert"
        :class="alertType === 'success' ? 'bg-green-500' : 'bg-red-500'"
        class="p-4 rounded mb-4"
      >
        <p>{{ alertMessage }}</p>
      </div>

      <div class="flex flex-col md:flex-row gap-8">
        <div class="w-full md:w-1/2">
          <div
            @dragover.prevent
            @drop.prevent="handleDrop"
            class="border-2 border-dashed border-gray-400 rounded-lg aspect-square flex items-center justify-center cursor-pointer"
            :class="{ 'border-green-500': isDragging }"
            @dragenter="isDragging = true"
            @dragleave="isDragging = false"
          >
            <div v-if="!imagePreview" class="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 mx-auto mb-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p class="text-gray-400">Drop an image here</p>
            </div>
            <img
              v-else
              :src="imagePreview"
              alt="Movie preview"
              class="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        <form v-on:submit.prevent="submit" class="w-full md:w-1/2 space-y-4">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-400 mb-1">Title</label>
            <input
              v-model="title"
              type="text"
              id="title"
              class="w-full px-3 py-2 bg-[#1a4d66] text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter movie title"
            />
          </div>

          <div>
            <label for="year" class="block text-sm font-medium text-gray-400 mb-1"
              >Publishing year</label
            >
            <input
              v-model="year"
              type="number"
              id="year"
              class="w-full px-3 py-2 bg-[#1a4d66] text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter publishing year"
            />
          </div>

          <div class="flex justify-end space-x-4 mt-8">
            <button
              v-on:click="submit"
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="fixed bottom-0 left-0 right-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full">
        <path
          fill="#1a4d66"
          fill-opacity="1"
          d="M0,96L80,106.7C160,117,320,139,480,133.3C640,128,800,96,960,90.7C1120,85,1280,107,1360,117.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
    </div>
  </div>
</template>
