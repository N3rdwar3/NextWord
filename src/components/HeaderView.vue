<script setup>
import {useGameStateStore} from "@/stores/gameStateStore.js";
let store=useGameStateStore();
</script>

<template>
<div class="flex justify-center flex-col text-white font-serif text-center">
  <span class="font-title">NextWord</span>
  <h1 class="mt-4 mb-1 text-lg">{{ store.finalWord }}</h1>
  <h5 class="text-lg">Author's Best: {{ store.authorsBest }}</h5>
</div>
</template>

<style scoped>

</style>