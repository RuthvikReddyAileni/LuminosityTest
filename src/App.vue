<script setup lang="ts">
// Single-page MVP; router not needed for this scope.
</script>

<template>
  <CatalogPage />
</template>

<script lang="ts">
import CatalogPage from '@/pages/CatalogPage.vue';
export default { components: { CatalogPage } };
</script>

<style>
@import './styles.css';
</style>