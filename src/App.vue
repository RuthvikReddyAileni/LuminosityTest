<script setup lang="ts">
// Single-page MVP; router not needed for this scope.
</script>

<template>
  <CatalogPage />
  <ToastHost />
</template>

<script lang="ts">
import CatalogPage from '@/pages/CatalogPage.vue';
import ToastHost from '@/components/ToastHost.vue';
export default { components: { CatalogPage, ToastHost } };
</script>

<style>
@import './styles.css';
</style>