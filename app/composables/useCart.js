import { ref, watch } from "vue"
import { produtos } from "~/data/products" // 👈 importa estoque real

const cartItems = ref([])

// 🔹 carrega carrinho salvo no localStorage
if (process.client) {
  const saved = localStorage.getItem("fonx_cart")
  if (saved) {
    try {
      cartItems.value = JSON.parse(saved)
    } catch {
      cartItems.value = []
    }
  }
}

// 🔹 salva automaticamente quando muda
watch(cartItems, (val) => {
  if (process.client) {
    localStorage.setItem("fonx_cart", JSON.stringify(val))
  }
}, { deep: true })

export function useCart() {
  // adicionar item
  function addItem(product) {
    const produto = produtos.find(p => p.id === product.id)
    if (!produto) return

    if (produto.estoque[product.size] <= 0) {
      alert("Este tamanho está esgotado.")
      return
    }

    const existing = cartItems.value.find(
      (i) => i.id === product.id && i.size === product.size
    )

    if (existing) {
      existing.qty++
    } else {
      cartItems.value.push({ ...product, qty: 1 })
    }

    // 🔽 desconta do estoque em tempo real
    produto.estoque[product.size]--
  }

  // atualizar quantidade
  function updateQty(product, qty) {
    const produto = produtos.find(p => p.id === product.id)
    if (!produto) return

    const item = cartItems.value.find(
      (i) => i.id === product.id && i.size === product.size
    )

    if (item) {
      const diff = qty - item.qty
      if (diff > 0) {
        // aumentar quantidade
        if (produto.estoque[product.size] >= diff) {
          item.qty = qty
          produto.estoque[product.size] -= diff
        } else {
          alert("Estoque insuficiente para esse tamanho.")
        }
      } else if (diff < 0) {
        // diminuir quantidade → devolve estoque
        item.qty = qty
        produto.estoque[product.size] += Math.abs(diff)
      }

      if (item.qty <= 0) {
        removeItem(product)
      }
    }
  }

  // remover item
  function removeItem(product) {
    const produto = produtos.find(p => p.id === product.id)
    if (produto) {
      const item = cartItems.value.find(
        (i) => i.id === product.id && i.size === product.size
      )
      if (item) {
        // devolve estoque do tamanho removido
        produto.estoque[product.size] += item.qty
      }
    }

    cartItems.value = cartItems.value.filter(
      (i) => !(i.id === product.id && i.size === product.size)
    )
  }

  // limpar carrinho
  function clearCart() {
    cartItems.value.forEach(item => {
      const produto = produtos.find(p => p.id === item.id)
      if (produto) {
        produto.estoque[item.size] += item.qty
      }
    })
    cartItems.value = []
  }

  return {
    cartItems,
    addItem,
    updateQty,
    removeItem,
    clearCart
  }
}
