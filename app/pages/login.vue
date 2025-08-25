<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-6 text-center">entrar</h1>

      <!-- mensagem de erro -->
      <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded">
        {{ error }}
      </div>

      <!-- formulário -->
      <form @submit.prevent="loginUser" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">email</label>
          <input
            v-model="email"
            id="email"
            type="email"
            required
            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

        <div>
          <label for="senha" class="block text-sm font-medium text-gray-700">senha</label>
          <input
            v-model="senha"
            id="senha"
            type="password"
            required
            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          entrar
        </button>
      </form>

      <p class="text-center text-sm text-gray-600 mt-6">
        não tem conta?
        <NuxtLink to="/signup" class="underline hover:text-black">cadastre-se</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const email = ref("")
const senha = ref("")
const error = ref("")
const router = useRouter()

async function loginUser() {
  error.value = ""
  try {
    const res = await fetch("https://api.fonx.com.br/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include", // 👈 importante pra cookie do token
      body: JSON.stringify({ email: email.value, senha: senha.value })
    })

    if (!res.ok) {
      throw new Error("Erro no servidor: " + res.status)
    }

    const data = await res.json()

    if (data.success) {
      // salva no localStorage para o header saber que tá logado
      localStorage.setItem("fonx_is_auth", "1")
      if (data.user?.nome) {
        localStorage.setItem("fonx_user_name", data.user.nome)
      }

      // limpa campos
      email.value = ""
      senha.value = ""

      // redireciona para conta
      router.push("/account")
    } else {
      error.value = data.message || "erro ao fazer login"
    }
  } catch (err) {
    console.error("Erro no login:", err)
    error.value = "erro ao fazer login"
  }
}
</script>

