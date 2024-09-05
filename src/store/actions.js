import axiosClient from "../axiosClient";

export function searchMeals({ commit }, keyword) {
  axiosClient.get(`/search.php?s=${keyword}`).then((response) => {
    commit("setSearchedMeals", response.data.meals);
  });
}
