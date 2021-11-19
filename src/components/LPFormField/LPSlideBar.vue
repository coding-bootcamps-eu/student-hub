<template>
  <section>
    <input
      type="range"
      id="slider-value"
      min="1"
      max="10"
      step="1"
      :v-model="sliderValue"
      @input="updateValue"
    />
    <label for="slider-value">{{ sliderValue }}</label>
  </section>
</template>

<script>
export default {
  name: "LPSlideBar",
  emits: ["slider-value"],
  props: {
    sliderValue: {
      type: [String, Number],
    },
  },
  methods: {
    updateValue() {
      this.$emit("slider-value", event.target.value);
    },
  },
};
</script>

<style scoped>
#slider-value {
  accent-color: var(--primary-color);
}
</style>
