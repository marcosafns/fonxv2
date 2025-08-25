<template>
  <div class="max-w-7xl mx-auto px-6 py-16">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      
      <!-- imagens -->
      <div>
        <!-- container com zoom -->
        <div 
          class="relative overflow-hidden rounded-xl shadow-sm w-full h-[500px] bg-white"
          @mousemove="handleZoom"
          @mouseleave="resetZoom"
          ref="zoomContainer"
        >
          <img
            :src="imagemSelecionada"
            :alt="produto?.nome"
            ref="zoomImg"
            class="absolute inset-0 w-full h-full object-contain transition-transform duration-150"
          />
        </div>

        <!-- miniaturas -->
        <div class="flex gap-3 mt-4">
          <img
            v-for="(img, i) in produto?.imagens"
            :key="i"
            :src="img"
            :alt="`thumb-${i}`"
            class="w-20 h-20 object-cover rounded-lg border cursor-pointer transition hover:opacity-80"
            :class="{ 'ring-2 ring-black': imagemSelecionada === img }"
            @click="imagemSelecionada = img"
          />
        </div>
      </div>

      <!-- infos -->
      <div>
        <h1 class="text-4xl font-bold mb-4">{{ produto?.nome }}</h1>
        <p class="text-gray-700 text-xl font-medium mb-6">{{ produto?.precoFormatado }}</p>

        <!-- tamanhos -->
        <div class="mb-8">
          <h3 class="text-sm font-semibold text-gray-600 mb-3 uppercase">tamanho</h3>
          <div class="flex gap-3">
            <button
              v-for="t in produto?.tamanhos"
              :key="t"
              @click="tamanhoSelecionado = t"
              :disabled="produto.estoque[t] === 0 || produto.status !== 'available'"
              :class="[ 
                'px-5 py-2 rounded-lg border text-sm font-medium uppercase transition',
                produto.status !== 'available' || produto.estoque[t] === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : tamanhoSelecionado === t
                    ? 'bg-black text-white border-black'
                    : 'border-gray-300 hover:border-black'
              ]"
            >
              {{ t }}
            </button>
          </div>
        </div>

        <!-- botão add carrinho -->
        <button
          @click="adicionarCarrinho"
          class="w-full bg-black text-white py-3 rounded-lg text-lg font-medium hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
          :disabled="!tamanhoSelecionado || produto?.status !== 'available'"
        >
          adicionar ao carrinho
        </button>

        <!-- mensagens -->
        <p v-if="!tamanhoSelecionado && produto?.status === 'available'" class="text-sm text-red-500 mt-2">
          selecione um tamanho antes de continuar
        </p>
        <p v-if="produto?.status === 'out'" class="text-sm text-red-500 mt-3">
          este produto está esgotado
        </p>
        <p v-if="produto?.status === 'soon'" class="text-sm text-blue-500 mt-3">
          este produto estará disponível em breve
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useCart } from "~/composables/useCart"
import { useHead } from "#imports"
import { produtos } from "~/data/products"

const route = useRoute()
const router = useRouter()
const { addItem } = useCart()

const produto = computed(() =>
  produtos.find(p => p.slug === route.params.slug)
)

const tamanhoSelecionado = ref(null)
const erroAuth = ref("")
const imagemSelecionada = ref(null)

// refs para zoom
const zoomContainer = ref(null)
const zoomImg = ref(null)

watch(produto, (p) => {
  if (p?.imagens?.length) {
    imagemSelecionada.value = p.imagens[0]
  }
}, { immediate: true })

// efeito zoom
function handleZoom(e) {
  const container = zoomContainer.value
  const img = zoomImg.value
  if (!container || !img) return
  const rect = container.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  img.style.transformOrigin = `${x}% ${y}%`
  img.style.transform = "scale(2)"
}
function resetZoom() {
  const img = zoomImg.value
  if (img) {
    img.style.transform = "scale(1)"
    img.style.transformOrigin = "center center"
  }
}

function adicionarCarrinho() {
  if (!produto.value) return
  if (!tamanhoSelecionado.value) return
  if (produto.value.status !== "available") return
  if (produto.value.estoque[tamanhoSelecionado.value] === 0) return

  const isAuth = localStorage.getItem("fonx_is_auth")
  if (!isAuth) {
    erroAuth.value = "Você precisa estar logado para adicionar produtos ao carrinho."
    setTimeout(() => {
      router.push("/login")
    }, 1200)
    return
  }

  addItem({
    id: produto.value.id,
    nome: produto.value.nome,
    preco: produto.value.preco,
    img: imagemSelecionada.value,
    size: tamanhoSelecionado.value
  })

  router.push("/cart")
}

// SEO dinâmico
watch(produto, (p) => {
  if (!p) return
  useHead({
    title: `${p.nome} | fonx'. merchandise`,
    meta: [
      { name: "description", content: `Compre ${p.nome} na fonx'. Streetwear minimalista e autêntico. ${p.precoFormatado}` },
      { property: "og:title", content: `${p.nome} | fonx'. merchandise` },
      { property: "og:description", content: `Streetwear fonx' - ${p.nome} por ${p.precoFormatado}` },
      { property: "og:image", content: p.imagens[0] },
      { property: "og:type", content: "product" }
    ]
  })
}, { immediate: true })
</script>
