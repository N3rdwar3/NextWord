<script setup>
defineProps({
  letter: String,
})
</script>

<template>
  <div
      class="flex justify-center text-black letter-tile wood-texture bg-orange-300 border-b-4 border-b-orange-950 border-l-2 border-l-orange-900 text-center"
      draggable="true"
  >
    {{ letter }}
  </div>
</template>

<style scoped>
  .letter-tile {
    transition: all 300ms ease;
    font-size: 2.5rem;
    width: 4rem;
    height: 4rem;
  }
  @media (max-width: 768px) {
    .letter-tile {
      font-size: 2rem;
      width: 3.5rem;
      height: 3.5rem;
    }
  }
  .active {
    background-color: lightgreen;
  }
  .shuffleLeft {
    margin-right: 2rem;
  }
  .shuffleRight {
    margin-left: 2rem;
  }
</style>