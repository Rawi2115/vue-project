import axiosClient from "../axiosClient";

export function searchMeals({ commit }, keyword) {
  axiosClient.get(`/search.php?s=${keyword}`).then((response) => {
    commit("setSearchedMeals", response.data.meals);
  });
}
export function saveMeal({ commit }, meal) {
  commit("saveMeal", meal);
}

export function removeSavedMeal({ commit }, id) {
  commit("removeSavedMeal", id);
}

export function searchLetter({ commit }, letter) {
  axiosClient.get(`/search.php?f=${letter}`).then((response) => {
    commit("setMealsByLetters", response.data.meals);
  });
}

export function searchByIngredients({ commit }, ingredient) {
  axiosClient.get(`/filter.php?i=${ingredient}`).then((response) => {
    commit("setMealsByIngredients", response.data.meals);
  });
}
