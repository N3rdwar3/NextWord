<script setup>
defineProps({
  letter: String,
})
</script>

<template>
  <div
      class="letter-tile bg-orange-200 border-b-4 border-b-orange-950 border-l-4 border-l-orange-600 p-2 text-lg w-12 text-center"
      v-text="letter"
      draggable="true"
  >
  </div>
</template>

<style scoped>
  .letter-tile {
    transition: all 300ms ease;
  }
  .active {
    background: green;
  }
  .shuffleLeft {
    margin-right: 2px;
  }
  .shuffleRight {
    margin-left: 2px;
  }
</style>