<script setup>
import LetterTile from "@/components/LetterTile.vue";
import {useGameStateStore} from "@/stores/gameStateStore.js";

let store = useGameStateStore();

defineProps({
  letter: String
})
let toggleReplacement = (e) => {
  // dont interact with other alphabet tiles
  if(store.draggingAlphabetTile === true){
    return;
  }
  const elem = e.target;
  elem.classList.toggle('active');
}
let draggedOver = (e) => {
  e.preventDefault();
}
let droppedOn = (e, letter) => {
  // get which tile we were dealing with from the active word
  e.preventDefault();
  // dont interact with other alphabet tiles
  if(store.draggingAlphabetTile === true){
    return;
  }
  store.modify("replace",
      {
        'index': store.activeIndex,
        'letter': letter
      }
  );
  e.target.classList.remove('active');
}

let dragStart = (e, letter) => {
  e.dataTransfer.setData('text/plain', letter);
  e.target.classList.toggle('active');
  store.draggingAlphabetTile = true;
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
  store.draggingAlphabetTile = false;
};
</script>

<template>
  <LetterTile
      :letter="letter"
      @drop="(e) => {droppedOn(e,letter)}"
      @dragover="draggedOver"
      @dragenter="toggleReplacement"
      @dragleave="toggleReplacement"
      @dragstart="(e) => {dragStart(e,letter)}"
      @dragend="dragEnd"
      @click="store.clickTile(null, letter)"
      :class="{
        'active': store.activeLetter===letter
      }"
  />

</template>

<style scoped>

</style>