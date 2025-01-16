<script setup>
import HeaderView from '@/components/HeaderView.vue';
import GameView from '@/components/GameView.vue';
</script>

<template>
  <div class="flex flex-col bg-gray-800 p-2 rounded-lg border-white ">
    <header>
      <HeaderView/>
    </header>
    <main>
      <GameView/>
    </main>
  </div>
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
