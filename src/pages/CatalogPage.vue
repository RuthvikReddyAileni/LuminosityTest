<script setup lang="ts">
import { onMounted } from 'vue';
import { useCatalogStore } from '@/stores/useCatalogStore';
import CategoryFilter from '@/components/CategoryFilter.vue';
import ProductCard from '@/components/ProductCard.vue';
import OrderSummary from '@/components/OrderSummary.vue';

const store = useCatalogStore();
onMounted(() => store.init());
</script>

<template>
  <!-- HEADER NOW OUTSIDE, FULL BLEED -->
  <header class="header topbar">
    <div class="header__brand">
      <img src="/Time Traveler Gift Shop Logo.png" alt="Time Traveler's Gift Shop logo" width="44" height="44" />
      <div class="header__title">Time Traveler's Gift Shop</div>
    </div>
    <CategoryFilter />
  </header>

  <!-- Page content stays in the padded container -->
  <main class="container">
    <div :class="['layout', { 'cart-open': store.showCart }]">
      <section class="catalog">
        <h2 class="sr-only">Product Catalog</h2>
        <div v-if="store.loading" class="panel">Loading products…</div>
        <div v-else-if="store.error" class="panel notice">{{ store.error }}</div>
        <div v-else class="grid">
          <ProductCard v-for="p in store.filteredProducts" :key="p.id" :product="p" />
        </div>
      </section>
      <aside class="order-panel" v-if="store.showCart">
        <OrderSummary />
      </aside>
    </div>
  </main>
</template>
