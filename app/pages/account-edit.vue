<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50 px-4">
    <div class="w-full max-w-md bg-white p-8 shadow-lg rounded-2xl">
      <h1 class="text-2xl font-bold mb-6 text-center">editar informações</h1>

      <!-- mensagens -->
      <div v-if="successMsg" class="mb-4 p-3 bg-green-100 text-green-700 text-sm rounded">
        {{ successMsg }}
      </div>
      <div v-if="errorMsg" class="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded">
        {{ errorMsg }}
      </div>

      <!-- formulário -->
      <form @submit.prevent="updateUser" class="space-y-4">
        <div>
          <label for="nome" class="block text-sm font-medium text-gray-700">nome</label>
          <input
            v-model="form.nome"
            id="nome"
            type="text"
            required
            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">email</label>
          <input
            v-model="form.email"
            id="email"
            type="email"
            required
            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

        <div>
          <label for="senha" class="block text-sm font-medium text-gray-700">nova senha (opcional)</label>
          <input
            v-model="form.senha"
            id="senha"
            type="password"
            placeholder="deixe em branco para não alterar"
            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
          />
        </div>

        <div>
            <label for="telefone" class="block text-sm font-medium text-gray-700">telefone</label>
            <input
                v-model="form.telefone"
                id="telefone"
                type="text"
                class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
            />
        </div>


        <button
          type="submit"
          class="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
        >
          salvar alterações
        </button>
      </form>

      <NuxtLink to="/account" class="block text-center mt-6 text-sm underline hover:text-black">
        voltar para minha conta
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useHead } from "#imports"

const form = ref({ nome: "", email: "", senha: "", telefone: "" }) // 👈 adiciona telefone
const successMsg = ref("")
const errorMsg = ref("")

// carrega dados do usuário atual
onMounted(async () => {
  try {
    const res = await fetch("https://api.fonx.com.br/me.php", {
      method: "GET",
      credentials: "include"
    })
    const data = await res.json()
    if (data.success) {
      form.value.nome = data.user.nome
      form.value.email = data.user.email
      form.value.telefone = data.user.telefone // 👈 preenche o telefone vindo da API
    } else {
      errorMsg.value = "Você precisa estar logado."
    }
  } catch (e) {
    errorMsg.value = "Erro ao carregar dados."
  }
})

async function updateUser() {
  successMsg.value = ""
  errorMsg.value = ""

  // monta payload
  const payload = {
    nome: form.value.nome,
    email: form.value.email,
    telefone: form.value.telefone // 👈 agora envia telefone junto
  }
  if (form.value.senha.trim() !== "") {
    payload.senha = form.value.senha
  }

  try {
    const res = await fetch("https://api.fonx.com.br/update_user.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload)
    })

    const data = await res.json()
    if (data.success) {
      successMsg.value = data.message

      // atualiza localStorage para refletir no header
      if (form.value.nome) localStorage.setItem("fonx_user_name", form.value.nome)
      localStorage.setItem("fonx_is_auth", "1")

      // limpa campo senha
      form.value.senha = ""

      setTimeout(() => {
        window.location.href = "/account"
      }, 1200)
    } else {
      errorMsg.value = data.message
    }
  } catch (e) {
    errorMsg.value = "Erro de conexão com servidor."
  }
}

// metadata SEO
useHead({
  title: "editar conta | fonx'. merchandise",
  meta: [
    { name: "description", content: "edite suas informações pessoais da sua conta fonx." },
    { name: "robots", content: "noindex, nofollow" },
    { property: "og:title", content: "editar conta | fonx'. merchandise" },
    { property: "og:description", content: "gerencie e edite suas informações da sua conta fonx'." },
    { property: "og:type", content: "website" }
  ]
})
</script>