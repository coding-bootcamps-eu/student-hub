import { createStore } from "vuex";
import firestore from "@/firestore";

import { doc, onSnapshot } from "firebase/firestore";

export default createStore({
  plugins: [],
  state: {
    currentUser: {},
    currentUserRole: "",
    currentUserName: "",
    currentUserID: "",
    currentUserToken: "",
    currentUserScreenname: "",
    currentUserEmail: "",
    currentUserGitURL: "",
  },
  mutations: {
    setCurrentUser(state, payload) {
      sessionStorage.setItem("currentUser", JSON.stringify(payload));
      state.currentUser = payload;
    },
    setCurrentUserRole(state, payload) {
      sessionStorage.setItem("currentUserRole", payload);
      state.currentUserRole = payload;
    },
    setCurrentUserScreenname(state, payload) {
      sessionStorage.setItem("currentUserScreenname", payload.userScreenname);
      state.currentUserScreenname = payload.userScreenname;
    },
    setCurrentUserEmail(state, payload) {
      sessionStorage.setItem("currentUserEmail", payload.mail);
      state.currentUserEmail = payload.mail;
    },
    setCurrentUserGitURL(state, payload) {
      sessionStorage.setItem("currentUserGitURL", payload.gitURL);
      state.currentUserGitURL = payload.gitURL;
    },
    setCurrentUserName(state, payload) {
      sessionStorage.setItem("currentUserName", payload.userName);
      state.currentUserName = payload.userName;
    },
    setCurrentUserID(state, payload) {
      sessionStorage.setItem("currentUserID", payload.userID);
      state.currentUserID = payload.userID;
    },
    setCurrentUserToken(state, payload) {
      sessionStorage.setItem("currentUserToken", payload.userToken);
      state.currentUserToken = payload.userToken;
    },
    setUserLoginState(state, payload) {
      sessionStorage.setItem("userLoginState", payload.isLoggedIn);
      state.userLoginState = payload.isLoggedIn;
    },
  },
  actions: {
    async setspUser(state, payload) {
      onSnapshot(doc(firestore, "all-users", payload), (doc) => {
        state.commit({
          type: "setspUser",
          user: doc.data(),
        });
      });
    },
  },
  modules: {},
  getters: {
    getCurrentUser(state) {
      return state.currentUser;
    },
    getCurrentUserRole(state) {
      return state.currentUserRole;
    },
    getCurrentUserName(state) {
      return state.currentUserName;
    },
    getCurrentUserScreenname(state) {
      return state.currentUserScreenname;
    },
    getCurrentUserEmail(state) {
      return state.currentUserEmail;
    },
    getCurrentUserGitURL(state) {
      return state.currentUserGitURL;
    },
    getCurrentUserID(state) {
      return state.currentUserID;
    },
    getCurrentUserToken(state) {
      return state.currentUserToken;
    },
    getUserLoginState(state) {
      return state.userLoginState;
    },
  },
});
