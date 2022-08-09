<template>
  <header class="page-heading">
    <h2 class="page-heading__title">1on1</h2>
    <p class="page-heading__subtitle">
      Book a personal meeting with a trainer 🎉
    </p>
  </header>
  <div>
    <div v-if="this.$store.getters.isPartTimeStudent">
      <a :href="partTimeUrl" target="_blank" rel="noopener"
        >Book a 1on1 with Calendly</a
      >
    </div>
    <!-- TODO: 1on1 link vollzeit einbauen -->
  </div>
</template>
<script>
export default {
  name: "1on1",
  computed: {
    partTimeUrl() {
      let baseUrl =
        "https://calendly.com/coding-bootcamps-europe/teilzeit-1on1?";

      baseUrl += "name=" + this.$store.getters.userName;
      baseUrl += "&email=" + this.$store.state.email;
      baseUrl += "&a1=" + this.$store.state.githubProfileUrl;

      return baseUrl;
    },
  },
};
</script>

<style lang="css" scoped>
a {
  color: initial;
  text-decoration: underline;
  cursor: pointer;
}
</style>
