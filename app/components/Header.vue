<template>
  <header class="w-full bg-white text-1D1D1B shadow-md sticky top-0 z-50">
    <div class="max-w-full mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo (esquerda) -->
      <NuxtLink to="/" class="flex items-center">
        <img src="/img/logotipo.svg" alt="Logo" class="h-16 w-auto" />
      </NuxtLink>

      <!-- Menu central -->
      <nav class="hidden md:flex gap-8 text-lg">
        <NuxtLink to="/products" class="hover:text-black/60 transition">produtos</NuxtLink>
        <NuxtLink to="/about" class="hover:text-black/60 transition">sobre</NuxtLink>
        <NuxtLink to="/contact" class="hover:text-black/60 transition">contato</NuxtLink>
      </nav>

      <!-- Login/User + Carrinho (direita) -->
      <div class="flex items-center gap-4">
        <!-- se logado (visual) -->
      <NuxtLink v-if="showUserIcon" to="/account" class="hover:text-black/60 transition">
        <Icon name="lucide:user" class="w-6 h-6" />
      </NuxtLink>

      <!-- se não logado -->
      <NuxtLink v-else to="/login" class="hover:text-black/60 transition">
        <Icon name="lucide:log-in" class="w-6 h-6" />
      </NuxtLink>


        <!-- Carrinho com badge -->
        <NuxtLink to="/cart" class="relative hover:text-black/60 transition">
          <Icon name="lucide:shopping-cart" class="w-6 h-6" />
          <span
            v-if="totalItens > 0"
            class="absolute -top-2 -right-2 bg-black text-white text-xs px-1.5 rounded-full"
          >
            {{ totalItens }}
          </span>
        </NuxtLink>

        <!-- Menu Mobile -->
        <button @click="toggleMenu" class="md:hidden hover:text-black/60 transition">
          <Icon name="lucide:menu" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Menu Mobile -->
    <transition name="fade">
      <nav v-if="isOpen" class="md:hidden bg-white border-t border-gray-200">
        <ul class="flex flex-col gap-4 px-6 py-4">
          <li><NuxtLink to="/products" @click="closeMenu">produtos</NuxtLink></li>
          <li><NuxtLink to="/about" @click="closeMenu">sobre</NuxtLink></li>
          <li><NuxtLink to="/contact" @click="closeMenu">contato</NuxtLink></li>
        </ul>
      </nav>
    </transition>
  </header>
</template>

<script setup>

import { computed } from "vue"
import { useCart } from "~/composables/useCart"

const { cartItems } = useCart()

// soma todas as quantidades
const totalItens = computed(() =>
  cartItems.value.reduce((acc, item) => acc + item.qty, 0)
)

import { ref, onMounted } from 'vue'

const isOpen = ref(false)
const user = ref(null)
const showUserIcon = ref(false) // controla o ícone visualmente

function toggleMenu() { isOpen.value = !isOpen.value }
function closeMenu() { isOpen.value = false }

// 1) pinta o ícone de "user" imediatamente se tiver flag local
onMounted(() => {
  const flag = localStorage.getItem('fonx_is_auth') === '1'
  const nome = localStorage.getItem('fonx_user_name')
  showUserIcon.value = flag
  if (flag && nome) user.value = { nome }

  // 2) valida de verdade no backend (cookie/auth real)
  validaSessao()
})

async function validaSessao() {
  try {
    const res = await fetch('https://api.fonx.com.br/me.php', {
      method: 'GET',
      credentials: 'include'
    })
    // se o servidor quebrar/retornar html, evita erro de json
    if (!res.ok) {
      showUserIcon.value = false
      user.value = null
      return
    }
    const data = await res.json()
    if (data.success) {
      user.value = data.user
      showUserIcon.value = true
      // mantém nome atualizado p/ próximos loads
      if (data.user?.nome) localStorage.setItem('fonx_user_name', data.user.nome)
      localStorage.setItem('fonx_is_auth', '1')
    } else {
      showUserIcon.value = false
      user.value = null
      localStorage.removeItem('fonx_is_auth')
      localStorage.removeItem('fonx_user_name')
    }
  } catch (e) {
    // falhou? volta pro login visualmente
    showUserIcon.value = false
    user.value = null
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
