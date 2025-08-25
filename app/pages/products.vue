<template>
  <div class="flex w-full">
    <!-- filtro fixo desktop -->
    <aside class="hidden lg:block w-72 min-h-screen border-r border-gray-200 p-6">
      <h2 class="text-lg font-semibold mb-6">
        filtros <span v-if="contadorFiltros > 0" class="text-sm text-gray-500">({{ contadorFiltros }})</span>
      </h2>

      <!-- categoria -->
      <div class="mb-8">
        <h3 class="text-sm font-semibold text-gray-600 mb-3">categoria</h3>
        <div class="flex flex-col gap-2">
          <label v-for="cat in categorias" :key="cat" class="flex items-center gap-2 text-sm">
            <input 
              type="radio" 
              name="categoria"
              :value="cat" 
              v-model="filtroCategoria"
              class="accent-black"
            />
            {{ cat }}
          </label>
          <button 
            v-if="filtroCategoria" 
            @click="filtroCategoria = null"
            class="text-xs text-gray-500 underline mt-1"
          >
            limpar
          </button>
        </div>
      </div>

      <!-- coleção -->
      <div class="mb-8">
        <h3 class="text-sm font-semibold text-gray-600 mb-3">coleção</h3>
        <div class="flex flex-col gap-2">
          <label v-for="col in colecoes" :key="col" class="flex items-center gap-2 text-sm">
            <input 
              type="radio" 
              name="colecao"
              :value="col" 
              v-model="filtroColecao"
              class="accent-black"
            />
            {{ col }}
          </label>
          <button 
            v-if="filtroColecao" 
            @click="filtroColecao = null"
            class="text-xs text-gray-500 underline mt-1"
          >
            limpar
          </button>
        </div>
      </div>

      <!-- tamanho -->
      <div class="mb-8">
        <h3 class="text-sm font-semibold text-gray-600 mb-3">tamanho</h3>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="t in tamanhos" 
            :key="t"
            @click="filtroTamanho = filtroTamanho === t ? null : t"
            :class="[ 
              'px-4 py-2 rounded-md border text-sm font-medium uppercase transition',
              filtroTamanho === t ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-black'
            ]"
          >
            {{ t }}
          </button>
        </div>
      </div>

      <!-- cor -->
      <div class="mb-8">
        <h3 class="text-sm font-semibold text-gray-600 mb-3">cor</h3>
        <div class="flex gap-3">
          <button
            v-for="c in cores"
            :key="c.nome"
            @click="filtroCor = filtroCor === c.nome ? null : c.nome"
            :class="[ 
              'w-8 h-8 rounded-full border-2 transition',
              filtroCor === c.nome ? 'ring-2 ring-black' : 'hover:scale-105'
            ]"
            :style="{ backgroundColor: c.hex }"
          ></button>
        </div>
      </div>

      <!-- preço -->
      <div>
        <h3 class="text-sm font-semibold text-gray-600 mb-3">preço</h3>
        <input 
          type="range" 
          min="50" 
          max="300" 
          step="10"
          v-model="filtroPreco"
          class="w-full"
        />
        <p class="text-sm text-gray-500 mt-2">até R$ {{ filtroPreco }}</p>
      </div>
    </aside>

    <!-- conteúdo principal -->
    <main class="flex-1">
      <div class="max-w-7xl mx-auto px-6 py-20">
        <!-- grid produtos -->
        <div v-if="loading" class="flex justify-center items-center py-20">
          <svg class="animate-spin h-8 w-8 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <NuxtLink
            v-for="p in produtosFiltrados"
            :key="p.slug"
            :to="`/product/${p.slug}`"
            class="relative block rounded-lg overflow-hidden border border-gray-200 transition group"
          >
            <!-- badge -->
            <span v-if="p.status === 'out'" class="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
              esgotado
            </span>
            <span v-else-if="p.status === 'soon'" class="absolute top-3 left-3 bg-blue-500 text-white text-xs px-2 py-1 rounded z-10">
              em breve
            </span>

            <!-- imagem -->
            <img 
              :src="p.imagens[0]" 
              :alt="p.nome" 
              class="w-full h-[380px] object-cover transition group-hover:scale-105"
              :class="{ 'opacity-70': p.status === 'out', 'opacity-90': p.status === 'soon' }"
            />

            <!-- infos -->
            <div class="p-4 text-center">
              <h2 
                class="text-lg font-medium"
                :class="p.status === 'available' ? 'group-hover:text-black/70' : 'text-gray-500'"
              >
                {{ p.nome }}
              </h2>
              <p :class="p.status === 'available' ? 'text-gray-600 mt-1' : 'text-gray-400 mt-1'">
                {{ p.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from '#imports'
import { produtos } from '~/data/products'

const filtroAberto = ref(false)
const loading = ref(false)

/* filtros */
const filtroCategoria = ref(null)
const filtroColecao = ref(null) // novo filtro
const filtroTamanho = ref(null)
const filtroCor = ref(null)
const filtroPreco = ref(300)

/* categorias */
const categorias = ["camisetas", "moletons"]
const colecoes = ["originals", "deception", "angelical"] // coleções fixas

/* route query */
const route = useRoute()
filtroCategoria.value = route.query.cat || null
filtroColecao.value = route.query.colecao || null

watch(() => route.query.cat, (val) => filtroCategoria.value = val || null)
watch(() => route.query.colecao, (val) => filtroColecao.value = val || null)

/* opções */
const tamanhos = ["P", "M", "G", "GG"]
const cores = [
  { nome: "branco", hex: "#ffffff" },
  { nome: "preto", hex: "#000000" },
  { nome: "marrom", hex: "#463208" },
]

/* produtos filtrados */
const produtosFiltrados = computed(() => {
  return produtos
    .filter(p => {
      const porCategoria = filtroCategoria.value ? p.categoria === filtroCategoria.value : true
      const porColecao = filtroColecao.value ? p.colecao === filtroColecao.value : true
      const porTamanho = filtroTamanho.value ? p.estoque[filtroTamanho.value] > 0 : true
      const porCor = filtroCor.value ? p.cor === filtroCor.value : true
      const porPreco = p.preco <= filtroPreco.value
      return porCategoria && porColecao && porTamanho && porCor && porPreco
    })
    .sort((a, b) => {
      const order = { available: 0, soon: 1, out: 2 }
      if (order[a.status] !== order[b.status]) {
        return order[a.status] - order[b.status]
      }
      return b.id - a.id
    })
})

/* contador filtros */
const contadorFiltros = computed(() => {
  let count = 0
  if (filtroCategoria.value) count++
  if (filtroColecao.value) count++
  if (filtroTamanho.value) count++
  if (filtroCor.value) count++
  if (filtroPreco.value < 300) count++
  return count
})

/* loading fake */
watch([filtroCategoria, filtroColecao, filtroTamanho, filtroCor, filtroPreco], () => {
  loading.value = true
  setTimeout(() => loading.value = false, 400)
})

useHead({
  title: "produtos | fonx'. merchandise",
  meta: [
    { name: "description", content: "conheça as coleções da fonx'. merchandise." },
    { name: "keywords", content: "fonx, streetwear, moda urbana, oversized, moletom, camiseta, hoodie, minimalista" },
    { property: "og:title", content: "produtos | fonx'. merchandise" },
    { property: "og:description", content: "conheça as coleções da fonx'. merchandise." },
    { property: "og:image", content: "https://fonx.com.br/img/og-preview.png" },
    { property: "og:type", content: "website" }
  ],
  link: [
    { rel: "icon", type: "image/png", href: "/favicon.ico" }
  ]
})

</script>
