<script setup lang="ts">
import { computed, nextTick } from 'vue';
import { useCatalogStore } from '@/stores/useCatalogStore';

const store = useCatalogStore();

// Safe counts (always numbers)
const itemCount = computed(() =>
  (store.cart ?? []).reduce((sum, l) => sum + (l?.qty ?? 0), 0)
);

// Pinia getter 'subtotal' should be a number, but guard anyway.
const subtotalNum = computed(() => Number.isFinite(store.subtotal) ? Number(store.subtotal) : 0);
const subtotalLabel = computed(() => subtotalNum.value.toFixed(2));

function onCartClick() {
  store.toggleCart();
  if (store.showCart) {
    nextTick(() => document.getElementById('order-summary')?.focus());
  }
}
</script>

<template>
  <div class="header__filters" role="toolbar" aria-label="Filter products by category">
    <span class="sr-only" id="category-label">Category</span>

    <!-- Category chips -->
    <button
      v-for="cat in store.categories"
      :key="cat"
      class="btn btn--ghost"
      :aria-pressed="store.selectedCategory === cat"
      :class="{ 'btn--brand': store.selectedCategory === cat }"
      @click="store.setCategory(cat)"
    >
      {{ cat }}
    </button>

    <span style="flex: 0 0 0; width: .5rem;"></span>

    <!-- Cart toggle -->
    <button
      class="btn btn--brand cart-btn"
      @click="onCartClick"
      :aria-expanded="store.showCart ? 'true' : 'false'"
      aria-controls="order-summary"
      :aria-label="`Toggle order summary. ${itemCount} items. Subtotal $${subtotalLabel}`"
      title="Toggle Order Summary"
    >
      🛒 Cart
      <span class="cart-badge" v-if="itemCount">{{ itemCount }}</span>
    </button>
  </div>
</template>
