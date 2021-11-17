<template>
  <section>
    <h2>{{ lpLegend }}</h2>
    <LPSlideBar />
    <textarea :placeholder="lp__placeholder"></textarea>
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
