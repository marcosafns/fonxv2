<template>
  <div>
    <!-- preloader global -->
    <Preloader :show="loading" />

    <!-- nuxt -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Preloader from '~/components/Preloader.vue'

const loading = ref(true)
const route = useRoute()

// Preloader inicial
setTimeout(() => {
  loading.value = false
}, 1200)

// Preloader ao trocar de rota
watch(
  () => route.fullPath,
  () => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 800) // tempo do preloader nas rotas internas
  }
)
</script>

<style global>
/* barra de rolagem */
::-webkit-scrollbar {
  width: 4px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background: #1d1d1b;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: #333;
}
</style>
