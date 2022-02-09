<template>
  <section>Du bist jetzt ausgeloggt.</section>
  <section>
    <CBELogin></CBELogin>
  </section>
</template>

<script>
import CBELogin from "@/components/CBELogin/CBELogin.vue";

import { getAuth, signOut } from "firebase/auth";

export default {
  name: "LoggedOut",
  components: {
    CBELogin,
  },
  beforeMount() {
    // if (this.$store.state.isLoggedIn) {
    //   this.$router.push("/");
    // }

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
  computed: {
    loggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  watch: {
    loggedIn() {
      if (this.$store.state.isLoggedIn) {
        this.$router.push("/");
      }
    },
  },
};
</script>
