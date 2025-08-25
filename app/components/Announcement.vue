<template>
  <div class="w-full bg-black text-white text-sm py-2 overflow-hidden">
    <div class="marquee">
      <div class="marquee__inner">
        <span v-for="(msg, i) in messages" :key="i" class="px-8">
          {{ msg }}
        </span>
        <!-- clone direto na mesma linha -->
        <span v-for="(msg, i) in messages" :key="'clone-' + i" class="px-8">
          {{ msg }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const messages = [
  "frete grátis em compras acima de R$199 🚚",
  "10% off na primeira compra ✨",
  "parcelamento em até 6x sem juros 💳",
  "nova coleção disponível agora 🔥"
]
</script>

<style scoped>
.marquee {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.marquee__inner {
  display: inline-flex;
  white-space: nowrap;
  will-change: transform;
  animation: marquee 20s linear infinite;
}

.marquee__inner span {
  flex-shrink: 0;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
</style>
