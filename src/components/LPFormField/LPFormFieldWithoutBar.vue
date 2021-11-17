<template>
  <section>
    <h2>{{ lpLegend }}</h2>
    <textarea :placeholder="lp__placeholder"></textarea>
  </section>
</template>

<script>
export default {
  name: "LPFormFieldWithoutBar",
  props: {
    lpLegend: {
      type: String,
    },
    lp__placeholder: {
      type: String,
    },
  },
};
</script>

<style></style>
