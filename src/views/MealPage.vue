<template>
  <div class="container mx-auto p-4 lg:w-1/2">
    <div class="bg-white rounded shadow-md overflow-hidden flex flex-col gap-2">
      <img
        v-if="meal"
        :src="meal.strMealThumb"
        :alt="meal.strMeal"
        class="w-full h-80 object-cover"
      />
      <div class="flex flex-col gap-2 p-4 items-start">
        <h2 class="lg:text-xl text-md font-bold">Name: {{ meal?.strMeal }}</h2>
        <p>Type: {{ meal?.strCategory }}</p>
        <p>Origin: {{ meal?.strArea }}</p>
        <a class="underline" :href="meal?.strYoutube" target="_blank"
          >Check on Youtube</a
        >
        <button>Save meal</button>
        <h3 class="text-lg font-bold">Ingredients</h3>

        <table class="w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr>
              <th class="border border-gray-300 px-4 py-2">Ingredient</th>
              <th class="border border-gray-300 px-4 py-2">Measure</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ingredient in ingredients" :key="ingredient.ingredient">
              <td class="border border-gray-300 px-4 py-2">
                {{ ingredient.ingredient }}
              </td>
              <td class="border border-gray-300 px-4 py-2">
                {{ ingredient.measure }}
              </td>
            </tr>
          </tbody>
        </table>
        <h3 class="text-lg font-bold">Instructions</h3>
        <p v-html="formattedInstructions"></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref, computed } from "vue";
import axiosClient from "../axiosClient";

const route = useRoute();
const meal = ref(null);

onMounted(async () => {
  try {
    const response = await axiosClient.get(`/lookup.php?i=${route.params.id}`);
    meal.value = response.data.meals[0];
  } catch (error) {
    console.error("Error fetching meal data:", error);
  }
});

const ingredients = computed(() => {
  if (!meal.value) return [];
  return ingredientsList(meal.value);
});

const formattedInstructions = computed(() => {
  if (!meal.value) return "";
  return formatInstructions(meal.value.strInstructions || "");
});

function ingredientsList(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient,
        measure: measure ? measure.trim() : "",
      });
    }
  }
  return ingredients;
}

function formatInstructions(instructions) {
  return instructions.replace(/\r\n/g, "<br>");
}
</script>

<style scoped></style>
