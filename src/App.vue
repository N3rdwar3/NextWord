<script setup>
import HeaderView from '@/components/HeaderView.vue';
import GameView from '@/components/GameView.vue';
import FooterView from "@/components/FooterView.vue";
</script>

<template>
  <div class="flex flex-col">
    <header>
      <HeaderView/>
    </header>
    <main>
      <GameView/>
    </main>
    <footer>
      <FooterView/>
    </footer>
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
