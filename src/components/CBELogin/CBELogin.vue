<template>
  <button v-if="this.$store.state.isLoggedIn" @click="logout" class="button">
    Logout
  </button>

  <button v-if="!this.$store.state.isLoggedIn" @click="login" class="button">
    Login with GitHub
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
  name: "CBELogin",
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

<style lang="css" scoped>
.button {
  cursor: pointer;
  padding: 0.3rem 2.5rem;
  background: #f2f2f2;
  border: 1.75px solid #262626;
  box-sizing: border-box;
  border-radius: 0.3rem;
  font-weight: 600;
}

.button:hover {
  background-color: #262626;
  color: white;
}
</style>
