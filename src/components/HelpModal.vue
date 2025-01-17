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
      <div class="modal-container">
        <header>Header Text</header>
        <div>Main Text</div>
        <footer>
          <button @click="$emit('closeModal')">Close</button>
        </footer>
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