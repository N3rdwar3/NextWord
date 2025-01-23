<script setup>
import AlphabetLetterTile from "@/components/AlphabetLetterTile.vue";

let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

</script>

<template>
  <div
      class="flex p-2 max-w-md rounded-lg justify-center"
  >
    <section class="grid grid-cols-5 gap-0.5">
      <AlphabetLetterTile
          v-for="(letter, index) in alphabet"
          :letter="letter"
          :key="index"
          :class="{
            'col-start-3': letter==='Z'
          }"
      />
    </section>
  </div>
</template>
