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
  height: 130px;
  border: 0.5px solid var(--secondary-color);
  border-radius: 0.25rem;
}
</style>
