<script setup>
import LetterTile from "@/components/LetterTile.vue";
import {useGameStateStore} from "@/stores/gameStateStore.js";


defineProps({
  dataIndex: Number,
  index: Number,
  letter: String
})

let store = useGameStateStore();
let activeIndex = null;

let dragStart = (e, index) => {
  e.dataTransfer.setData('text/plain', index)
  e.target.classList.toggle('active');
  store.trashDisabled = false;
}

let dropped = (e) => {
  store.add(activeIndex, e.dataTransfer.getData('text/plain'));
}
let dragOver = (e) => {
  e.preventDefault();
  const hostRect = e.target.getBoundingClientRect();
  const hostX = hostRect.left + (hostRect.right-hostRect.left)/2;
  if(+(e.clientX) > hostX){
    // make this element move to the left to make space
    activeIndex = +(e.target.getAttribute('data-index'))+1;
    e.target.classList.add('shuffleLeft');
    e.target.classList.remove('shuffleRight');
    // if this element has a sibling to the right make it shuffle to the right
    if(activeIndex < e.target.parentElement.children.length - 1){
      e.target.nextElementSibling.classList.add('shuffleRight');
      e.target.nextElementSibling.classList.remove('shuffleLeft');
    }
  } else {
    // make this element move to the right to make space
    activeIndex = +(e.target.getAttribute('data-index'));
    e.target.classList.add('shuffleRight');
    e.target.classList.remove('shuffleLeft');
    // if this element has a sibling to the left make it shuffle to the left
    if(activeIndex > 0) {
      e.target.previousElementSibling.classList.add('shuffleLeft');
      e.target.previousElementSibling.classList.remove('shuffleRight');
    }
  }
}
let dragEnd = (e) => {
  e.target.classList.remove('active');
  store.trashDisabled = true;
}


</script>

<template>

    <LetterTile
        @dragstart="(e) => {dragStart(e, index)}"
        @dragend="dragEnd"
        @drop="dropped"
        @dragover="dragOver"
        @click="() => {store.activeIndex = store.activeIndex === index ? null: index}"
        :letter="letter"
        :data-index="dataIndex"
    />
</template>

<style scoped>

</style>