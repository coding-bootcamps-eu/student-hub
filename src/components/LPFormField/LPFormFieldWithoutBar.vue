<template>
  <section>
    <legend>{{ lpLegend }}</legend>
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

<style scoped>
section {
  border: 1px solid var(--primary-color);
  margin-bottom: 1.5rem;
  border-radius: 0.25rem;
  margin: 1.5rem 4rem 0.8rem 2.5rem;
}

textarea {
  width: 98%;
  border: 1px solid var(--secondary-color);
  border-radius: 0.25rem;
}
placeholder {
  color: rgba(18, 18, 18, 0.493);
}
legend {
  text-align: left;
  padding: 0 0.25rem;
  margin: 0.5rem;
  border: 0.25px dotted var(--secondary-color);
  border-radius: 0.25rem;
  font-size: 0.8em;
}
</style>
