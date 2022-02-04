<template>
  <CBEMainHeader class="main-header" />
  <CBEMainNavigation />
  <main>
    <router-view />
  </main>
  <CBEMainFooter />
</template>

<script>
import { getAuth } from "firebase/auth";

import CBEMainFooter from "@/components/CBEMainFooter/CBEMainFooter.vue";
import CBEMainHeader from "@/components/CBEMainHeader/CBEMainHeader.vue";
import CBEMainNavigation from "@/components/CBEMainNavigation/CBEMainNavigation.vue";

export default {
  name: "App",
  data: () => {
    return {};
  },
  components: {
    CBEMainNavigation,
    CBEMainHeader,
    CBEMainFooter,
  },
  created() {
    // Check if user is already logged in
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("login", user);
      }
    });
  },
  mounted() {
    // Todo: use sessionStorage?
  },
};
</script>

<style lang="css" scoped></style>
