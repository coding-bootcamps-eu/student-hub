<template>
  <MainHeader />
  <main class="main">
    <router-view />
  </main>
  <MainFooter />
</template>

<script>
import MainHeader from "@/components/Header/MainHeader.vue";
import MainFooter from "@/components/MainFooter.vue";

export default {
  name: "App",
  components: {
    MainHeader,
    MainFooter,
  },
};
</script>
