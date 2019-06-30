import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Clients from "./views/Clients.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      redirect: "/clients"
    },
    {
      path: "/clients",
      name: "clients",
      component: Clients
    }
  ]
});
