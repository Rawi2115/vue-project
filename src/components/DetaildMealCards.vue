<template>
  <div class="flex justify-center items-center w-full py-6">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[90%] lg:w-3/4"
    >
      <div
        v-for="meal in data"
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
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped></style>
