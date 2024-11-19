import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Guest from "../views/Guest.vue";
import Lobby from "../views/Lobby.vue";
import Schedule from "../views/Schedule.vue";
import Zoom from "../views/Zoom.vue";
import Admin from "../views/Admin.vue";
import { useAppStore } from "@/stores/app.js";

import { onAuthStateInit } from "../firebase";

const routes = [
  {
    path: "/",
    name: "Lobby",
    component: Lobby,
    meta: {
      public: false,
      title: "Lobby",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      public: true,
      title: "Anmelden",
    },
  },
  {
    path: "/guest",
    name: "Guest",
    component: Guest,
    meta: {
      public: true,
      title: "Du bist Gast",
    },
  },
  {
    path: "/logout",
    name: "Logout",
    meta: {
      public: true,
      title: "Ausloggen",
    },
    component: () => import("@/views/Logout.vue"),
  },
  {
    path: "/recordings",
    name: "Recordings",
    meta: {
      title: "Aufzeichnungen",
    },
    component: () => import("@/views/Recordings.vue"),
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: Schedule,
    meta: {
      title: "Kursaufbau",
    },
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
  const appStore = useAppStore();

  await onAuthStateInit();

  if (!to.meta.public) {
    if (!appStore.isLoggedIn) {
      return "/login";
    }
    if (appStore.isGuest) {
      return "/guest";
    }
  }

  if (to.meta.teacher && !appStore.isTeacher) {
    return "/";
  }
});

export default router;
