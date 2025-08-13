<script setup lang="ts">
import type { Product } from '@/types';
import { useCatalogStore } from '@/stores/useCatalogStore';
import { computed } from 'vue';
import { useToastStore } from '@/stores/useToastStore';

const props = defineProps<{ product: Product }>();
const store = useCatalogStore();
const toast = useToastStore();

const max = computed(() => props.product.stock);

const qty = computed<number>({
  get() {
    const line = store.cart.find(l => l.productId === props.product.id);
    return line?.qty ?? 0;
  },
  set(raw) {
    let n = Number.isFinite(raw) ? Math.trunc(raw) : 0;

    // Show toast and clamp if user goes past stock
    if (n > max.value) {
      toast.warn(`Only ${max.value} in stock`, props.product.name);
      n = max.value;
    }
    if (n < 0) n = 0;

    store.setQty(props.product.id, n);
  }
});

function onTryEdit() {
  if (props.product.stock === 0) {
    toast.warn('Out of stock right now', props.product.name);
  }
}
</script>

<template>
  <article class="card card--landscape" tabindex="0">
    <div class="card__img">
      <img
        :src="encodeURI(product.imageUrl)"
        :alt="product.name"
        loading="lazy"
        @error="(e:any)=>{ e.target.src='/placeholder.png'; }"
      />
    </div>
    <div class="card__body">
      <header>
        <h3 class="card__title">{{ product.name }}</h3>
        <p class="card__desc">{{ product.description }}</p>
      </header>

      <div class="card__meta">
        <span class="price">${{ product.price.toFixed(2) }}</span>
        <span class="badge" :title="product.category">{{ product.category }}</span>
      </div>

      <div class="card__meta" style="margin-top:.25rem;">
        <span class="stock" :class="{ notice: product.stock === 0 }">
          <strong v-if="product.stock === 0">Out of stock</strong>
          <template v-else>{{ product.stock }} in stock</template>
        </span>

        <!-- Clicking the label shows a toast if it's out of stock -->
        <label class="input" :aria-disabled="product.stock === 0" @click="onTryEdit">
          <span class="sr-only">Quantity for {{ product.name }}</span>
          <input
            type="number"
            min="0"
            :max="max"
            step="1"
            v-model.number="qty"
            :disabled="product.stock === 0"
            inputmode="numeric"
          />
        </label>
      </div>
    </div>
  </article>
</template>
