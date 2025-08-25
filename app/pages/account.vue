<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50 px-4">
    <div class="w-full max-w-md bg-white p-8 shadow-lg rounded-2xl text-center">
      
      <!-- loader -->
      <div v-if="loading" class="py-20 text-gray-500 animate-pulse">
        validando sessão...
      </div>

      <!-- se não estiver logado -->
      <div v-else-if="!user">
        <h1 class="text-2xl font-bold mb-4">minha conta</h1>
        <p class="text-gray-600 mb-6">você precisa estar logado para acessar essa página.</p>
        <NuxtLink
          to="/login"
          class="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          ir para login
        </NuxtLink>
      </div>

      <!-- se estiver logado -->
      <div v-else>
        <!-- avatar -->
        <div class="flex justify-center mb-6">
          <div class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-bold text-gray-600">
            {{ user.nome.charAt(0).toUpperCase() }}
          </div>
        </div>

        <h1 class="text-2xl font-bold mb-2">olá, {{ user.nome }}</h1>
        <p class="text-gray-700">📧 {{ user.email }}</p>
        <p class="text-gray-700">📱 {{ user.telefone }}</p>


        <!-- botões -->
        <div class="mt-6 space-y-3">
          <NuxtLink
            to="/account-edit"
            class="w-full block bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition"
          >
            editar informações
          </NuxtLink>

          <button
            @click="logout"
            class="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          >
            sair da conta
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

const user = ref(null)
const loading = ref(true)
const router = useRouter()

// SEO
useHead({
  title: "minha conta | fonx'. merchandise",
  meta: [
    { name: "description", content: "acesse sua conta fonx para ver seus dados e pedidos." },
    { name: "robots", content: "noindex, nofollow" }
  ]
})

// checa usuário ao montar
onMounted(async () => {
  try {
    const res = await fetch("https://api.fonx.com.br/me.php", {
      method: "GET",
      credentials: "include"
    })

    const data = await res.json()

    if (data.success) {
      user.value = data.user
      localStorage.setItem("fonx_is_auth", "1")
      if (data.user?.nome) {
        localStorage.setItem("fonx_user_name", data.user.nome)
      }
    } else {
      limparSessao()
    }
  } catch (err) {
    console.error("Erro ao validar login:", err)
    limparSessao()
  } finally {
    loading.value = false
  }
})

// logout
async function logout() {
  try {
    await fetch("https://api.fonx.com.br/logout.php", {
      method: "POST",
      credentials: "include"
    })
  } catch (e) {
    console.warn("Erro no logout backend, limpando local mesmo assim.")
  } finally {
    limparSessao()
    router.push("/login")
  }
}

function limparSessao() {
  localStorage.removeItem("fonx_is_auth")
  localStorage.removeItem("fonx_user_name")
  user.value = null
}
</script>
