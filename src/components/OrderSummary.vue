<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCatalogStore } from '@/stores/useCatalogStore';

const store = useCatalogStore();
const submitted = ref<null | { lines: any[]; subtotal: number; createdAt: string }>(null);

const lines = computed(() =>
  store.cart.map((l) => {
    const p = store.productMap.get(l.productId)!;
    return { id: p.id, name: p.name, price: p.price, qty: l.qty, total: +(p.price * l.qty).toFixed(2) };
  })
);

function onSubmit() { submitted.value = store.submitOrder(); }
</script>

<template>
  <!-- tabindex lets us focus this when it opens -->
  <section
    id="order-summary"
    class="panel order-panel"
    aria-labelledby="summary-heading"
    tabindex="-1"
  >
    <div style="display:flex; align-items:center; justify-content:space-between; gap:.5rem;">
      <h2 id="summary-heading" style="margin:0;">Order Summary</h2>
      <button class="btn btn--ghost" @click="store.openCart(false)" aria-label="Close order summary">✕</button>
    </div>

    <table class="table" v-if="lines.length">
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Qty</th>
          <th scope="col">Price</th>
          <th scope="col">Line Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="line in lines" :key="line.id">
          <td>{{ line.name }}</td>
          <td>{{ line.qty }}</td>
          <td>${{ line.price.toFixed(2) }}</td>
          <td>${{ line.total.toFixed(2) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">Subtotal</td>
          <td>${{ store.subtotal.toFixed(2) }}</td>
        </tr>
      </tfoot>
    </table>

    <p v-else class="stock">No items selected yet.</p>

    <div style="display:flex; gap:.5rem; margin-top: .75rem; justify-content: flex-end;">
      <button class="btn" @click="submitted = null; store.clearCart()" :disabled="!lines.length">Clear</button>
      <button class="btn btn--brand" @click="onSubmit" :disabled="!lines.length">Submit Order</button>
    </div>

    <div v-if="submitted" style="margin-top:1rem;">
      <h3 style="margin:0 0 .5rem;">Submitted Order (MVP Output)</h3>
      <pre style="white-space: pre-wrap; background:#0d1017; border:1px solid #222838; padding:.75rem; border-radius: 10px;">
{{ JSON.stringify(submitted, null, 2) }}
      </pre>
    </div>
  </section>
</template>
