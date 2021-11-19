<template>
  <section>
    <legend>{{ lpLegend }}</legend>
    <LPSlideBar />
    <textarea
      placeholder="Bitte gebe einen zusätzlichen Kommentar ab."
      :v-model="modelValue"
      @keydown="updateValue"
      @keyup="updateValue"
    ></textarea>
  </section>
</template>

<script>
import LPSlideBar from "@/components/LPFormField/LPSlideBar.vue";
export default {
  emits: ["lp-value"],
  name: "LPFormFieldWithBar",
  components: {
    LPSlideBar,
  },
  props: {
    lpLegend: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
    },
  },
  methods: {
    updateValue() {
      this.$emit("lp-value", event.target.value);
    },
  },
};
</script>

<style></style>
