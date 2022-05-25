<template>
  <section>
    <header class="page-heading">
      <h2 class="page-heading__title">GUEST</h2>
      <p class="page-heading__subtitle">You only have guest permissions.</p>
    </header>
    <div class="guest">
      <p>
        You currently have a guest status which means you have no access to the
        app. An admin will review your permissions soon.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Guest",
  mounted() {
    // When a user has only guest permissions
    // it may happens that we give permissions
    // and they reload the /guest route
    // then the new permissions are loaded but they
    // remain here... this is the fix 😘
    if (this.$store.getters.isGuest !== true) {
      this.$router.push("/");
    }
  },
};
</script>

<style lang="css">
.Guest {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
