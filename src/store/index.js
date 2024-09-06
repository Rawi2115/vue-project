import { createStore } from "vuex";
import state from "./state";
import * as actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
const store = createStore({
  state,
  actions,
  mutations,
  getters,
});
store.commit("initalizeSavedMeals");
export default store;
