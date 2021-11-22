<template>
  <section>
    {{ lpKey }}
  </section>
</template>

<script>
export default {
  name: "LPEntryDetails",
  data() {
    return {
      lpKey: this.$route.params.lpKey,
    };
  },
};
</script>
