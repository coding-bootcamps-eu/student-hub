<template>
  <button v-if="this.$store.state.isLoggedIn" @click="logout">Logout</button>

  <button v-if="!this.$store.state.isLoggedIn" @click="login">
    Mit GitHub anmelden
  </button>
</template>

<script>
import {
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  getAuth,
} from "firebase/auth";

export default {
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
