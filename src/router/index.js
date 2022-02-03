import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/logout",
    name: "Logout",
    component: () =>
      import(/* webpackChunkName: "loggedout" */ "../views/Logout.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/recordings",
    name: "Recordings",
    component: () =>
      import(/* webpackChunkName: "recordings" */ "../views/Recordings.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
