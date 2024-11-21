<template>
  <button v-if="store.isLoggedIn" @click="logout">Logout</button>

  <button v-if="store.isLoggedIn" @click="login">Mit GitHub anmelden</button>
</template>

<script>
import {
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  getAuth,
} from "firebase/auth";
import { useAppStore } from "@/stores/app";

export default {
  data() {
    return {
      store: useAppStore(),
    };
  },

  methods: {
    async login() {
      const provider = new GithubAuthProvider();
      provider.addScope("public_repo");
      signInWithPopup(getAuth(), provider);
    },

    logout() {
      signOut(getAuth())
        .then(() => {})
        .catch((error) => {
          console.error("Error while signOut: ", error);
        });
    },
  },
};
</script>
