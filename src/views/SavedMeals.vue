<template>
  <div class="container mx-auto px-4 py-8" v-if="savedMeals?.length === 0">
    <h1 class="text-3xl font-semibold mb-4">No meals saved yet.</h1>
  </div>
  <div v-else class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-semibold mb-4">Saved Meals</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="meal in savedMeals"
        :key="meal.id"
        class="bg-white rounded shadow-md overflow-hidden flex flex-col gap-2"
      >
        <router-link
          :to="{ name: 'meal', params: { id: meal.id } }"
          class="overflow-hidden"
        >
          <img
            :src="meal.image"
            :alt="meal.name"
            class="w-full h-64 object-cover hover:scale-125 transition-transform ease-in-out duration-700"
          />
        </router-link>
        <div class="p-4 flex flex-col gap-2 items-start">
          <h2 class="text-xl font-semibold">{{ meal.name }}</h2>
          <Button
            class="flex gap-2 items-center"
            variant="destructive"
            @click="removeMeal(meal.id)"
          >
            Remove Meal <Trash :size="18" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/ui/button/Button.vue";
import store from "@/store";
import { Trash } from "lucide-vue-next";
import { computed, onMounted } from "vue";

const savedMeals = computed(() => store.getters.savedMeals);

function removeMeal(id) {
  store.dispatch("removeSavedMeal", id);
}
</script>

<style scoped></style>
