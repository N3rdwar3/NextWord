<script setup>
import HeaderView from '@/components/HeaderView.vue';
import GameView from '@/components/GameView.vue';
import HelpModal from "@/components/HelpModal.vue";
import {ref} from "vue";
import {useGameStateStore} from "@/stores/gameStateStore.js";
import GameEndModal from "@/components/GameEndModal.vue";

let showModal = ref(false);

let store = useGameStateStore();
store.initGame();
</script>

<template>
  <div class="top-div flex flex-col bg-gray-800 pt-8 px-1 rounded-lg border-white max-h-screen h-full justify-center">
    <header class="relative">
      <HeaderView @openModal="showModal = true" />
    </header>
    <main>
      <GameView/>
    </main>
  </div>
  <Teleport to="body">
    <HelpModal :showHelp="showModal" @closeModal="showModal = false"/>
  </Teleport>
  <Teleport to="body">
    <GameEndModal @closeModal="store.gameOver=false"/>
  </Teleport>
</template>