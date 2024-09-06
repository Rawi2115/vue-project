import { defineStore } from "pinia";
import axiosClient from "@/axiosClient";

const useMealStore = defineStore("mealStore", {
  state: () => ({
    searchedMeals: [],
    savedMeals: [],
    mealsByLetters: [],
    searchedMealsByIngredients: [],
  }),
  actions: {
    searchMeals(keyword) {
      axiosClient.get(`/search.php?s=${keyword}`).then((response) => {
        this.searchedMeals = response.data.meals; // Fix: `searchedMeals` instead of `searchMeals`
      });
    },
    saveMeal(meal) {
      this.savedMeals.push(meal);
      localStorage.setItem("savedMeals", JSON.stringify(this.savedMeals));
    },
    removeMeal(id) {
      this.savedMeals = this.savedMeals.filter((m) => m.id !== id); // Fix: Use `savedMeals` here
      localStorage.setItem("savedMeals", JSON.stringify(this.savedMeals));
    },
    searchLetter(letter) {
      axiosClient.get(`/search.php?f=${letter}`).then((response) => {
        this.mealsByLetters = response.data.meals;
      });
    },
    searchByIngredients(ingredient) {
      axiosClient.get(`/filter.php?i=${ingredient}`).then((response) => {
        this.searchedMealsByIngredients = response.data.meals;
      });
    },
    initializeSavedMeals() {
      const savedMeals = localStorage.getItem("savedMeals");
      if (savedMeals) {
        this.savedMeals = JSON.parse(savedMeals);
      } else {
        this.savedMeals = [];
      }
    },
  },
  getters: {
    getSearchedMeals: (state) => state.searchedMeals,
    getSavedMeals: (state) => state.savedMeals,
    getMealsByLetters: (state) => state.mealsByLetters,
    getMealsByIngredients: (state) => state.searchedMealsByIngredients,
  },
});

export default useMealStore;
