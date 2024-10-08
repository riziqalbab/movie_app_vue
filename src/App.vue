<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'

const gempa = ref(null)
const loading = ref(true)
const isLogin = ref(true)
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>
