<template>
  <section>
    <header>
      <h2>LOGOUT</h2>
      <p>Du hast dich erfolgreich ausgeloggt</p>
    </header>
    <LoginForm />
    <p>Wenn du möchtest, kannst du dich jederzeit wieder einloggen.</p>
  </section>
</template>

<script>
import LoginForm from "@/components/Login/LoginForm.vue";

import { getAuth, signOut } from "firebase/auth";
import { useAppStore } from "@/stores/app.js";

export default {
  components: {
    LoginForm,
  },

  beforeMount() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        useAppStore().logout();
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  },
};
</script>
