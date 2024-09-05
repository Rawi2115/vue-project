import { createStore } from "vuex";
import state from "./state";
import * as actions from "./actions";
import mutations from "./mutations";
const store = createStore({
  state,
  actions,
  mutations,
  //   getters,
});
export default store;
