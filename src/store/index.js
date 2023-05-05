import { createStore } from "vuex";

export default createStore({
  state: {
    user: "",
    search:'',
    // user:{userPhone:"13762927951"},
  },
  mutations: {
    setUser(state, v) {
      console.log("登录", v);
      state.user = JSON.parse(JSON.stringify(v));
    },
    setSerach(state,v){
      state.search = v;

    }
  },
  getters: {},
  actions: {},
  modules: {},
});
