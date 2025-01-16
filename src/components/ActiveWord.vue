<script setup>
import ActiveWordLetterTile from "@/components/ActiveWordLetterTile.vue";
import {useGameStateStore} from "@/stores/gameStateStore.js";
import {ref} from "vue";

let store = useGameStateStore();

</script>
<template>
  <div
      id="active-word"
      class="flex flex-grow items-center justify-center gap-2 p-2 border-b-2 border-light"
  >
    <ActiveWordLetterTile
        v-for="(letter, index) in store.activeWord"
        :key="index"
        :dataIndex="index"
        :index="index"
        :letter="letter"
        :class="{
          'active': store.activeIndex === index
        }"
    />
  </div>
</template>