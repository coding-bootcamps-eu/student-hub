<template>
  <section>
    <legend>{{ lpLegend }}</legend>
    <textarea
      :placeholder="lp__placeholder"
      :v-model="modelValue"
      @keydown="updateValue"
      @keyup="updateValue"
    ></textarea>
  </section>
</template>

<script>
export default {
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
      updateValue() {
        this.$emit("lp-value", event.target.value);
      },
    },
  },
};
</script>

<style></style>
