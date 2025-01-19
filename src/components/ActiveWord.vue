<script setup>
import ActiveWordLetterTile from "@/components/ActiveWordLetterTile.vue";
import {useGameStateStore} from "@/stores/gameStateStore.js";

let store = useGameStateStore();

let droppedOn = (e) => {
  console.log('Dropped on parent');
  console.log(e);
  if(store.draggingActiveTile){
    return;
  }
  // allow dropping on LHS and RHS of word
  if(store.activeIndex === null){
    const hostRect = e.target.getBoundingClientRect();
    const hostX = hostRect.left + (hostRect.right-hostRect.left)/2;
    if(+(e.clientX) > hostX){
      // put this element on the end of the word
      store.activeIndex = store.activeWord.length;
    } else {
      store.activeIndex = 0;
    }
  }
  store.modify('add', {'index': store.activeIndex, 'letter': e.dataTransfer.getData('text/plain')});
}

</script>


<template>
  <div
      id="active-word"
      class="flex flex-grow items-center justify-center p-2 border-b-2 border-light"
      :class="{
        'animate-success-background': store.animateSuccessBackground === true,
        'animate-failure-background': store.animateFailureBackground === true
      }"
      @drop="droppedOn"
      @dragover="(e) => {e.preventDefault()}"
  >
    <ActiveWordLetterTile
        v-for="(letter, index) in store.activeWord"
        :key="index"
        :dataIndex="index"
        :index="index"
        :letter="letter"
        :class="{
          'active': store.activeIndex === index,
        }"
    />
  </div>
</template>
<style scoped>
/* Flash a success */
@keyframes successFlash {
  0% {
    background: unset;
  }
  50% {
    background: lightgreen;
  }
  100% {
    background: unset;
  }
}
.animate-success-background {
  animation: successFlash 300ms forwards;
}

/* Flash a failure */
@keyframes failureFlash {
  0% {
    background: unset;
  }
  50% {
    background: indianred;
  }
  100% {
    background: unset;
  }
}
.animate-failure-background {
  animation: failureFlash 300ms forwards;
}
</style>