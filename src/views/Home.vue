<template>
  <div class="flex flex-col justify-center p-8">
    <div class="flex flex-wrap gap-2 lg:gap-8 justify-center mt-2">
      <router-link
        :to="{ name: 'byLetter', params: { letter } }"
        v-for="letter in letters.split('')"
        :key="letter"
      >
        {{ letter }}
      </router-link>
    </div>
  </div>
</template>
<script setup>
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
</script>
<style scoped></style>
