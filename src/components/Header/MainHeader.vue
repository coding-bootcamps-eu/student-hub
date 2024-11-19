<template>
  <header
    class="
      relative
      flex
      p-4
      items-center
      justify-between
      bg-violet-100
      top-0
      shadow-sm shadow-violet-100/40
    ">
    <div class="flex items-center gap-4">
      <img
        src="/img/Logo_V2_rund.png"
        alt="Logo Coding Bootcamps Europe GmbH"
        class="w-10" />
      <h1 class="text-violet-700">CBE Hub</h1>
    </div>
    <MainNavigation />
  </header>
</template>
<script>
import MainNavigation from "@/components/Header/MainNavigation.vue";

export default {
  components: {
    MainNavigation,
  },
};
</script>
