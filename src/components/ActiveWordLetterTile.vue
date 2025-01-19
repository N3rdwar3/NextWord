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
  store.draggingActiveTile = true;
}
let dragLeave = (e) => {
  // if(store.draggingActiveTile){
  //   return;
  // }
  // store.activeIndex = null;
}
let droppedOn = (e) => {
  //dont interact with other active tiles
  console.log('Dropped on child');
  if(store.draggingActiveTile){
    return;
  }
  store.modify('add', {'index': store.activeIndex, 'letter': e.dataTransfer.getData('text/plain')});
  store.activeIndex = null;
}
let draggedOver = (e) => {
  e.preventDefault();
  // dont interact with other active tiles
  if(store.draggingActiveTile){
    return;
  }
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
  store.draggingActiveTile = false;
}


</script>

<template>
  <Transition
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    enter-active-class="transition duration-300"
  >
    <LetterTile
        @dragstart="(e) => {dragStart(e, index)}"
        @dragend="dragEnd"
        @dragleave="dragLeave"
        @drop="droppedOn"
        @dragover="draggedOver"
        @click="() => {store.activeIndex = store.activeIndex === index ? null: index}"
        :letter="letter"
        :data-index="dataIndex"
        :class="{
          'fade-out': store.animateOut,
          'fade-in': store.animateIn
        }"
    />
  </Transition>
</template>

<style scoped>

/* Fade out while moving */
@keyframes fadeOutMove {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(0px, -50px) scale(0.5); /* Move toward target and shrink */
  }
}

.fade-out {
  animation: fadeOutMove 300ms forwards;
}
</style>