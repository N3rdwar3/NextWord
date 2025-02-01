<script setup>
import {useGameStateStore} from "@/stores/gameStateStore.js";
import ActiveWordLetterTile from "@/components/ActiveWordLetterTile.vue";
import LetterTile from "@/components/LetterTile.vue";
let store = useGameStateStore();
</script>

<template>
  <Transition
      enter-from-class="opacity-0 scale-125"
      enter-to-class="opacity-100 scale-100"
      enter-active-class="transition duration-300"
      leave-active-class="transition duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-125"
  >
    <div v-if="store.showTodaysIntro" class="modal-mask">
      <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div class="bg-gray-800 rounded-lg shadow-lg w-full max-w-md md:max-w-lg p-6 text-white">
          <header class="text-lg md:text-lg font-bold text-center pb-2 flex-col flex-wrap pt-2">Today's Puzzle</header>
          <header class="text-lg md:text-xl font-bold text-center border-b pb-2 flex-col flex-wrap pt-4">Starting Word</header>
          <div class="flex flex-row my-6 justify-center">
            <LetterTile
                v-for="(letter, index) in store.startWord"
                :key="index"
                :letter="letter"
            />
          </div>
          <header class="text-lg md:text-xl font-bold text-center border-b pb-2 flex-col flex-wrap pt-2">Final Word</header>
          <div class="flex flex-row my-6 justify-center">
            <LetterTile
                v-for="(letter, index) in store.finalWord"
                :key="index"
                :letter="letter"
            />
          </div>
          <footer class="mt-4 flex justify-center">
            <button @click="$emit('closeModal')"
                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Start
            </button>
          </footer>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .6);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
}

.modal-container {
  background: white;
  padding: 1rem;
  color: black;
  height: 30vh;
  width: 75vw;
}
</style>