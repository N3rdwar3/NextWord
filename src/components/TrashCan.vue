<script setup>
import {useGameStateStore} from "@/stores/gameStateStore.js";
let store = useGameStateStore();

let dragOver = (e) => {
  if(! store.trashDisabled){
    e.preventDefault();
  }
}
let dragEnter = (e) => {
  // make trash can shake or something?
}
let dragLeave = (e) => {
  // make trash can stop shaking?
}
let dropped = (e) => {
  store.remove(e.dataTransfer.getData('text/plain'))
}
</script>

<template>
  <div
    class="w-full rounded-lg text-center text-lg text-white items-center p-2"
    :class="{
      'bg-red-700 shake-trashcan': !store.trashDisabled,
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
.shake-trashcan {
  animation: tilt-shaking 500ms infinite;
}
</style>