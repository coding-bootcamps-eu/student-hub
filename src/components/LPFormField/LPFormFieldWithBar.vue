<template>
  <section class="lpformwith">
    <legend>{{ lpLegend }}</legend>
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

<style scoped>
.lpformwith {
  border: 1px solid var(--primary-color);
  margin-bottom: 1.5rem;
  border-radius: 0.25rem;
  margin: 1.5rem 4rem 0.8rem 2.5rem;
}

textarea {
  width: 98%;
  border: 0.5px solid var(--secondary-color);
  border-radius: 0.25rem;
  height: 20vh;
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
