<template>
  <transition name="fade">
    <div 
      v-if="show" 
      class="fixed inset-0 bg-white flex items-center justify-center z-[9999]"
    >
      <img src="/img/logo.svg" alt="fonx’ logo" class="h-16 w-auto animate-pulse" />
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-leave-to {
  opacity: 0;
}
</style>
