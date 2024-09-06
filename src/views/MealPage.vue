<template>
  <div class="container mx-auto p-4 lg:w-1/2">
    <div class="bg-white rounded shadow-md overflow-hidden flex flex-col gap-2">
      <Skeleton v-if="loading" class="w-full h-80 object-cover" />
      <img
        v-else
        v-if="meal"
        :src="meal.strMealThumb"
        :alt="meal.strMeal"
        class="w-full h-80 object-cover"
      />
      <div class="flex flex-col gap-2 p-4 items-start">
        <Skeleton v-if="loading" class="lg:text-xl text-md font-bold" />
        <h2 v-else class="lg:text-xl text-md font-bold">
          Name: {{ meal?.strMeal }}
        </h2>
        <Skeleton v-if="loading" />
        <p v-else>Type: {{ meal?.strCategory }}</p>
        <Skeleton v-if="loading" />

        <p v-else>Origin: {{ meal?.strArea }}</p>
        <Skeleton v-if="loading" />
        <a class="underline" :href="meal?.strYoutube" target="_blank"
          >Check on Youtube</a
        >
        <Button
          class="flex gap-2 items-center"
          variant="outline"
          @click="saveMeal"
        >
          Save Meal <Pin :size="18" />
        </Button>
        <h3 class="text-lg font-bold">Ingredients</h3>
        <Skeleton
          v-if="loading"
          class="w-full border-collapse border border-gray-300 mt-4"
        />
        <table
          v-else
          class="w-full border-collapse border border-gray-300 mt-4"
        >
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
import { Button } from "@/components/ui/button";
import axiosClient from "../axiosClient";
import { Pin } from "lucide-vue-next";
import Skeleton from "@/components/ui/skeleton/Skeleton.vue";
import useMealStore from "@/store";
const route = useRoute();
const meal = ref(null);
const loading = ref(true);
const mealStore = useMealStore();
onMounted(async () => {
  try {
    const response = await axiosClient.get(`/lookup.php?i=${route.params.id}`);

    meal.value = response.data.meals[0];
  } catch (error) {
    console.error("Error fetching meal data:", error);
  } finally {
    loading.value = false;
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
function saveMeal() {
  mealStore.saveMeal({
    id: meal.value.idMeal,
    name: meal.value.strMeal,
    image: meal.value.strMealThumb,
  });
}
</script>

<style scoped></style>
