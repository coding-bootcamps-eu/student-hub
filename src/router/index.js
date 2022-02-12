import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Guest from "../views/Guest.vue";
import Home from "../views/Home.vue";
import Timer from "../views/Timer.vue";
import Slides from "../views/Slides.vue";
import Students from "../views/Students.vue";
import Admin from "../views/Admin.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      public: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      public: true,
    },
  },
  {
    path: "/guest",
    name: "Guest",
    component: Guest,
    meta: {
      public: true,
    },
  },
  {
    path: "/logout",
    name: "Logout",
    meta: {
      public: true,
    },
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
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  // canUserAccess() returns `true` or `false`

  if (!to.meta.public) {
    const isGuestOnly = store.getters.isGuest;
    if (isGuestOnly) {
      return "/guest";
    }
  }

  // if (isGuestOnly) return "/guest";
});

export default router;
