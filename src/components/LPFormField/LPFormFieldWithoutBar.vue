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
  border: 2px solid rebeccapurple;
  margin-bottom: 25px;
  border-radius: 10px;
}
h2 {
  text-align: start;
  margin-left: 10px;
  font-weight: bold;
}
textarea {
  border: 1px solid rebeccapurple;
  width: 98%;
  height: 150px;
  border-radius: 10px;
}
</style>
