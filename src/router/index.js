import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../views/Home.vue");
const MealList = () => import("../views/MealList.vue");
const SearchIngredients = () => import("../views/SearchIngredients.vue");
const SearchMeals = () => import("../views/SearchMeals.vue");
const SearchLetters = () => import("../views/SearchLetters.vue");
const MealPage = () => import("../views/MealPage.vue");
const SavedMeals = () => import("../views/SavedMeals.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Ingredientsearch",
    name: "byIngredient",
    component: SearchIngredients,
  },
  {
    path: "/Namesearch",
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
  {
    path: "/saved",
    name: "saved",
    component: SavedMeals,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
