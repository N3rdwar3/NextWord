<script setup>
import {useGameStateStore} from "@/stores/gameStateStore.js";
import RoundButton from "@/components/RoundButton.vue";

let store = useGameStateStore();
</script>

<template>
  <div class="flex justify-center flex-col text-white font-serif text-center">
    <div class="absolute right-4 top-0">
      <RoundButton
          @click="$emit('openModal')"
      >?</RoundButton>
    </div>
    <div class="absolute left-4 top-0">
      <RoundButton
          @click="store.resetGame()"
      >⟳</RoundButton>
    </div>
    <span class="font-title">NextWord</span>
    <h1 class="mt-4 mb-1 text-lg">{{ store.finalWord }}</h1>
    <h5 class="text-lg">Author's Best: {{ store.authorsBest }}</h5>
  </div>
</template>

<style scoped>

</style>