import Vue from "vue";
import Router from "vue-router";

import AuthRoutes from './auth/main.js'
import expensesRoutes from './expenses/main.js'
import cardRoutes from './card/main.js'
Vue.use(Router);



let router = new Router({
  mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      name: 'Panel',
      path: '/home',
      meta: {
        requiredAuth: true,
        index: 1
      },
      component: () =>
        import(/* webpackChunkName: "inventory" */ "@/views/Panel.vue"),
    },

    {
      name: 'Home',
      path: '/',
      component: () =>
        import(/* webpackChunkName: "inventory" */ "@/views/Home.vue"),
    },
    ...expensesRoutes,
    ...AuthRoutes,
    ...cardRoutes,

  ]
});



router.beforeEach((to, from, next) => {
  window.stop()
  const token = localStorage.getItem("jwt");
  const expiryDate = localStorage.getItem("sessionExpiryDate");
  if (to.matched.some(record => record.meta.requiredAuth)) {
    const oneday = 60 * 60 * 24 * 1000
    console.log('reqired');

    if (token == null || token === undefined || new Date(expiryDate) < oneday) {
      next({
        name: 'auth',
      });
    } else {
      next();
    }
  } else {
    return next();
  }
});

export default router;
