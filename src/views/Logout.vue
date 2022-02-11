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
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.$store.dispatch("logout");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  },
};
</script>
