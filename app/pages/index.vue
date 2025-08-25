<template>
  <div>
    <!-- carrossel coleções -->
    <section class="w-full">
      <Swiper
        :modules="[Navigation, Pagination, Autoplay]"
        :loop="true"
        :autoplay="{ delay: 4000 }"
        :pagination="{ clickable: true }"
        :navigation="true"
        class="w-full h-screen md:h-[91vh]"
      >
        <SwiperSlide v-for="(slide, i) in slides" :key="i">
          <div class="relative w-full h-full">
            <!-- imagem full -->
            <img 
              :src="slide.img" 
              :alt="slide.title"
              class="w-full h-full object-cover"
            />

            <!-- overlay + texto -->
            <div class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-6">
              <h2 class="text-3xl md:text-6xl font-bold mb-6 tracking-wide">
                {{ slide.title }}
              </h2>
              <NuxtLink
                :to="slide.link"
                class="bg-white text-black px-8 py-3 rounded-md hover:bg-gray-200 transition text-lg"
              >
                ver coleção
              </NuxtLink>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>

    <!-- categorias -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- categoria 1 -->
        <NuxtLink 
          to="/products?cat=camisetas"
          class="relative group block overflow-hidden rounded-xl"
        >
          <img src="/img/categoria-camisetas.png" alt="categoria camisetas fonx' streetwear" 
              class="w-full h-[500px] object-cover group-hover:scale-105 transition" />
          
          <!-- texto sobreposto com fade -->
          <div class="absolute inset-0 flex flex-col justify-end p-6 text-white bg-gradient-to-t from-black/60 to-transparent">
            <span class="text-sm opacity-80">oversized</span>
            <h3 class="text-3xl font-bold">t-shirts</h3>
            <button class="mt-3 bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition w-fit">
              shop
            </button>
          </div>
        </NuxtLink>

        <!-- categoria 2 -->
        <NuxtLink 
          to="/products?cat=moletons"
          class="relative group block overflow-hidden rounded-xl"
        >
          <img src="/img/categoria-moletons.png" alt="categoria moletons fonx' streetwear" 
              class="w-full h-[500px] object-cover group-hover:scale-105 transition" />
          
          <!-- texto sobreposto com fade -->
          <div class="absolute inset-0 flex flex-col justify-end p-6 text-white bg-gradient-to-t from-black/60 to-transparent">
            <span class="text-sm opacity-80">streetwear</span>
            <h3 class="text-3xl font-bold">hoodie</h3>
            <button class="mt-3 bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition w-fit">
              shop
            </button>
          </div>
        </NuxtLink>

      </div>
    </section>
  </div>
</template>


<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// slides do carrossel (coleções)
const slides = [
  {
    title: "coleção originals",
    img: "/img/colecao1.jpg",
    link: "/products?colecao=originals"
  },
  {
    title: "coleção deception",
    img: "/img/colecao2.jpg",
    link: "/products?colecao=deception"
  },
  {
    title: "coleção angelical",
    img: "/img/colecao3.jpg",
    link: "/products?colecao=angelical"
  }
]

useHead({
  title: "fonx'. merchandise",
  meta: [
    { name: "description", content: "fonx'. merchandise | rico em atitude | t-shirts oversized, streetwear hoodies and more." },
    { name: "keywords", content: "fonx, streetwear, moda urbana, oversized, moletom, camiseta, hoodie, minimalista" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "fonx'. merchandise" },
    { name: "twitter:description", content: "rico em atitude | t-shirts oversized, streetwear hoodies and more." },
    { name: "twitter:image", content: "https://fonx.com.br/img/og-preview.png" },
    { property: "og:title", content: "fonx'. merchandise" },
    { property: "og:description", content: "fonx'. merchandise | rico em atitude | t-shirts oversized, streetwear hoodies and more." },
    { property: "og:image", content: "https://fonx.com.br/img/og-preview.png" },
    { property: "og:type", content: "website" }
  ],
  link: [
    { rel: "icon", type: "image/png", href: "/favicon.ico" }
  ]
})

</script>

<style>
/* quadradinhos da paginação swiper */
.swiper-pagination-bullet {
  border-radius: 0 !important; /* tira a borda arredondada */
  width: 12px;
  height: 12px;
  background-color: #000 !important; /* quadradinho preto */
  opacity: 0.4;
  transition: all 0.2s ease;
}

.swiper-pagination-bullet-active {
  opacity: 1;
}
</style>
