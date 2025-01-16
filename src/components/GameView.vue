<script setup>

import ActiveWord from "@/components/ActiveWord.vue";
import Alphabet from "@/components/Alphabet.vue";
import TrashCan from "@/components/TrashCan.vue";
import WordPath from "@/components/WordPath.vue";

</script>

<template>
  <div class="flex flex-col w-full p-4 gap-2 max-w-md">
    <section class="flex justify-end align-top">
      <TrashCan />
    </section>
    <section class="flex w-full border-light border-2 p-2 rounded-lg gap-2 h-32">
      <WordPath />
    </section>
    <section class="flex flex-col flex-grow-1 gap-2">
      <ActiveWord/>
    </section>
    <section class="flex flex-col">
      <Alphabet/>
    </section>
  </div>
</template>