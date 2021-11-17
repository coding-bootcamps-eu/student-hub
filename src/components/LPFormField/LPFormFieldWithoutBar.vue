<template>
  <section class="lpFormfieldWithoutBar">
    <p>Hier steht die Frage</p>
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
p {
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
