import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Timer from "../views/Timer.vue";
import Slides from "../views/Slides.vue";
import Students from "../views/Students.vue";

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
    path: "/login",
    name: "Login",
    component: Home,
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
  {
    path: "/timer",
    name: "Timer",
    component: Timer,
  },
  {
    path: "/students",
    name: "Students",
    component: Students,
  },
  {
    path: "/slides",
    name: "Slides",
    component: Slides,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
