<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md bg-white p-8 shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-6 text-center">criar conta</h1>

      <!-- mensagem de erro -->
      <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded">
        {{ error }}
      </div>

      <!-- mensagem de sucesso -->
      <div v-if="success" class="mb-4 p-3 bg-green-100 text-green-700 text-sm rounded">
        {{ success }}
      </div>

      <!-- formulário -->
      <form @submit.prevent="signupUser" class="space-y-4">
        <div>
          <label for="nome" class="block text-sm font-medium text-gray-700">nome</label>
          <input
            v-model="nome"
            id="nome"
            type="text"
            required
            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

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
            minlength="6"
            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          cadastrar
        </button>
      </form>

      <p class="text-center text-sm text-gray-600 mt-6">
        já tem conta?
        <NuxtLink to="/login" class="underline hover:text-black">entrar</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const nome = ref("")
const email = ref("")
const senha = ref("")
const error = ref("")
const success = ref("")
const router = useRouter()

async function signupUser() {
  error.value = ""
  success.value = ""

  try {
    const res = await fetch("https://api.fonx.com.br/signup.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome: nome.value, email: email.value, senha: senha.value })
    })

    const data = await res.json()

    if (data.success) {
      success.value = "Conta criada com sucesso! Redirecionando..."
      setTimeout(() => router.push("/login"), 1500)
    } else {
      error.value = data.message || "erro ao cadastrar"
    }
  } catch (err) {
    error.value = "erro de conexão"
  }
}
</script>
