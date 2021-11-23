<template>
  <section>
    <legend>{{ lpLegend }}</legend>
    <textarea
      :placeholder="lp__placeholder"
      :v-model="modelValue"
      @change="changeComponentOutput"
    ></textarea>
  </section>
</template>

<script>
export default {
  emits: ["lp-value-without-bar"],
  name: "LPFormFieldWithoutBar",
  data() {
    return {
      modelValue: "",
    };
  },
  props: {
    lpLegend: {
      type: String,
    },
    lp__placeholder: {
      type: String,
    },
  },
  methods: {
    resetInput() {
      this.modelValue = "";
    },
    changeComponentOutput() {
      this.updateValueWithoutBar(this.modelValue);
    },
    updateValueWithoutBar(value) {
      this.$emit("lp-value-without-bar", value);
    },
  },
};
</script>

<style scoped>
section {
  border: 1px solid var(--primary-color);
  margin-bottom: 1.5rem;
  border-radius: 0.25rem;
  margin: 1.5rem 4rem 0.8rem 2.5rem;
}

textarea {
  min-width: 350px;
  max-width: 120ch;
  border: 1px solid var(--secondary-color);
  border-radius: 0.25rem;
  min-height: 5rem;
  max-height: 30vh;
}
placeholder {
  color: rgba(18, 18, 18, 0.493);
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
