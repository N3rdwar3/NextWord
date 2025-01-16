<script setup>
import {useGameStateStore} from "@/stores/gameStateStore.js";

let store = useGameStateStore();

</script>

<template>
  <div class="flex flex-col flex-wrap gap-1">
    <div class="mx-4"
         :class="{
            'text-green-400 font-title': index===store.authorsBest,
            'text-red-400': index > store.authorsBest
          }"
         v-for="(word, index) in store.wordPath"
    ><span
        v-if="index!==0"
    >{{ index }}.</span> {{ word }}
    </div>
  </div>
</template>

<style scoped>

</style>