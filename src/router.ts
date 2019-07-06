/* eslint-disable */ 
import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Clients from "./views/Clients.vue";
import Callback from "./views/Callback.vue";
import Login from "./views/Login.vue";
import CreateClient from "./views/CreateClient";
// import auth from "@/auth";
// Vue.use(auth);
Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!router.app.$auth.isAuthenticated()) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (router.app.$auth.isAuthenticated()) {
    console.log("from",from)
    next()
    return
  }
  next('/login')
}

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
      component: Clients,
      beforeEnter: ifAuthenticated,
    },
    {
      path: "/create-client",
      name: "createClient",
      component: CreateClient,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      // meta: { bodyClass: 'hold-transition login-page' },
      beforeEnter: ifNotAuthenticated,
    }
  ]
  
});

// very basic "setup" of a global guard
// router.beforeEach((to, from, next) => {
//   if(to.name === 'callback') { // check if "to"-route is "callback" and allow access
//     next()
//     // eslint-disable-next-line
//   } else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
//     next()
//   } else { // trigger auth0 login
//     // eslint-disable-next-line
//     router.app.$auth.login()
//   }
// })

export default router

