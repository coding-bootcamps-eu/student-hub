<template>
  <section>Du bist jetzt ausgeloggt.</section>
  <section>
    <CBELogin></CBELogin>
  </section>
</template>

<script>
import CBELogin from "@/components/CBELogin/CBELogin.vue";
export default {
  name: "LoggedOut",
  components: {
    CBELogin,
  },
  beforeMount() {
    if (this.$store.state.isLoggedIn) {
      this.$router.push("/");
    }
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
