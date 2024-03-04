<template>
  <header class="main-header">
    <div class="header__content">
      <h1 class="header__title">Student Hub</h1>
      <p class="header__subtitle">Coding Bootcamps Europe</p>
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
