<template>
  <nav class="cbe__main-nav">
    <ul class="cbe__nav-list" v-if="this.$store.state.isLoggedIn">
      <li class="cbe__nav-element">
        <router-link to="/recordings">Recordings</router-link>
      </li>
      <li class="cbe__nav-element">
        <router-link to="/timer">Timer</router-link>
      </li>
      <li class="cbe__nav-element">
        <router-link to="/slides">Slides</router-link>
      </li>
      <li class="cbe__nav-element">
        <router-link to="/students">Students</router-link>
      </li>
      <li class="cbe__nav-element">
        <CBELogin />
      </li>
    </ul>
  </nav>
</template>
<script>
import CBELogin from "@/components/CBELogin/CBELogin.vue";

export default {
  name: "CBEMainNavigation",
  components: {
    CBELogin,
  },
  data() {
    return {};
  },

  computed: {
    isTeacher() {
      return this.$store.getters.getCurrentUserRole === "teacher"
        ? true
        : false;
    },
    isGuest() {
      return this.$store.getters.getCurrentUserRole === "guest" ||
        this.$store.getters.getCurrentUserRole === "null"
        ? true
        : false;
    },
    isStudent() {
      return this.$store.getters.getCurrentUserRole === "student"
        ? true
        : false;
    },
  },
};
</script>
<style lang="css" scoped></style>
