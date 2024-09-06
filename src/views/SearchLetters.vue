<template>
  <DetaildMealCards :data="meals" />
</template>
<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import DetaildMealCards from "@/components/DetaildMealCards.vue";
import useMealStore from "@/store";
const route = useRoute();
const mealStore = useMealStore();
const meals = computed(() => mealStore.getMealsByLetters);
onMounted(() => {
  function getMeals() {
    mealStore.searchLetter(route.params.letter);
  }
  getMeals();
});
</script>
<style scoped></style>
