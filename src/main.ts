import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import auth from "@/auth";
import vbclass from "vue-body-class";
Vue.use(auth);
Vue.use( vbclass, router );
Vue.config.productionTip = false;
// Vue.prototype.$auth = auth;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
