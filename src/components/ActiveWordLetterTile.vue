<script setup>
import LetterTile from "@/components/LetterTile.vue";
import {useGameStateStore} from "@/stores/gameStateStore.js";


defineProps({
  dataIndex: Number,
  index: Number,
  letter: String
})

let store = useGameStateStore();

let dragStart = (e, index) => {
  store.activeIndex = index;
  store.trashDisabled = false;
}

let droppedOn = (e) => {
  store.add(store.activeIndex, e.dataTransfer.getData('text/plain'));
}
let draggedOver = (e) => {
  e.preventDefault();
  const hostRect = e.target.getBoundingClientRect();
  const hostX = hostRect.left + (hostRect.right-hostRect.left)/2;
  if(+(e.clientX) > hostX){
    // make this element move to the left to make space
    store.activeIndex = +(e.target.getAttribute('data-index'))+1;
    e.target.classList.add('shuffleLeft');
    e.target.classList.remove('shuffleRight');
    // if this element has a sibling to the right make it shuffle to the right
    if(store.activeIndex < e.target.parentElement.children.length - 1){
      e.target.nextElementSibling.classList.add('shuffleRight');
      e.target.nextElementSibling.classList.remove('shuffleLeft');
    }
  } else {
    // make this element move to the right to make space
    store.activeIndex = +(e.target.getAttribute('data-index'));
    e.target.classList.add('shuffleRight');
    e.target.classList.remove('shuffleLeft');
    // if this element has a sibling to the left make it shuffle to the left
    if(store.activeIndex > 0) {
      e.target.previousElementSibling.classList.add('shuffleLeft');
      e.target.previousElementSibling.classList.remove('shuffleRight');
    }
  }
}
let dragEnd = (e) => {
  store.activeIndex = null;
  store.trashDisabled = true;
}


</script>

<template>

    <LetterTile
        @dragstart="(e) => {dragStart(e, index)}"
        @dragend="dragEnd"
        @drop="droppedOn"
        @dragover="draggedOver"
        @click="() => {store.activeIndex = store.activeIndex === index ? null: index}"
        :letter="letter"
        :data-index="dataIndex"
    />
</template>

<style scoped>

</style>