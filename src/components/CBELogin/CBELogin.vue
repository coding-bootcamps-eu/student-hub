<template>
  <button v-if="store.isLoggedIn" @click="logout" class="button">Logout</button>

  <button v-if="!store.isLoggedIn" @click="login" class="button">
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
import { useAppStore } from "@/stores/app.js";

export default {
  name: "CBELogin",

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

<style lang="css" scoped>
.button {
  cursor: pointer;
  font-size: 1.25rem;
  background-color: var(--clr-white);
  color: var(--clr-accent);

  padding: 0.25em 0.75em;
  border: none;
  border-radius: var(--radius-inner);
  width: max-content;
}

.button:hover {
  background-color: #262626;
  color: white;
}
</style>
