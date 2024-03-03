<template>
  <header class="page-heading__container">
    <h2 class="page-heading__title">{{ title }}</h2>
    <p class="page-heading__subtitle">{{ sub }}</p>
  </header>
</template>
<script>
export default {
  props: {
    title: String,
    sub: String,
  },
};
</script>
