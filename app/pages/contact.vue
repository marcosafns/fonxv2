<template>
  <div class="max-w-4xl mx-auto px-6 py-20">
    <h1 class="text-3xl font-bold text-center mb-4">fale com a gente</h1>
    <p class="text-gray-600 text-center mb-12">
      tem alguma dúvida, sugestão ou quer falar sobre parcerias? preencha o formulário abaixo 👇
    </p>

    <form @submit.prevent="enviarContato" class="space-y-6">
      <!-- nome -->
      <div>
        <label for="nome" class="block text-sm font-medium text-gray-700 mb-1">nome</label>
        <input
          v-model="nome"
          id="nome"
          type="text"
          required
          class="w-full border rounded-md px-4 py-2 focus:ring-black focus:border-black"
        />
      </div>

      <!-- email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">email</label>
        <input
          v-model="email"
          id="email"
          type="email"
          required
          class="w-full border rounded-md px-4 py-2 focus:ring-black focus:border-black"
        />
      </div>

      <!-- mensagem -->
      <div>
        <label for="mensagem" class="block text-sm font-medium text-gray-700 mb-1">mensagem</label>
        <textarea
          v-model="mensagem"
          id="mensagem"
          rows="5"
          required
          class="w-full border rounded-md px-4 py-2 focus:ring-black focus:border-black"
        ></textarea>
      </div>

      <!-- botão -->
      <button
        type="submit"
        class="w-full bg-black text-white py-3 rounded-md text-lg font-medium hover:bg-gray-800 transition"
      >
        enviar mensagem
      </button>

      <!-- alerta -->
      <p v-if="alerta" class="text-center text-green-600 mt-4">{{ alerta }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue"

const nome = ref("")
const email = ref("")
const mensagem = ref("")
const alerta = ref("")

function enviarContato() {
  if (!nome.value || !email.value || !mensagem.value) return
  // aqui pode integrar com backend ou email service
  alerta.value = "mensagem enviada com sucesso! 🚀"
  nome.value = ""
  email.value = ""
  mensagem.value = ""
}

useHead({
  title: "contato | fonx'. merchandise",
  meta: [
    { name: "description", content: "fale com a equipe da fonx'. dúvidas, suporte e parcerias." },
    { property: "og:title", content: "contato | fonx'. merchandise" },
    { property: "og:description", content: "entre em contato com a fonx'." },
    { property: "og:type", content: "website" }
  ]
})

</script>
