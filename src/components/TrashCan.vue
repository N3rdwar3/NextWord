<script setup>
import {useGameStateStore} from "@/stores/gameStateStore.js";
let store = useGameStateStore();
let dragOver = (e) => {
  if(! store.trashDisabled){
    e.preventDefault();
  }
}
let dragEnter = (e) => {
  e.target.classList.add('hover');
}
let dragLeave = (e) => {
  e.target.classList.remove('hover');
}
let dropped = (e) => {
  store.modify('remove', {'index': store.activeIndex});
  e.target.classList.remove('hover');
}
</script>

<template>
  <div
    class="absolute w-full h-full rounded-lg text-center text-gray-500 items-center p-2 z-10
    border border-2 border-gray-600 place-content-center"
    :class="{
      'hidden': store.trashDisabled
    }"
    @dragenter="dragEnter"
    @dragover="dragOver"
    @dragleave="dragLeave"
    @drop="dropped"
  >
    &times;
  </div>
</template>

<style scoped>
@keyframes tilt-shaking {
  0% { transform: rotate(0deg); }
  25% { transform: rotate(2.5deg); }
  50% { transform: rotate(0eg); }
  75% { transform: rotate(-2.5deg); }
  100% { transform: rotate(0deg); }
}
div {
  font-size: 10rem;
  background-color: rgba(100, 100, 100, 80);
  opacity: 0.95;
}
.hover {
  background: white;
  transition: background-color ease 300ms ;
}
</style>