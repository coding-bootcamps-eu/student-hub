<template>
  <section>
    <h2>{{ lpLegend }}</h2>
    <LPSlideBar />
    <textarea
      placeholder="Bitte gebe einen zusätzlichen Kommentar ab."
    ></textarea>
  </section>
</template>

<script>
import LPSlideBar from "@/components/LPFormField/LPSlideBar.vue";
export default {
  name: "LPFormFieldWithBar",
  components: {
    LPSlideBar,
  },
  props: {
    lpLegend: {
      type: String,
    },
  },
};
</script>

<style></style>
