<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'

const gempa = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const res = fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json')
    const data = (await res).json()
    gempa.value = (await data).Infogempa.gempa
    loading.value = false
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>
