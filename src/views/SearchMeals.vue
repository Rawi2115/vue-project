<template>
  <div class="px-12 py-8">
    <input
      type="text"
      v-model="keyWord"
      class="rounded border-2 w-full"
      placeholder="Search for meals"
      @input="() => searchMeals()"
    />
  </div>
  <div class="flex justify-center items-center w-full py-6">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[90%] lg:w-3/4"
    >
      <div
        v-for="meal in searchData"
        :key="meal.idMeal"
        class="bg-white rounded shadow-md overflow-hidden flex flex-col gap-2"
      >
        <router-link
          :to="{ name: 'meal', params: { id: meal.idMeal } }"
          class="overflow-hidden cursor-pointer"
        >
          <img
            :src="meal.strMealThumb"
            :alt="meal.strMeal"
            class="w-full h-64 object-cover hover:scale-125 transition-transform ease-in-out duration-700"
          />
        </router-link>
        <div class="flex flex-col gap-2 p-4 items-start">
          <h2 class="lg:text-xl text-md font-bold">Name: {{ meal.strMeal }}</h2>
          <p>Type: {{ meal.strCategory }}</p>
          <p>Origin: {{ meal.strArea }}</p>
          <a class="underline" :href="meal.strYoutube" target="_blank"
            >Check on Youtube</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { computed } from "@vue/reactivity";
import axiosClient from "../axiosClient";
import store from "../store";
import { useRoute } from "vue-router";
const keyWord = ref("");
const searchData = computed(() => store.state.searchedMeals);
function searchMeals() {
  store.dispatch("searchMeals", keyWord.value);
}
const route = useRoute();

onMounted(() => {
  keyWord.value = route.params.name;
  searchMeals();
});
</script>
<style scoped></style>
