import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import MealList from "../views/MealList.vue";
import SearchIngredients from "../views/SearchIngredients.vue";
import SearchMeals from "../views/SearchMeals.vue";
import SearchLetters from "../views/SearchLetters.vue";
import MealPage from "../views/MealPage.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Ingredientsearch/:ingredient?",
    name: "byIngredient",
    component: SearchIngredients,
  },
  {
    path: "/Namesearch/:name?",
    name: "byName",
    component: SearchMeals,
  },
  {
    path: "/Lettersearch/:letter?",
    name: "byLetter",
    component: SearchLetters,
  },
  {
    path: "/meal/:id",
    name: "meal",
    component: MealPage,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
