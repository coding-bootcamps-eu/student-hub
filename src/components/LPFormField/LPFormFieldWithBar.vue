<template>
  <section class="lpFormfieldWithBar">
    <h2>Hier steht die Frage</h2>
    <LPSlideBar />
    <textarea placeholder="optional"></textarea>
  </section>
</template>

<script>
import LPSlideBar from "@/components/LPFormField/LPSlideBar.vue";
export default {
  name: "LPFormFieldWithBar",
  components: {
    LPSlideBar,
  },
};
</script>

<style scoped>
.lpFormfieldWithBar {
  border: 2px solid rebeccapurple;
  margin-bottom: 20px;
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
  height: 130px;
  border-radius: 10px;
}
</style>
