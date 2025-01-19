<script setup>
import {useGameStateStore} from "@/stores/gameStateStore.js";
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
    <div v-if="store.gameOver" class="modal-mask">
      <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div v-if="store.score<store.maxAttempts" class="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-lg p-6 text-black">
          <header class="text-lg md:text-xl font-bold text-center border-b pb-2">
            Congratulations!
          </header>
          <div class="my-4 text-sm md:text-base leading-relaxed text-center">
            <p>
              You have completed today's puzzle!
            </p>
            <ul class="list-inside mt-2 space-y-2 text-center">
              <li class="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg text-lg">
                Author's Best: {{ store.authorsBest }}
              </li>
              <li :class="{
                'bg-gradient-to-r from-green-500 to-green-400 p-2 rounded-lg text-lg': store.score<=store.authorsBest,
                'bg-gradient-to-r from-red-500 to-red-400 p-2 rounded-lg text-lg': store.score>store.authorsBest
              }">
                Your Score: {{ store.score }}
              </li>
            </ul>
            <p class="mt-2">Check in tomorrow for a new puzzle!</p>
          </div>
          <footer class="mt-4 flex justify-center">
            <button @click="$emit('closeModal')"
                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Close
            </button>
          </footer>
        </div>
        <div v-else class="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-lg p-6 text-black">
          <header class="text-lg md:text-xl font-bold text-center border-b pb-2">
            Nice Try!
          </header>
          <div class="my-4 text-sm md:text-base leading-relaxed text-center">
            <p class="bg-gradient-to-r from-red-500 to-red-400 p-2 rounded-lg text-lg">
              You have reached maximum number of guesses ({{ store.maxAttempts }}).
            </p>
            <p>
              Feel free to refresh the page to try again!
            </p>
          </div>
          <footer class="mt-4 flex justify-center">
            <button @click="$emit('closeModal')"
                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Close
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