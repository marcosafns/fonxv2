<template>
  <footer class="w-full bg-white text-1D1D1B mt-16">
    <div class="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
      
      <!-- logo -->
      <NuxtLink to="/" class="flex items-center">
        <img src="/img/logo.svg" alt="logo fonx’" class="h-14 md:h-16 w-auto" />
      </NuxtLink>

      <!-- menu -->
      <nav class="flex flex-col md:flex-row gap-4 md:gap-10 text-sm md:text-base text-center">
        <NuxtLink to="/products" class="hover:text-black transition">produtos</NuxtLink>
        <NuxtLink to="/about" class="hover:text-black transition">sobre</NuxtLink>
        <NuxtLink to="/contact" class="hover:text-black transition">contato</NuxtLink>
        <NuxtLink to="/privacy" class="hover:text-black transition">política de privacidade</NuxtLink>
      </nav>

      <!-- redes sociais -->
      <div class="flex items-center gap-5">
        <NuxtLink to="#" class="hover:text-black transition">
          <Icon name="lucide:facebook" class="w-5 h-5" />
        </NuxtLink>
        <NuxtLink to="#" class="hover:text-black transition">
          <Icon name="lucide:instagram" class="w-5 h-5" />
        </NuxtLink>
        <NuxtLink to="#" class="hover:text-black transition">
          <Icon name="lucide:twitter" class="w-5 h-5" />
        </NuxtLink>
      </div>
    </div>

    <!-- copyright -->
    <div class="mt-6">
      <p class="text-center text-xs md:text-sm text-gray-500 py-6">
        © 2025 fonx'. merchandise · todos os direitos reservados.
      </p>
    </div>
  </footer>
</template>

<script setup>
// sem lógica
</script>
