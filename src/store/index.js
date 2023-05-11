import { createStore } from "vuex";

export default createStore({
  state: {
    user:JSON.parse(sessionStorage.getItem("user")) || "",
    search:'',
    // user:{userPhone:"13762927951"},
  },
  mutations: {
    setUser(state, v) {
      console.log("登录", v);
      sessionStorage.setItem('miscellaneous', JSON.stringify(v));
      state.user = v;
    },
    setSerach(state,v){
      state.search = v;

    }
  },
  getters: {},
  actions: {},
  modules: {},
});
