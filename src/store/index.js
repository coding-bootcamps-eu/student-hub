import { createStore } from "vuex";
import { loadUserRole } from "../firestore";
import router from "../router";

export default createStore({
  plugins: [],
  state: {
    // User object returned
    // by OAuth2/firebase authentication
    user: null,
    // User role (teacher, student, undefined)
    role: null,
    // Is the user logged in
    isLoggedIn: false,
    timerInterval: undefined,
    timeLeft: 0,
    timerType: undefined,
  },
  mutations: {
    setUser(state, user) {
      if (user) {
        state.user = user;
        state.isLoggedIn = true;
      } else {
        state.user = null;
        state.role = null;
        state.isLoggedIn = false;
      }
    },
    setRole(state, role) {
      state.role = role;
    },
    setTimer(state, { interval, type }) {
      state.timerInterval = interval;
      state.timerType = type;
    },
    setTimeLeft(state, timeLeft) {
      state.timeLeft = timeLeft;
    },
    stopTimer(state) {
      state.timerInterval = undefined;
      state.timeLeft = 0;
    },
  },
  actions: {
    async login(context, user) {
      context.commit("setUser", user);

      const role = await loadUserRole(user);
      context.commit("setRole", role);

      if (["Login", "Logout"].includes(router.currentRoute.value.name)) {
        router.push("/");
      }
    },
    logout(context) {
      context.commit("setUser", null);
      router.push("/logout");
    },
  },
  modules: {},
  getters: {
    isGuest: (state) => state.role === null || state.role === "guest",
    isStudent: (state) => state.role === "student",
    isTeacher: (state) => state.role === "teacher",
    hasPermissions: (state) => state.role !== null,
    isLoggedIn: (state) => state.isLoggedIn,
    userName: (state) =>
      state.user ? state.user.displayName : "Captain Anonymous",
    hasTimer: (state) => !!state.timerInterval,
    timer: (state) => {
      const secondsLeft = state.timeLeft;
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      return `00:${formatTimer(minutes)}:${formatTimer(seconds)}`;
    },
  },
});

// TODO: Refactor
function formatTimer(num) {
  return num < 10 ? `0${num}` : num;
}
