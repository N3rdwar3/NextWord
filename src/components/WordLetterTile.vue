<script setup>
import LetterTile from "@/components/LetterTile.vue";
import { useDraggable } from "@/composables/useDraggable.js";

let drag = useDraggable();
defineProps({
  letter: String,
})
</script>

<template>
  <LetterTile
    :letter="letter"
    @dragstart="drag.dragStart"
    @dragover="drag.dragShuffle"
    @drop="drag.dragAdd"
  />
</template>
