<template>
  <section>
    <input
      type="range"
      id="slider-value"
      min="1"
      max="10"
      step="1"
      value="1"
      ref="slideBar"
      @input="updateValue"
      data-cy="input-range-valuation"
    />
    <label for="slider-value">{{ lpSliderValue }}</label>
  </section>
</template>

<script>
export default {
  name: "LPSlideBar",
  data() {
    return {
      lpSliderValue: 1,
    };
  },
  emits: ["slider-value"],
  methods: {
    updateValue(event) {
      this.$emit("slider-value", event.target.value);
      this.lpSliderValue = event.target.value;
    },
  },
};
</script>

<style scoped>
#slider-value {
  accent-color: var(--primary-color);
}
</style>
