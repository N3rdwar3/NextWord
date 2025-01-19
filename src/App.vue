<script setup>
import HeaderView from '@/components/HeaderView.vue';
import GameView from '@/components/GameView.vue';
import HelpModal from "@/components/HelpModal.vue";
import {ref} from "vue";

let showModal = ref(false);
</script>

<template>
  <div class="top-div flex flex-col bg-gray-800 py-4 px-1 rounded-lg border-white max-h-screen">
    <header>
      <HeaderView @openModal="showModal = true" />
    </header>
    <main>
      <GameView/>
    </main>
  </div>
  <Teleport to="body">
    <HelpModal :showHelp="showModal" @closeModal="showModal = false"/>
  </Teleport>
</template>