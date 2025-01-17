<script setup>
import HeaderView from '@/components/HeaderView.vue';
import GameView from '@/components/GameView.vue';
import HelpModal from "@/components/HelpModal.vue";
import {ref} from "vue";

let showModal = ref(false);
</script>

<template>
  <div class="flex flex-col bg-gray-800 p-2 rounded-lg border-white ">
    <header>
      <HeaderView @openModal="showModal = true" />
    </header>
    <main>
      <GameView/>
    </main>
  </div>

  <HelpModal :showHelp="showModal" @closeModal="showModal = false"/>
</template>

<style scoped>
html, body {
  height: 100%;
  width: 75vw;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
