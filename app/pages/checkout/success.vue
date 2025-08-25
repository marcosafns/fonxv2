<template>
  <div class="max-w-3xl mx-auto px-6 py-20 text-center">
    <div class="bg-white shadow-md rounded-lg p-10">
      <h1 class="text-3xl font-bold mb-4">✅ pagamento confirmado!</h1>
      <p class="text-gray-700 mb-6">
        obrigado por comprar com a <span class="font-semibold">fonx’</span>.
      </p>

      <!-- infos do pedido -->
      <div class="bg-gray-50 border rounded-lg p-6 mb-6 text-left">
        <p><span class="font-medium">id da transação:</span> {{ paymentId || "—" }}</p>
        <p><span class="font-medium">status:</span> {{ status || "—" }}</p>
        <p><span class="font-medium">valor:</span> {{ amount || "—" }}</p>
      </div>

      <NuxtLink
        to="/products"
        class="inline-block px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
      >
        continuar comprando
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router"
import { onMounted } from "vue"
import { useCart } from "~/composables/useCart"

const route = useRoute()
const { clearCart } = useCart()

// dados do retorno do MP
const paymentId = route.query.payment_id || null
const status = route.query.status || null
const amount = route.query.transaction_amount || null

onMounted(() => {
  // limpa carrinho ao entrar na página de sucesso
  clearCart()
})
</script>
