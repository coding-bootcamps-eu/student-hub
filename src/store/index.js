import { createStore } from "vuex";
import { loadUserDetails } from "../firebase";
import router from "../router";
import {
  bootcampDays,
  calculateWorkingDaysSinceCampStart,
} from "../schedule/schedule";

export default createStore({
  plugins: [],
  state: {
    user: null, // User object returned by OAuth2/firebase authentication
    role: null, // User role (teacher, student, null)
    className: null,
    startDate: null,
    fulltime: null,
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
    setUserDetails(state, userDetails) {
      if (userDetails !== null || userDetails !== undefined) {
        state.role = userDetails.role;
        state.className = userDetails.className;
        state.startDate = userDetails.startDate;
        state.fulltime = userDetails.fulltime;
      } else {
        state.role = null;
        state.className = null;
        state.startDate = null;
        state.fulltime = null;
      }
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

      const userDetails = await loadUserDetails(user);
      if (userDetails !== undefined) {
        context.commit("setUserDetails", userDetails);
      } else {
        context.commit("setUserDetails", null);
      }

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
    canShowDailyGoal: (state, getters) => {
      if (!getters.isStudent) {
        return false;
      }

      let daysInCamp = bootcampDays + 1;
      if (state.startDate) {
        daysInCamp = calculateWorkingDaysSinceCampStart(
          new Date(state.startDate.seconds * 1000),
          new Date()
        );
      }

      return (
        getters.isStudent &&
        state.startDate &&
        state.fulltime === true &&
        daysInCamp <= bootcampDays
      );
    },
    canShowSchedule: (state, getters) => {
      if (getters.isTeacher) {
        return true;
      }

      return getters.canShowDailyGoal;
    },
  },
});

// TODO: Refactor
function formatTimer(num) {
  return num < 10 ? `0${num}` : num;
}
