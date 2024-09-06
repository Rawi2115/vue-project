<script setup>
import { onMounted } from "vue";
import useMealStore from "./store";
const mealStore = useMealStore();
onMounted(() => {
  mealStore.initializeSavedMeals();
});
</script>

<template>
  <header
    class="h-24 shadow-md px-6 py-4 lg:px-12 lg:py-8 flex justify-between items-center"
  >
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <div class="flex gap-4">
      <router-link :to="{ name: 'byName' }">Search</router-link>
      <router-link :to="{ name: 'byIngredient' }">By Ingredients</router-link>
      <router-link :to="{ name: 'saved' }">Saved</router-link>
    </div>
  </header>
  <main class="bg-gray-300 min-h-screen">
    <router-view />
  </main>
</template>

<style scoped></style>
