<template>
  <section>
    <p>Danke dass du dein Roti abgegeben hast, komme bitte morgen wieder.</p>
  </section>
</template>

<script>
export default {
  name: "RotiGiven",
  created() {
    location.reload();
  },
};
</script>

<style scoped>
p {
  margin: 2.5rem 2rem;
}
</style>
