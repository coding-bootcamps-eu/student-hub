<template>
  <div class="h-full grid grid-cols-1 grid-rows-layout">
    <MainHeader />
    <div class="md:grid md:grid-cols-layout">
      <IconNav v-if="!isHome" />
      <div class="overflow-y-auto mb-14" :class="{ 'col-span-2': isHome }">
        <main class="p-4">
          <router-view />
        </main>
      </div>
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
