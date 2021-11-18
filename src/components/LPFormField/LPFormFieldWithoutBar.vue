<template>
  <section class="lpFormfieldWithoutBar">
    <h2>Hier steht die Frage</h2>
    <textarea placeholder="optional"></textarea>
  </section>
</template>

<script>
export default {
  name: "LPFormFieldWithoutBar",
  props: {},
};
</script>

<style scoped>
.lpFormfieldWithoutBar {
  border: 0.5px solid var(--primary-color);
  margin-bottom: 1.5rem;
  border-radius: 0.25rem;
}
h2 {
  text-align: start;
  margin-left: 10px;
  font-weight: bold;
}
textarea {
  width: 98%;
  height: 150px;
  border: 0.5px solid var(--secondary-color);
  border-radius: 0.25rem;
}
</style>
