<template>
  <header
    class="
      relative
      flex
      p-4
      items-center
      justify-between
      bg-gray-100
      top-0
      shadow-sm shadow-gray-100/40
    ">
    <div class="flex items-center gap-4">
      <img
        src="/img/Logo_V2_rund.png"
        alt="Logo Coding Bootcamps Europe GmbH"
        class="w-10" />
      <h1 class="text-violet-700">CBE Hub</h1>
    </div>
    <PageHeader :title="pageTitle" />
    <MainNavigation />
  </header>
</template>
<script>
import PageHeader from "@/components/PageHeader.vue";
import MainNavigation from "@/components/Header/MainNavigation.vue";

export default {
  components: {
    PageHeader,
    MainNavigation,
  },

  computed: {
    pageTitle() {
      return this.$route.meta.title;
    },
  },
};
</script>
