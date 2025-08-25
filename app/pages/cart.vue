<template>
  <div class="max-w-7xl mx-auto px-6 py-20">
    <h1 class="text-3xl font-bold mb-10">meu carrinho</h1>

    <!-- vazio -->
    <div v-if="!cartItems.length" class="text-center text-gray-500 py-20">
      <p class="mb-6">seu carrinho está vazio 😢</p>
      <NuxtLink to="/products" class="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">
        ver produtos
      </NuxtLink>
    </div>

    <!-- lista de itens -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <!-- produtos -->
      <div class="lg:col-span-2 space-y-6">
        <div 
          v-for="item in cartItems" 
          :key="item.id + '-' + item.size"
          class="flex items-center gap-6 border rounded-lg p-4"
        >
          <!-- imagem -->
          <img :src="item.img" :alt="item.nome" class="w-28 h-28 object-cover rounded-md" />

          <!-- infos -->
          <div class="flex-1">
            <h2 class="text-lg font-medium">{{ item.nome }}</h2>
            <p class="text-sm text-gray-500">tamanho: {{ item.size }}</p>
            <p class="text-sm text-gray-700 font-semibold mt-1">
              {{ item.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) }}
            </p>

            <!-- quantidade -->
            <div class="flex items-center gap-2 mt-3">
              <button 
                @click="updateQty(item, item.qty - 1)"
                class="px-2 py-1 border rounded hover:bg-gray-100"
              >-</button>
              <span class="px-3">{{ item.qty }}</span>
              <button 
                @click="updateQty(item, item.qty + 1)"
                class="px-2 py-1 border rounded hover:bg-gray-100"
              >+</button>
            </div>
          </div>

          <!-- remover -->
          <button 
            @click="removeItem(item)"
            class="text-red-500 hover:text-red-700 transition"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- resumo -->
      <div class="border rounded-lg p-6 h-fit">
        <h3 class="text-xl font-semibold mb-4">resumo</h3>
        <p class="flex justify-between mb-2">
          <span>subtotal</span>
          <span>{{ subtotalFormatado }}</span>
        </p>
        <p class="flex justify-between mb-6 text-gray-500 text-sm">
          <span>frete</span>
          <span>calculado no checkout</span>
        </p>
        <button 
          @click="checkout"
          class="w-full block text-center bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
        >
          finalizar compra
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from "vue"
import { useCart } from "~/composables/useCart"
import { useHead } from "#imports"

const { cartItems, updateQty, removeItem } = useCart()

// subtotal
const subtotal = computed(() =>
  cartItems.value.reduce((acc, item) => acc + item.preco * item.qty, 0)
)

const subtotalFormatado = computed(() =>
  subtotal.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
)

// SEO dinâmico do carrinho
watch([cartItems, subtotal], () => {
  const totalItens = cartItems.value.reduce((acc, item) => acc + item.qty, 0)

  useHead({
    title: `carrinho (${totalItens} itens) | fonx'. merchandise`,
    meta: [
      { name: "description", content: totalItens > 0 
          ? `Seu carrinho na fonx'. possui ${totalItens} item(ns) no valor total de ${subtotalFormatado.value}. Continue para finalizar sua compra.` 
          : "Seu carrinho na fonx'. está vazio. Confira nossos produtos de streetwear minimalista." 
      },
      { property: "og:title", content: "Carrinho de compras | fonx'. merchandise" },
      { property: "og:description", content: totalItens > 0 
          ? `Finalize sua compra na fonx'. Subtotal: ${subtotalFormatado.value}` 
          : "Carrinho vazio na fonx'. Confira camisetas e moletons exclusivos." 
      },
      { property: "og:type", content: "website" }
    ]
  })
}, { immediate: true })

async function checkout() {
  try {
    const items = cartItems.value.map(item => ({
      title: item.nome,
      quantity: item.qty,
      unit_price: item.preco,
      currency_id: "BRL"
    }))

    const res = await fetch("https://api.fonx.com.br/mp_checkout.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items })
    })

    const data = await res.json()

    if (data.init_point) {
      const w = 1200
      const h = 600
      const left = (window.innerWidth - w) / 2 + window.screenX
      const top = (window.innerHeight - h) / 2 + window.screenY

      window.open(
        data.init_point,
        "mpCheckout",
        `width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
      )
    } else {
      console.error("Erro:", data)
      alert("Erro ao iniciar checkout.")
    }
  } catch (err) {
    console.error("Erro no checkout:", err)
    alert("Erro de conexão com servidor.")
  }
}
</script>
