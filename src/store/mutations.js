export default {
  setSearchedMeals(state, meals) {
    state.searchedMeals = meals;
  },
  saveMeal(state, meal) {
    state.savedMeals.push(meal);
    localStorage.setItem("savedMeals", JSON.stringify(state.savedMeals));
  },
  initalizeSavedMeals(state) {
    const savedMeals = localStorage.getItem("savedMeals");
    if (savedMeals) {
      state.savedMeals = JSON.parse(savedMeals);
    } else {
      state.savedMeals = [];
    }
  },

  removeSavedMeal(state, id) {
    state.savedMeals = state.savedMeals.filter((m) => m.id !== id);
    localStorage.setItem("savedMeals", JSON.stringify(state.savedMeals));
  },
  setMealsByLetters(state, meals) {
    state.mealsByLetters = meals;
  },
  setMealsByIngredients(state, meals) {
    state.searchedMealsByIngredients = meals;
  },
};
