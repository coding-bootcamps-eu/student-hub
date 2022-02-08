import { createStore } from "vuex";
import firestore from "@/firestore";
import { getDoc, doc } from "firebase/firestore";

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
  },
  mutations: {
    setUser(state, user) {
      if (user) {
        state.user = user;
        state.isLoggedIn = true;
      } else {
        state.user = null;
        state.isLoggedIn = false;
      }
    },
    setRole(state, role) {
      state.role = role;
    },
  },
  actions: {
    async login(context, user) {
      // Read user role from all-users collection
      const docRef = doc(firestore, "all-users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let role = docSnap.data().role;
        if (role === undefined) {
          role = null;
        }
        context.commit("setRole", role);
      }
      context.commit("setUser", user);
    },
    logout(context) {
      context.commit("setUser", null);
    },
  },
  modules: {},
  getters: {
    isGuest: (state) => state.role === null,
    isStudent: (state) => state.role === "student",
    isTeacher: (state) => state.role === "teacher",
    hasPermissions: (state) => state.role !== null,
  },
});
