<template>
  <div>
    <!-- hero -->
    <section class="w-full h-[60vh] bg-gray-100 flex items-center justify-center text-center px-6">
      <div class="max-w-3xl">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">sobre a fonx’</h1>
        <p class="text-lg text-gray-600">
          minimalismo. autenticidade. atitude. cada peça carrega o dna da rua e o futuro da moda.
        </p>
      </div>
    </section>

    <!-- nossa história -->
    <section class="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
      <!-- imagem -->
      <img src="/img/logotipo.svg" alt="história fonx’" class="w-full h-[400px] rounded-xl shadow-md" />

      <!-- texto -->
      <div>
        <h2 class="text-2xl md:text-3xl font-semibold mb-6">nossa história</h2>
        <p class="text-gray-700 leading-relaxed mb-4">
          a fonx’ nasceu com a ideia de unir moda streetwear a um estilo minimalista e atemporal.
          começamos pequenos, com camisetas oversized, mas sempre com a visão de crescer mantendo
          nossa essência.
        </p>
        <p class="text-gray-700 leading-relaxed">
          hoje seguimos explorando novas coleções, mas sempre focados em quem veste atitude,
          não apenas roupas.
        </p>
      </div>
    </section>

    <!-- missão, visão, valores -->
    <section class="bg-gray-50 py-24">
      <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
        <div>
          <h3 class="text-xl font-semibold mb-4">missão</h3>
          <p class="text-gray-600">
            oferecer roupas e acessórios com estilo único, unindo minimalismo e cultura urbana.
          </p>
        </div>
        <div>
          <h3 class="text-xl font-semibold mb-4">visão</h3>
          <p class="text-gray-600">
            tornar-se referência em streetwear no brasil, expandindo globalmente.
          </p>
        </div>
        <div>
          <h3 class="text-xl font-semibold mb-4">valores</h3>
          <p class="text-gray-600">
            autenticidade, inovação e respeito à cultura de rua.
          </p>
        </div>
      </div>
    </section>

    <!-- call to action -->
    <section class="py-20 text-center">
      <h2 class="text-2xl md:text-3xl font-semibold mb-6">faça parte do movimento fonx’</h2>
      <NuxtLink 
        to="/products" 
        class="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition text-lg"
      >
        ver produtos
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: "sobre nós | fonx'. merchandise",
  meta: [
    { name: "description", content: "conheça a história da fonx'. marca de roupas streetwear minimalista e autêntica." },
    { property: "og:title", content: "sobre nós | fonx'. merchandise" },
    { property: "og:description", content: "saiba mais sobre a fonx' e nossa visão de estilo e autenticidade." },
    { property: "og:type", content: "website" }
  ]
})
</script>
