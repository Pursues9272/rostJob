import { createStore } from "vuex";

export default createStore({
  state: {
    user:'',
    // user:{userPhone:"13762927951"},
  },
  mutations: {
    setUser(state,v){
      console.log("登录",v);
      state.user = JSON.parse(JSON.stringify(v));
    }
  },
  getters: {},
  actions: {},
  modules: {},
});
