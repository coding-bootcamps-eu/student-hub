<template>
  <section>
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

<style></style>
