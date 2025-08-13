import { defineStore } from 'pinia';
import type { CartLine, Category, Product } from '@/types';
import { fetchProducts, seedIfEmpty } from '@/services/productService';

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    products: [] as Product[],
    selectedCategory: 'All' as Category | 'All',
    cart: [] as CartLine[],
    loading: false,
    error: '' as string | null,
    showCart: false,
  }),

  getters: {
    categories(state) {
      const set = new Set(state.products.map((p) => p.category));
      return ['All', ...Array.from(set)] as (Category | 'All')[];
    },
    filteredProducts(state) {
      return state.selectedCategory === 'All'
        ? state.products
        : state.products.filter((p) => p.category === state.selectedCategory);
    },
    // Compute a map for quick product lookup by id (helps OrderSummary)
    productMap(state) {
      return new Map(state.products.map((p) => [p.id, p] as const));
    },
    // Live subtotal calculated from cart lines
    subtotal(state): number {
      return state.cart.reduce((sum, line) => {
        const product = (this as any).productMap.get(line.productId) as Product | undefined;
        return product ? sum + product.price * line.qty : sum;
      }, 0);
    },

  },

  actions: {
    async init() {
      try {
        this.loading = true;
        this.error = '';
        // Seed once for convenience; harmless if already seeded.
        await seedIfEmpty();
        this.products = await fetchProducts();
      } catch (e: any) {
        this.error = e?.message ?? 'Failed to load products';
      } finally {
        this.loading = false;
      }
    },

    setCategory(cat: Category | 'All') {
      this.selectedCategory = cat;
    },

    setQty(productId: string, qty: number) {
      // If line exists update; else push (constraints enforced by UI)
      const line = this.cart.find((l) => l.productId === productId);
      if (line) {
        line.qty = qty;
      } else {
        this.cart.push({ productId, qty });
      }
      // Clean up zero-qty lines to keep order summary tidy
      this.cart = this.cart.filter((l) => l.qty > 0);
    },

    submitOrder() {
      // MVP requirement: output order to console or screen (no backend).
      const lines = this.cart.map((l) => {
        const p = this.productMap.get(l.productId)!;
        return { id: p.id, name: p.name, price: p.price, qty: l.qty, lineTotal: +(p.price * l.qty).toFixed(2) };
      });
      const order = { lines, subtotal: +this.subtotal.toFixed(2), createdAt: new Date().toISOString() };
      // Console output for reviewer (explicit per instructions)
      // eslint-disable-next-line no-console
      console.log('ORDER_SUBMISSION', order);
      return order;
    },

    toggleCart() {
      this.showCart = !this.showCart;
    },
    openCart(val: boolean) {
      this.showCart = val;
    },
    clearCart() {
      this.cart = [];
    },
  },
});