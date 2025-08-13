<script setup lang="ts">
import { useToastStore } from '@/stores/useToastStore';
const toast = useToastStore();
</script>

<template>
  <div class="toast-host" role="status" aria-live="polite" aria-atomic="true">
    <div v-for="t in toast.list" :key="t.id" class="toast" :class="`toast--${t.type}`">
      <div style="display:flex; gap:.35rem; align-items:baseline;">
        <strong v-if="t.title">{{ t.title }}</strong>
        <span>{{ t.message }}</span>
      </div>
      <button class="toast__close" aria-label="Close" @click="toast.remove(t.id)">✕</button>
    </div>
  </div>
</template>
