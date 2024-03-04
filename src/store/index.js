import { createStore } from "vuex";
import {
  createUserDocument,
  doesUserRecordExist,
  loadUserDetails,
} from "../firebase";
import router from "../router";

export default createStore({
  plugins: [],
  state: {
    user: null, // user object
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
        state.fulltime = userDetails.fulltime;
        state.githubProfileUrl = userDetails.githubProfileUrl;
        state.email = userDetails.email;
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
      const uid = user.uid;
      context.commit("setUser", user);

      // ----------------------------------------------------------------------
      // Create user doc if it does not exist
      const userExists = await doesUserRecordExist(uid);
      if (userExists === false) {
        const screenName = user.reloadUserInfo.screenName;

        const userDetails = {
          uid: user.uid,
          githubName: user.displayName,
          githubScreenName: screenName,
          githubProfileUrl: "https://github.com/" + screenName,
          email: user.email,
          // TODO: Use constant for roles
          role: "guest",
        };

        await createUserDocument(uid, userDetails);
      }

      // ----------------------------------------------------------------------
      // Load user doc
      const userDetails = await loadUserDetails(user);
      if (userDetails !== undefined && userDetails !== null) {
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
    accessToken: (state) => {
      if (state.user) {
        return state.user.auth.currentUser.accessToken;
      }
      return "";
    },
    isGuest: (state) =>
      state.role === null || state.role === undefined || state.role === "guest",
    isStudent: (state) => state.role === "student",
    isPartTimeStudent: (state) =>
      state.role === "student" && state.fulltime === false,
    isFullTimeStudent: (state) =>
      state.role === "student" && state.fulltime === true,
    isTeacher: (state) => state.role === "teacher",
    hasPermissions: (state) => state.role !== null && state.role !== undefined,
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
