<template>
  <header class="main-header">
    <div class="header-content">
      <img
        src="/img/Logo_V2_rund.png"
        alt="Logo Coding Bootcamps Europe GmbH"
        class="header-content__logo" />
      <div class="header-content__text">
        <h1 class="header-content__title">Student Hub</h1>
        <p class="header-content__subtitle">Coding Bootcamps Europe</p>
      </div>
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
