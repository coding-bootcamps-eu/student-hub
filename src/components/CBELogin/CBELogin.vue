<template>
  <button
    v-if="this.$store.state.isLoggedIn"
    @click="logout"
    class="btn-git-logout"
  >
    Logout
  </button>

  <button
    v-if="!this.$store.state.isLoggedIn"
    @click="login"
    class="btn-git-login"
  >
    Login with GitHub
  </button>
</template>

<script>
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export default {
  name: "CBELogin",
  methods: {
    async login() {
      const auth = getAuth();
      const provider = new GithubAuthProvider();
      provider.addScope("public_repo");

      signInWithPopup(auth, provider).then((result) => {
        this.$store.dispatch("login", result.user);
      });
    },
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$router.push("/logout");
          this.$store.dispatch("logout");
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    },
  },
};
</script>

<style lang="css" scoped></style>
