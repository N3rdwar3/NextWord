<script setup>
defineProps({
  showHelp: Boolean
})
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
    <div v-if="showHelp" class="modal-mask">
      <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-lg p-6 text-black">
          <header class="text-lg md:text-xl font-bold text-center border-b pb-2">How To Play</header>
          <div class="mt-4 text-sm md:text-base leading-relaxed">
            <p>
              The objective of the game is to find the shortest path from the starting word to the ending word.
              The starting word is the word made out of tiles that sits above the alphabet, and the ending word is the word in all
              uppercase at the top of the screen.
            </p>
            <p class="mt-2">To navigate, you have three choices:</p>
            <ol class="list-decimal list-inside mt-2 space-y-2">
              <li>
                Add a letter from the alphabet into your word by dragging it and dropping it where it should go.
              </li>
              <li>
                Swap out a letter from the word by either tapping it and then tapping a letter in the alphabet,
                or dragging it onto a tile in the alphabet.
              </li>
              <li>
                Drag a letter up into the delete button, which is only visible while dragging the tile.
              </li>
            </ol>
            <p class="mt-2">At each step along the way, you must form an English word. Each move adds one to your score.</p>
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