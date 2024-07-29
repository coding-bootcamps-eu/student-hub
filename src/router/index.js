import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Guest from "../views/Guest.vue";
import Lobby from "../views/Lobby.vue";
import Schedule from "../views/Schedule.vue";
import Zoom from "../views/Zoom.vue";
import Slides from "../views/Slides.vue";
import Students from "../views/Students.vue";
import Admin from "../views/Admin.vue";
import store from "../store";

import { onAuthStateInit } from "../firebase";

const routes = [
  {
    path: "/",
    name: "Lobby",
    component: Lobby,
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
    path: "/recordings",
    name: "Recordings",
    component: () =>
      import(/* webpackChunkName: "recordings" */ "../views/Recordings.vue"),
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
    path: "/schedule",
    name: "Schedule",
    component: Schedule,
  },
  {
    path: "/zoom",
    name: "Zoom Rooms",
    component: Zoom,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      teacher: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  await onAuthStateInit();

  if (!to.meta.public) {
    if (!store.getters.isLoggedIn) {
      return "/login";
    }
    if (store.getters.isGuest) {
      return "/guest";
    }
  }

  if (to.meta.teacher && !store.getters.isTeacher) {
    return "/";
  }
});

export default router;
