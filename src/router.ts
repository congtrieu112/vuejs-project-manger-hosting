import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Clients from "./views/Clients.vue";
import Callback from './views/Callback.vue'
import auth from "@/auth";
Vue.use(auth);
Vue.use(Router);
const router =  new Router({
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
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback
    }
  ]
  
});

// very basic "setup" of a global guard
router.beforeEach((to, from, next) => {
  if(to.name === 'callback') { // check if "to"-route is "callback" and allow access
    next()
  } else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
    next()
  } else { // trigger auth0 login
    router.app.$auth.login()
  }
})

export default router

