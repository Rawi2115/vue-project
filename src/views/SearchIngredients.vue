<template>
  <div class="px-12 py-8">
    <Input
      v-model="ingredient"
      placeholder="Search for meals by ingredients"
      class="lg:w-[79%] lg:my-0 lg:mx-auto"
      type="text"
      @input="debouncedSearch"
    />
  </div>
  <div class="flex justify-center items-center w-full py-6">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[90%] lg:w-3/4"
    >
      <div
        v-for="meal in meals"
        :key="meal.idMeal"
        class="bg-white rounded shadow-md overflow-hidden flex flex-col gap-2"
      >
        <router-link
          :to="{ name: 'meal', params: { id: meal.idMeal } }"
          class="overflow-hidden"
        >
          <img
            :src="meal.strMealThumb"
            :alt="meal.strMeal"
            class="w-full h-64 object-cover hover:scale-125 transition-transform ease-in-out duration-700"
          />
        </router-link>
        <div class="flex flex-col gap-2 p-4 items-start">
          <h2 class="lg:text-xl text-md font-bold">Name: {{ meal.strMeal }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Input from "@/components/ui/input/Input.vue";
import useMealStore from "@/store";
import { debounce } from "lodash";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const ingredient = ref(route.query.ingredient || "");
const mealStore = useMealStore();
const meals = computed(() => mealStore.getMealsByIngredients);
function searchIngredient() {
  mealStore.searchByIngredients(ingredient.value);
  router.push({ query: { ingredient: ingredient.value } });
}

const debouncedSearch = debounce(searchIngredient, 500);
watch(
  () => route.query.ingredient,
  (newIngredient) => {
    ingredient.value = newIngredient;
    searchIngredient();
  }
);
onMounted(() => {
  if (route.query.ingredient) {
    searchIngredient();
  }
});
</script>
<style scoped></style>
