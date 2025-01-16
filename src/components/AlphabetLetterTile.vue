<script setup>
import LetterTile from "@/components/LetterTile.vue";
import {useGameStateStore} from "@/stores/gameStateStore.js";

let store = useGameStateStore();

defineProps({
  letter: String
})
let toggleReplacement = (e) => {
  const elem = e.target;
  elem.classList.toggle('active');
}
let dragOver = (e) => {
  e.preventDefault();
}
let dropped = (e) => {
  // get which tile we were dealing with from the active word
  e.preventDefault();
  console.log(e.dataTransfer.getData('text/plain')); // This should be index when from active, letter when from alphabet
  console.log(e.target.innerText); // letter dropped on
  if(!isNaN(e.dataTransfer.getData('text/plain'))){
    store.replace(e.dataTransfer.getData('text/plain'), e.target.innerText );
  }
  e.target.classList.remove('active');
}

let dragStart = (e, letter) => {
  e.dataTransfer.setData('text/plain', letter);
  e.target.classList.toggle('active');
}

let dragEnd = (e) => {
  // Toggle the 'active' class for the dragged element
  e.target.classList.remove('active');
  // incase of a failed drop need this here instead of the activeword
  setTimeout(() => {
    const siblings = document.querySelector('#active-word').children;
    // Iterate over each sibling and remove shuffle classes
    for (let elem of siblings) {
      elem.classList.remove('shuffleRight');
      elem.classList.remove('shuffleLeft');
    }
  }, 200);

};
</script>

<template>
  <LetterTile
      :letter="letter"
      @drop="dropped"
      @dragover="dragOver"
      @dragenter="toggleReplacement"
      @dragleave="toggleReplacement"
      @dragstart="(e) => {dragStart(e,letter)}"
      @dragend="dragEnd"
      @click="store.replace(store.activeIndex, letter)"
  />

</template>

<style scoped>

</style>