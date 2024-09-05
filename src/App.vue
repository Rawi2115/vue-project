<script setup></script>

<template>
  <header
    class="h-24 shadow-md px-6 py-4 lg:px-12 lg:py-8 flex justify-between items-center"
  >
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <div class="flex gap-4">
      <router-link :to="{ name: 'byName' }">Search Meals</router-link>
      <router-link :to="{ name: 'byLetter' }">Meals by letters</router-link>
      <router-link :to="{ name: 'byIngredient' }"
        >Meals by Ingredients</router-link
      >
    </div>
  </header>
  <main class="bg-gray-300 min-h-screen">
    <router-view />
  </main>
</template>

<style scoped></style>
