import { defineStore } from "pinia";

import {
  createUserDocument,
  doesUserRecordExist,
  loadUserDetails,
} from "../firebase";
import router from "../router";

export const useAppStore = defineStore("app", {
  state() {
    return {
      user: null, // user object
      role: null, // User role (teacher, student, null)
      className: null,
      startDate: null,
      fulltime: null,
      isLoggedIn: false,
      links: [
        {
          title: "Lobby",
          to: "/",
          icon: "Home",
        },
        {
          title: "Sessions",
          to: "/recordings",
          icon: "Play",
        },
        {
          title: "Module",
          to: "/schedule",
          icon: "Calendar",
        },
        {
          title: "Abmelden",
          to: "https://form.asana.com/?k=msqPDRYEAxA8uspT_xcYbw&d=1181024715195521",
          icon: "Hospital",
        },
      ],
    };
  },

  getters: {
    accessToken() {
      if (this.user) {
        return this.user.auth.currentUser.accessToken;
      }
      return "";
    },
    isGuest() {
      return (
        this.role === null || this.role === undefined || this.role === "guest"
      );
    },

    isStudent() {
      return this.role === "student";
    },
    isPartTimeStudent() {
      return this.role === "student" && this.fulltime === false;
    },
    isFullTimeStudent() {
      return this.role === "student" && this.fulltime === true;
    },
    isTeacher() {
      return this.role === "teacher";
    },
    hasPermissions() {
      this.role !== null && this.role !== undefined;
    },
    userName() {
      return this.user ? this.user.displayName : "Captain Anonymous";
    },
    currentClassName() {
      return this.className;
    },
  },

  actions: {
    async login(user) {
      const uid = user.uid;
      if (user) {
        this.user = user;
        this.isLoggedIn = true;
      } else {
        this.user = null;
        this.role = null;
        this.isLoggedIn = false;
      }

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
        this.role = userDetails.role;
        this.className = userDetails.className;
        this.fulltime = userDetails.fulltime;
        this.githubProfileUrl = userDetails.githubProfileUrl;
        this.email = userDetails.email;
      } else {
        this.role = null;
        this.className = null;
        this.startDate = null;
        this.fulltime = null;
      }

      if (["Login", "Logout"].includes(router.currentRoute.value.name)) {
        router.push("/");
      }
    },

    logout() {
      this.user = null;
      this.role = null;
      this.isLoggedIn = false;
      router.push("/logout");
    },
  },
});
