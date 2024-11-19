<template>
  <div class="h-full grid grid-cols-1 grid-rows-layout">
    <MainHeader />
    <div class="grid md:grid-cols-layout grid-rows-2-layout overflow-y-auto">
      <IconNav class="row-start-2 row-end-3 md:row-start-1 md:row-end-2" />
      <main
        class="row-start-1 row-end-2 p-4 md:p-14 mb-14 md:mb-0 md:row-1"
        :class="{ 'col-span-2': isHome }">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/Header/MainHeader.vue";
import IconNav from "./components/IconNav.vue";
import MainFooter from "@/components/MainFooter.vue";

export default {
  name: "App",
  components: {
    MainHeader,
    IconNav,
    MainFooter,
  },

  computed: {
    isHome() {
      return this.$route.fullPath === "/";
    },
  },
};
</script>
