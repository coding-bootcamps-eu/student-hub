<template>
  <section>
    <header class="page-heading">
      <h2 class="page-heading__title">LOGOUT</h2>
      <p class="page-heading__subtitle">You're now logged out</p>
    </header>
    <div class="logout">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="bi bi-github logout__image"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
        />
      </svg>
      <CBELogin></CBELogin>
      <p class="logout__hint">
        <small> You can log in again again if you want. </small>
      </p>
    </div>
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

<style lang="css">
.page-heading {
  margin-bottom: 3rem;
}

.page-heading__title {
  margin-bottom: 0;
  color: #262626;
}

.page-heading__subtitle {
  margin: 0;
  color: #999999;
}

.logout {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.logout > * + * {
  margin-top: 1rem;
}

.logout__image {
  width: 2rem;
}

.logout__hint {
  color: #999999;
}
</style>
