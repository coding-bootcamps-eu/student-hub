<template>
  <div class="h-full grid grid-cols-1 grid-rows-layout md:sticky md:top-0">
    <MainHeader />
    <div
      class="
        grid
        md:grid-cols-layout
        grid-rows-2-layout
        overflow-y-auto
        md:sticky md:top-0
      ">
      <IconNav class="row-start-2 row-end-3 md:row-start-1 md:row-end-2" />
      <main
        class="
          row-start-1 row-end-2
          p-4
          md:p-14
          mb-14
          md:mb-0 md:row-1 md:overflow-auto
        "
        :class="{ 'col-span-2': isHome }">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/Layout/Header/MainHeader.vue";
import IconNav from "@/components/Layout/Navigation/IconNav.vue";
import MainFooter from "@/components/Layout/MainFooter.vue";

export default {
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
