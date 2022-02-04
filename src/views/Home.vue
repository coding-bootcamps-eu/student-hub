<template>
  <div>
    <p>Hallo</p>
    <div v-if="this.$store.state.isLoggedIn">
      {{ this.$store.state.currentUser }}
    </div>
    <div v-if="!this.$store.state.isLoggedIn">
      <CBELogin></CBELogin>
    </div>
  </div>
</template>

<script>
import CBELogin from "@/components/CBELogin/CBELogin.vue";
export default {
  name: "Home",
  components: { CBELogin },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.getUserLoginState ? true : false;
    },
    isGuest() {
      return this.$store.getters.getCurrentUserRole === "guest" ? true : false;
    },
  },
};
</script>
