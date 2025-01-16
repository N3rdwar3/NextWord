<script setup>

import {useGameStateStore} from "@/stores/gameStateStore.js";
import AlphabetLetterTile from "@/components/AlphabetLetterTile.vue";

let store = useGameStateStore();
let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

</script>

<template>
  <div
      class="flex p-2 max-w-md rounded-lg"
  >
    <section class="flex flex-wrap gap-2 justify-around">
      <AlphabetLetterTile
          v-for="(letter, index) in alphabet"
          :letter="letter"
          :key="index"
      />
    </section>
  </div>
</template>
