<template>
  <button v-if="store.isLoggedIn" @click="logout">Logout</button>

  <button v-if="!store.isLoggedIn" @click="login"
    class="bg-violet-900 text-white py-2 px-6 rounded flex gap-4 items-center my-8">
    <GitHubIcon color="white" class="w-8" />
    Mit
    GitHub
    anmelden
  </button>
</template>

<script>
import {
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  getAuth,
} from "firebase/auth";
import { useAppStore } from "@/stores/app";
import GitHubIcon from "@/components/icons/GitHubIcon.vue"

export default {
  components: {
    GitHubIcon
  },

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
        .then(() => { })
        .catch((error) => {
          console.error("Error while signOut: ", error);
        });
    },
  },
};
</script>
