import Vue from "vue";
import Vuex from 'vuex';
import App from "./App.vue";
import { createRouter } from "./router";
import { createStore } from "./vuex/store";
import { sync } from "vuex-router-sync";
// 创建 router 和 store 实例
Vue.use(Vuex);
const router = createRouter();
const store = createStore();
// 同步路由状态(route state)到 store
sync(store, router);
// 创建应用程序实例，将 router 和 store 注入
const app = new Vue({
  router,
  store,
  el: "#app",
  render: h => h(App)
});
