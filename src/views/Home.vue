<template>
  <div class="flex flex-col justify-center p-8">
    <div class="flex flex-wrap gap-2 lg:gap-8 justify-center mt-2">
      <router-link
        :to="{ name: 'byLetter', params: { letter } }"
        v-for="letter in letters.split('')"
        :key="letter"
      >
        {{ letter }}
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted } from "vue";
import store from "../store";
import axiosClient from "../axiosClient";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
onMounted(async () => {
  const response = await axiosClient.get("/list.php?i=list");
  console.log(response.data);
});
</script>
<style scoped></style>
