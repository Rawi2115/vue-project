<template>
  <div class="px-12 py-8">
    <Input
      type="text"
      v-model="keyWord"
      placeholder="Search for meals"
      class="lg:w-[79%] lg:my-0 lg:mx-auto"
      @input="debouncedSearchMeals"
    />
  </div>
  <div
    v-if="!searchData || searchData.length === 0"
    class="container mx-auto px-4 py-8"
  >
    <h1 class="text-3xl font-semibold mb-4">No searched meals yet</h1>
  </div>
  <DetaildMealCards v-else :data="searchData" />
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { computed } from "@vue/reactivity";
import { debounce } from "lodash";
import { useRoute, useRouter } from "vue-router";
import Input from "@/components/ui/input/Input.vue";
import DetaildMealCards from "@/components/DetaildMealCards.vue";
import useMealStore from "../store";
const route = useRoute();
const router = useRouter();
const keyWord = ref(route.query.name || "");
const mealStore = useMealStore();
const searchData = computed(() => mealStore.getSearchedMeals);

function searchMeals() {
  mealStore.searchMeals(keyWord.value);
  router.push({ query: { name: keyWord.value } });
}

const debouncedSearchMeals = debounce(searchMeals, 500);
watch(
  () => route.query.name,
  (newName) => {
    keyWord.value = newName;
    searchMeals();
  }
);
onMounted(() => {
  if (route.query.name) {
    searchMeals();
  }
});
</script>

<style scoped></style>
