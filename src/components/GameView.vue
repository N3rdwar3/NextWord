<script setup>

import LetterTile from "@/components/LetterTile.vue";
import WordLetterTile from "@/components/WordLetterTile.vue";
</script>

<template>
<div class="flex flex-row w-full bg-dark p-4 text-black gap-2 max-w-md">
  <section class="flex flex-grow-0 w-2/5 bg-light border-gray-400 p-2 rounded-lg">
    <ul class="">
      <li>T H E</li>
      <li>T H E M</li>
      <li>T H E M E</li>
      <li>...</li>
      <li>...</li>
      <li>W H E R E</li>
    </ul>
  </section>
  <section class="flex flex-col flex-grow-1 gap-2">
    <div class="flex flex-grow items-center justify-between font-mono gap-2">
      <WordLetterTile letter="T"></WordLetterTile>
      <WordLetterTile letter="H"></WordLetterTile>
      <WordLetterTile letter="E"></WordLetterTile>
      <WordLetterTile letter="M"></WordLetterTile>
      <WordLetterTile letter="E"></WordLetterTile>
    </div>
  </section>
</div>
<div class="flex mt-2 bg-dark p-2 max-w-md text-black">
  <section class="flex flex-wrap gap-2 justify-around">
    <LetterTile letter="A"></LetterTile>
    <LetterTile letter="B"></LetterTile>
    <LetterTile letter="C"></LetterTile>
    <LetterTile letter="D"></LetterTile>
    <LetterTile letter="E"></LetterTile>
    <LetterTile letter="F"></LetterTile>
    <LetterTile letter="G"></LetterTile>
    <LetterTile letter="H"></LetterTile>
    <LetterTile letter="I"></LetterTile>
    <LetterTile letter="J"></LetterTile>
    <LetterTile letter="K"></LetterTile>
    <LetterTile letter="L"></LetterTile>
    <LetterTile letter="M"></LetterTile>
    <LetterTile letter="N"></LetterTile>
    <LetterTile letter="O"></LetterTile>
    <LetterTile letter="P"></LetterTile>
    <LetterTile letter="Q"></LetterTile>
    <LetterTile letter="R"></LetterTile>
    <LetterTile letter="S"></LetterTile>
    <LetterTile letter="T"></LetterTile>
    <LetterTile letter="U"></LetterTile>
    <LetterTile letter="V"></LetterTile>
    <LetterTile letter="W"></LetterTile>
    <LetterTile letter="X"></LetterTile>
    <LetterTile letter="Y"></LetterTile>
    <LetterTile letter="Z"></LetterTile>

  </section>
</div>
</template>

<style scoped>

</style>