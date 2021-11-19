<template>
  <section>
    <legend>{{ lpLegend }}</legend>
    <textarea
      :placeholder="lp__placeholder"
      :v-model="modelValue"
      @keydown="updateValueWithoutBar"
      @keyup="updateValueWithoutBar"
    ></textarea>
  </section>
</template>

<script>
export default {
  emits: ["lp-value-without-bar"],
  name: "LPFormFieldWithoutBar",
  props: {
    lpLegend: {
      type: String,
    },
    lp__placeholder: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
    },
    methods: {
      updateValueWithoutBar() {
        this.$emit("lp-value-without-bar", event.target.value);
      },
    },
  },
};
</script>

<style></style>
