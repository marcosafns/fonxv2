<template>
  <div class="max-w-4xl mx-auto px-6 py-20 text-gray-700">
    <h1 class="text-3xl font-bold mb-6 text-center">política de privacidade</h1>
    <p class="text-center mb-12 text-gray-600">
      entendemos a importância da sua privacidade. aqui explicamos como coletamos, usamos e protegemos suas informações.
    </p>

    <!-- seção 1 -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-3">1. informações que coletamos</h2>
      <p>
        coletamos dados fornecidos por você, como nome, email e endereço, quando realiza cadastro ou compra em nossa loja.
        também podemos coletar informações de navegação, como páginas acessadas e tempo de permanência.
      </p>
    </section>

    <!-- seção 2 -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-3">2. como usamos seus dados</h2>
      <p>
        utilizamos suas informações para processar pedidos, melhorar a experiência de navegação, enviar comunicações
        e garantir a segurança do nosso site.
      </p>
    </section>

    <!-- seção 3 -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-3">3. compartilhamento de informações</h2>
      <p>
        não vendemos ou alugamos seus dados. podemos compartilhar informações apenas com parceiros de pagamento, logística
        ou quando exigido por lei.
      </p>
    </section>

    <!-- seção 4 -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-3">4. cookies</h2>
      <p>
        utilizamos cookies para melhorar sua experiência de navegação e oferecer recomendações personalizadas.
        você pode desativar os cookies no seu navegador, mas algumas funcionalidades podem ser afetadas.
      </p>
    </section>

    <!-- seção 5 -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-3">5. segurança</h2>
      <p>
        adotamos medidas técnicas e administrativas para proteger seus dados contra acessos não autorizados,
        perdas ou alterações.
      </p>
    </section>

    <!-- seção 6 -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-3">6. seus direitos</h2>
      <p>
        você pode solicitar acesso, atualização ou exclusão dos seus dados pessoais a qualquer momento,
        entrando em contato pelo nosso <NuxtLink to="/contact" class="underline">formulário de contato</NuxtLink>.
      </p>
    </section>

    <!-- seção 7 -->
    <section>
      <h2 class="text-xl font-semibold mb-3">7. alterações nesta política</h2>
      <p>
        podemos atualizar esta política de tempos em tempos. notificaremos sobre mudanças importantes através do nosso site.
      </p>
    </section>

    <p class="mt-16 text-center text-sm text-gray-500">
      última atualização: agosto/2025
    </p>
  </div>
</template>

<script setup>
useHead({
  title: "política de privacidade | fonx'. merchandise",
  meta: [
    { name: "description", content: "veja como a fonx' protege suas informações pessoais e respeita sua privacidade." },
    { property: "og:title", content: "política de privacidade | fonx'. merchandise" },
    { property: "og:description", content: "entenda nossa política de privacidade e segurança de dados." },
    { property: "og:type", content: "website" }
  ]
})
</script>