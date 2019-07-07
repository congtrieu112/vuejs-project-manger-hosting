import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import AuthService from "./auth";

Vue.config.productionTip = false;
Vue.prototype.$auth = new AuthService();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
