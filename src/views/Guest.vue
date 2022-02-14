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
