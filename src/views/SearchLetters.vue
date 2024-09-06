<template>
  <DetaildMealCards :data="meals" />
</template>
<script setup>
import { computed, onMounted } from "vue";
import store from "@/store";
import { useRoute } from "vue-router";
import DetaildMealCards from "@/components/DetaildMealCards.vue";
const route = useRoute();
const meals = computed(() => store.getters.mealsByLetters);
onMounted(() => {
  function getMeals() {
    store.dispatch("searchLetter", route.params.letter);
  }
  getMeals();
});
</script>
<style scoped></style>
