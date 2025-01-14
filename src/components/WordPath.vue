<script setup>
import {useGameStateStore} from "@/stores/gameStateStore.js";
let store = useGameStateStore();

</script>

<template>
  <div class="flex flex-col flex-wrap gap-1">
      <div
        v-for="(word, index) in store.wordPath"
      >{{ index }}.{{ word }}</div>
  </div>
</template>

<style scoped>

</style>